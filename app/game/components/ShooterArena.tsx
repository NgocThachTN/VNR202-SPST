"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import type { LevelData, Bullet, Enemy, Explosion, Obstacle, MapDecoration, WeaponType } from "../data";
import {
  ARENA_W,
  ARENA_H,
  PLAYER_SIZE,
  PLAYER_SPEED,
  BULLET_SPEED,
  BULLET_SIZE,
  ENEMY_SIZE,
  ENEMY_SPEED,
  ENEMIES_PER_WAVE,
  SHOOT_COOLDOWN,
  WEAPONS,
} from "../data";

/* ═══════════════════════════════════════════════════════════════════ */
/*  SHOOTER ARENA — canvas top-down shooter with mouse aim             */
/* ═══════════════════════════════════════════════════════════════════ */

export default function ShooterArena({
  levelData,
  onWaveCleared,
  onAmmoEmpty,
  setHp,
  ammo,
  setAmmo,
  setScore,
  waveNum,
  weaponId,
  upgrades,
}: {
  levelData: LevelData;
  onWaveCleared: () => void;
  onAmmoEmpty: () => void;
  setHp: React.Dispatch<React.SetStateAction<number>>;
  ammo: number;
  setAmmo: React.Dispatch<React.SetStateAction<number>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  waveNum: number;
  weaponId: string;
  upgrades?: Record<string, number>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ w: ARENA_W, h: ARENA_H });
  const sizeRef = useRef({ w: ARENA_W, h: ARENA_H });

  // Dynamically resize canvas to fill container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) {
        // Use device pixel ratio 1 for pixel art crispness
        const w = Math.round(width);
        const h = Math.round(height);
        sizeRef.current = { w, h };
        setCanvasSize({ w, h });
      }
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  const mouseRef = useRef({ x: sizeRef.current.w / 2, y: 0 });
  const stateRef = useRef({
    player: { x: sizeRef.current.w / 2, y: sizeRef.current.h / 2 },
    aimAngle: -Math.PI / 2,
    bullets: [] as Bullet[],
    enemies: [] as Enemy[],
    explosions: [] as Explosion[],
    keys: new Set<string>(),
    lastShot: 0,
    nextId: 0,
    waveCleared: false,
    spawnTimer: 0,
    spawned: 0,
    killed: 0,
    enemyCount: ENEMIES_PER_WAVE + waveNum * 2,
    frameId: 0,
  });

  const ammoRef = useRef(ammo);
  ammoRef.current = ammo;

  const weaponRef = useRef(weaponId);
  weaponRef.current = weaponId;

  const upgradesRef = useRef(upgrades || {});
  upgradesRef.current = upgrades || {};

  const onAmmoEmptyRef = useRef(onAmmoEmpty);
  onAmmoEmptyRef.current = onAmmoEmpty;

  const shoot = useCallback(() => {
    const s = stateRef.current;
    if (ammoRef.current <= 0) return;
    const now = Date.now();
    const u = upgradesRef.current;

    // Fire rate upgrade: reduce cooldown by 20% per stack
    const fireRateStacks = u["fire_rate"] || 0;
    const cooldown = SHOOT_COOLDOWN * Math.pow(0.8, fireRateStacks);
    if (now - s.lastShot < cooldown) return;
    s.lastShot = now;

    // Bullet speed upgrade: +25% per stack
    const bsStacks = u["bullet_speed"] || 0;
    const bSpeed = BULLET_SPEED * (1 + bsStacks * 0.25);

    // Spread upgrade: wider angle per stack
    const spreadBonus = (u["spread_shot"] || 0) * 0.08;

    const weapon = WEAPONS.find(w => w.id === weaponRef.current) || WEAPONS[0];
    const baseAngle = s.aimAngle;

    if (weapon.id === "circle") {
      for (let i = 0; i < weapon.bulletCount; i++) {
        const angle = baseAngle + (i * Math.PI * 2) / weapon.bulletCount;
        s.bullets.push({
          id: s.nextId++,
          x: s.player.x,
          y: s.player.y,
          dx: Math.cos(angle) * bSpeed,
          dy: Math.sin(angle) * bSpeed,
        });
      }
    } else {
      const spread = weapon.spreadAngle + spreadBonus;
      const totalSpread = spread * (weapon.bulletCount - 1);
      const startAngle = baseAngle - totalSpread / 2;
      for (let i = 0; i < weapon.bulletCount; i++) {
        const angle = weapon.bulletCount === 1
          ? baseAngle
          : startAngle + i * spread;
        s.bullets.push({
          id: s.nextId++,
          x: s.player.x,
          y: s.player.y,
          dx: Math.cos(angle) * bSpeed,
          dy: Math.sin(angle) * bSpeed,
        });
      }
    }

    setAmmo((a) => {
      const next = a - 1;
      if (next <= 0) {
        // Defer to avoid state update during render
        setTimeout(() => onAmmoEmptyRef.current(), 0);
      }
      return Math.max(0, next);
    });
  }, [setAmmo]);

  // keyboard + space to shoot
  useEffect(() => {
    const s = stateRef.current;
    s.player = { x: sizeRef.current.w / 2, y: sizeRef.current.h / 2 };
    s.aimAngle = -Math.PI / 2;
    s.bullets = [];
    s.enemies = [];
    s.explosions = [];
    s.waveCleared = false;
    s.spawnTimer = 0;
    s.spawned = 0;
    s.killed = 0;
    s.enemyCount = ENEMIES_PER_WAVE + waveNum * 2;

    function handleKeyDown(e: KeyboardEvent) {
      s.keys.add(e.key);
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === " ") shoot();
    }
    function handleKeyUp(e: KeyboardEvent) {
      s.keys.delete(e.key);
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [waveNum, shoot]);

  // mouse tracking + click to shoot
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const scaleX = sizeRef.current.w / rect.width;
      const scaleY = sizeRef.current.h / rect.height;
      mouseRef.current = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
      const s = stateRef.current;
      s.aimAngle = Math.atan2(
        mouseRef.current.y - s.player.y,
        mouseRef.current.x - s.player.x
      );
    }
    function handleClick() {
      shoot();
    }

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
    };
  }, [shoot]);

  // Main game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const s = stateRef.current;

    function spawnEnemy() {
      const AW = sizeRef.current.w, AH = sizeRef.current.h;
      const side = Math.floor(Math.random() * 4);
      let x = 0, y = 0;
      if (side === 0)      { x = Math.random() * AW; y = -ENEMY_SIZE; }
      else if (side === 1) { x = Math.random() * AW; y = AH + ENEMY_SIZE; }
      else if (side === 2) { x = -ENEMY_SIZE;         y = Math.random() * AH; }
      else                 { x = AW + ENEMY_SIZE;     y = Math.random() * AH; }
      s.enemies.push({ id: s.nextId++, x, y, hp: 1 });
      s.spawned++;
    }

    function drawPixelSoldier(cx: number, cy: number, angle: number) {
      const sz = PLAYER_SIZE;
      const half = sz / 2;

      ctx.save();
      ctx.translate(cx, cy);

      // Body
      ctx.fillStyle = "#DA251D";
      ctx.fillRect(-half + 2, -half + 4, sz - 4, sz - 6);
      // Head
      ctx.fillStyle = "#FFD5A0";
      ctx.fillRect(-4, -half, 8, 6);
      // Helmet
      ctx.fillStyle = "#4A5D23";
      ctx.fillRect(-5, -half - 2, 10, 4);
      // Eyes
      ctx.fillStyle = "#1a1a2e";
      ctx.fillRect(-2, -half + 2, 2, 2);
      ctx.fillRect(1, -half + 2, 2, 2);
      // Star on chest
      ctx.fillStyle = "#FFD700";
      ctx.fillRect(-2, 2, 4, 3);

      ctx.restore();

      // Gun barrel - drawn toward aim direction
      const barrelLen = 12;
      const bx = cx + Math.cos(angle) * (half + 1);
      const by = cy + Math.sin(angle) * (half + 1);
      const bex = cx + Math.cos(angle) * (half + barrelLen);
      const bey = cy + Math.sin(angle) * (half + barrelLen);
      ctx.strokeStyle = "#555";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(bex, bey);
      ctx.stroke();
      // Muzzle
      ctx.fillStyle = "#888";
      ctx.fillRect(bex - 2, bey - 2, 4, 4);
    }

    function drawEnemy(ex: number, ey: number) {
      const sz = ENEMY_SIZE;
      const half = sz / 2;
      ctx.fillStyle = levelData.enemyColor;
      ctx.fillRect(ex - half, ey - half + 2, sz, sz - 4);
      ctx.fillStyle = "#ddb896";
      ctx.fillRect(ex - 4, ey - half - 2, 8, 6);
      ctx.fillStyle = "#333";
      ctx.fillRect(ex - 5, ey - half - 4, 10, 3);
      ctx.fillStyle = "#ff0000";
      ctx.fillRect(ex - 3, ey - half, 2, 2);
      ctx.fillRect(ex + 1, ey - half, 2, 2);
      ctx.fillStyle = "#666";
      ctx.fillRect(ex + half - 1, ey - 1, 4, 2);
    }

    function drawExplosion(ex: number, ey: number, frame: number) {
      const colors = ["#FFD700", "#FF6600", "#FF2222", "#FF8800"];
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4 + frame * 0.3;
        const dist = frame * 5;
        const px = ex + Math.cos(angle) * dist;
        const py = ey + Math.sin(angle) * dist;
        const sz = 3 + frame * 2;
        ctx.fillStyle = colors[i % colors.length];
        ctx.globalAlpha = Math.max(0, 1 - frame / 6);
        ctx.fillRect(px - sz / 2, py - sz / 2, sz, sz);
      }
      ctx.globalAlpha = 1;
    }

    function drawGround() {
      const AW = sizeRef.current.w, AH = sizeRef.current.h;
      ctx.fillStyle = levelData.bg;
      ctx.fillRect(0, 0, AW, AH);

      const map = levelData.map;
      const terrain = map?.terrain || "jungle";

      // Terrain-specific ground patterns
      if (terrain === "jungle" || terrain === "highland") {
        // Grass patches
        ctx.fillStyle = levelData.groundColor + "40";
        const seed = waveNum * 7;
        for (let i = 0; i < 24; i++) {
          const bx = ((seed + i * 37) * 97) % AW;
          const by = ((seed + i * 53) * 73) % AH;
          ctx.fillRect(bx, by, 6 + (i % 4) * 2, 4 + (i % 3) * 2);
        }
        // Dirt paths
        ctx.strokeStyle = levelData.groundColor + "25";
        ctx.lineWidth = 12;
        ctx.beginPath();
        ctx.moveTo(0, AH * 0.4);
        ctx.quadraticCurveTo(AW * 0.3, AH * 0.3, AW * 0.6, AH * 0.5);
        ctx.quadraticCurveTo(AW * 0.8, AH * 0.65, AW, AH * 0.6);
        ctx.stroke();
      } else if (terrain === "urban") {
        // Road grid
        ctx.fillStyle = "#2a2a3a";
        ctx.fillRect(AW * 0.3 - 15, 0, 30, AH);
        ctx.fillRect(0, AH * 0.45 - 15, AW, 30);
        // Road markings
        ctx.strokeStyle = "#4a4a5a";
        ctx.lineWidth = 1;
        ctx.setLineDash([8, 12]);
        ctx.beginPath();
        ctx.moveTo(AW * 0.3, 0);
        ctx.lineTo(AW * 0.3, AH);
        ctx.moveTo(0, AH * 0.45);
        ctx.lineTo(AW, AH * 0.45);
        ctx.stroke();
        ctx.setLineDash([]);
        // Rubble
        ctx.fillStyle = levelData.groundColor + "20";
        for (let i = 0; i < 12; i++) {
          const rx = ((waveNum * 11 + i * 61) * 43) % AW;
          const ry = ((waveNum * 13 + i * 47) * 67) % AH;
          ctx.fillRect(rx, ry, 4 + (i % 3) * 3, 3 + (i % 2) * 2);
        }
      } else if (terrain === "mountain") {
        // Rocky terrain
        ctx.fillStyle = levelData.groundColor + "30";
        for (let i = 0; i < 20; i++) {
          const rx = ((waveNum * 19 + i * 41) * 89) % AW;
          const ry = ((waveNum * 23 + i * 59) * 71) % AH;
          const rw = 8 + (i % 5) * 4;
          const rh = 6 + (i % 4) * 3;
          ctx.fillRect(rx, ry, rw, rh);
        }
        // Mountain ridges in background
        ctx.fillStyle = levelData.groundColor + "15";
        ctx.beginPath();
        ctx.moveTo(0, 60);
        ctx.lineTo(120, 20);
        ctx.lineTo(250, 50);
        ctx.lineTo(400, 15);
        ctx.lineTo(550, 45);
        ctx.lineTo(AW, 25);
        ctx.lineTo(AW, 80);
        ctx.lineTo(0, 80);
        ctx.fill();
      } else if (terrain === "rice_field" || terrain === "delta") {
        // Paddy lines
        ctx.strokeStyle = levelData.groundColor + "30";
        ctx.lineWidth = 1;
        for (let y = 0; y < AH; y += 20) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          for (let x = 0; x < AW; x += 40) {
            ctx.lineTo(x + 20, y + (Math.sin(x * 0.02 + waveNum) * 3));
            ctx.lineTo(x + 40, y);
          }
          ctx.stroke();
        }
      } else if (terrain === "coast") {
        // Water edge
        ctx.fillStyle = "#1a3d5c";
        ctx.fillRect(0, AH - 60, AW, 60);
        ctx.fillStyle = "#1a4a6c";
        for (let x = 0; x < AW; x += 30) {
          const wy = AH - 60 + Math.sin(x * 0.05 + Date.now() * 0.002) * 4;
          ctx.fillRect(x, wy, 20, 3);
        }
      }

      // Grid overlay (always, subtle)
      ctx.strokeStyle = levelData.groundColor + "12";
      ctx.lineWidth = 1;
      for (let x = 0; x < AW; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, AH);
        ctx.stroke();
      }
      for (let y = 0; y < AH; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(AW, y);
        ctx.stroke();
      }
    }

    function drawObstacle(obs: Obstacle) {
      switch (obs.type) {
        case "sandbag":
          ctx.fillStyle = "#8B7D3C";
          ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
          ctx.fillStyle = "#6B5D2C";
          for (let i = 0; i < obs.w; i += 12) {
            ctx.fillRect(obs.x + i, obs.y, 10, obs.h);
            ctx.fillStyle = "#7B6D3C";
            ctx.fillRect(obs.x + i + 2, obs.y + 2, 6, obs.h - 4);
            ctx.fillStyle = "#6B5D2C";
          }
          ctx.strokeStyle = "#554D1C";
          ctx.lineWidth = 1;
          ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);
          break;

        case "crater":
          ctx.fillStyle = "#2a2215";
          ctx.beginPath();
          ctx.ellipse(obs.x + obs.w / 2, obs.y + obs.h / 2, obs.w / 2, obs.h / 2, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#1a1a0f";
          ctx.beginPath();
          ctx.ellipse(obs.x + obs.w / 2, obs.y + obs.h / 2, obs.w / 3, obs.h / 3, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#3a3220";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.ellipse(obs.x + obs.w / 2, obs.y + obs.h / 2, obs.w / 2, obs.h / 2, 0, 0, Math.PI * 2);
          ctx.stroke();
          break;

        case "trench":
          ctx.fillStyle = "#2a2010";
          ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
          ctx.fillStyle = "#3a3015";
          ctx.fillRect(obs.x, obs.y, obs.w, 3);
          ctx.fillRect(obs.x, obs.y + obs.h - 3, obs.w, 3);
          ctx.strokeStyle = "#4a401a";
          ctx.lineWidth = 1;
          ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);
          break;

        case "tank":
          // Destroyed tank body
          ctx.fillStyle = "#3a3a2a";
          ctx.fillRect(obs.x, obs.y + 15, obs.w, obs.h - 15);
          // Turret
          ctx.fillStyle = "#2a2a1a";
          ctx.fillRect(obs.x + 10, obs.y + 5, obs.w - 20, 20);
          // Barrel
          ctx.fillStyle = "#222";
          ctx.fillRect(obs.x + obs.w - 5, obs.y + 12, 20, 4);
          // Tracks
          ctx.fillStyle = "#1a1a1a";
          ctx.fillRect(obs.x - 2, obs.y + obs.h - 8, obs.w + 4, 8);
          // Damage marks
          ctx.fillStyle = "#111";
          ctx.fillRect(obs.x + 15, obs.y + 20, 6, 6);
          ctx.fillRect(obs.x + 30, obs.y + 25, 4, 4);
          // Smoke from destroyed tank
          ctx.fillStyle = "#44444430";
          ctx.beginPath();
          ctx.arc(obs.x + obs.w / 2, obs.y - 5, 8 + Math.sin(Date.now() * 0.003) * 3, 0, Math.PI * 2);
          ctx.fill();
          break;

        case "wall":
          ctx.fillStyle = "#4a4040";
          ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
          // Brick pattern
          ctx.strokeStyle = "#3a3030";
          ctx.lineWidth = 1;
          for (let row = 0; row < obs.h; row += 8) {
            const offset = (row / 8) % 2 === 0 ? 0 : 8;
            for (let col = offset; col < obs.w; col += 16) {
              ctx.strokeRect(obs.x + col, obs.y + row, 16, 8);
            }
          }
          // Damage
          ctx.fillStyle = "#2a2020";
          ctx.fillRect(obs.x + obs.w * 0.3, obs.y, obs.w * 0.15, obs.h * 0.4);
          break;

        case "bunker":
          ctx.fillStyle = "#3a3a30";
          ctx.fillRect(obs.x, obs.y + 10, obs.w, obs.h - 10);
          // Roof
          ctx.fillStyle = "#4a4a3a";
          ctx.beginPath();
          ctx.moveTo(obs.x - 5, obs.y + 12);
          ctx.lineTo(obs.x + obs.w / 2, obs.y);
          ctx.lineTo(obs.x + obs.w + 5, obs.y + 12);
          ctx.fill();
          // Opening
          ctx.fillStyle = "#111";
          ctx.fillRect(obs.x + obs.w * 0.3, obs.y + obs.h * 0.5, obs.w * 0.4, obs.h * 0.3);
          break;

        case "barrel":
          ctx.fillStyle = "#4a6a30";
          ctx.fillRect(obs.x + 4, obs.y, obs.w - 8, obs.h);
          ctx.fillStyle = "#3a5a20";
          ctx.fillRect(obs.x + 2, obs.y + 3, obs.w - 4, obs.h - 6);
          // Metal bands
          ctx.fillStyle = "#555";
          ctx.fillRect(obs.x + 2, obs.y + 2, obs.w - 4, 2);
          ctx.fillRect(obs.x + 2, obs.y + obs.h - 4, obs.w - 4, 2);
          break;

        case "wire":
          ctx.strokeStyle = "#666";
          ctx.lineWidth = 1;
          for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            for (let x = obs.x; x < obs.x + obs.w; x += 6) {
              const yOff = Math.sin((x + i * 20) * 0.3) * 4 + i * 5;
              if (x === obs.x) ctx.moveTo(x, obs.y + yOff);
              else ctx.lineTo(x, obs.y + yOff);
            }
            ctx.stroke();
          }
          // Posts
          ctx.fillStyle = "#555";
          ctx.fillRect(obs.x, obs.y - 4, 3, obs.h + 8);
          ctx.fillRect(obs.x + obs.w - 3, obs.y - 4, 3, obs.h + 8);
          ctx.fillRect(obs.x + obs.w / 2, obs.y - 4, 3, obs.h + 8);
          break;
      }
    }

    function drawDecoration(dec: MapDecoration) {
      switch (dec.type) {
        case "fire": {
          const t = Date.now() * 0.005;
          const colors = ["#FF4500", "#FF6600", "#FFD700", "#FF2200"];
          for (let i = 0; i < 6; i++) {
            const fx = dec.x + Math.sin(t + i * 1.2) * 4;
            const fy = dec.y - i * 3 + Math.sin(t * 1.5 + i) * 2;
            const sz = 5 - i * 0.6;
            ctx.fillStyle = colors[i % colors.length];
            ctx.globalAlpha = 0.7 - i * 0.1;
            ctx.fillRect(fx - sz / 2, fy - sz / 2, sz, sz);
          }
          ctx.globalAlpha = 1;
          // Glow
          ctx.fillStyle = "#FF660015";
          ctx.beginPath();
          ctx.arc(dec.x, dec.y - 6, 15, 0, Math.PI * 2);
          ctx.fill();
          break;
        }

        case "smoke": {
          const st = Date.now() * 0.002;
          for (let i = 0; i < 4; i++) {
            const sx = dec.x + Math.sin(st + i * 1.5) * 6;
            const sy = dec.y - i * 8 - (st * 10 + i * 5) % 40;
            const sz = 6 + i * 3;
            ctx.fillStyle = "#555";
            ctx.globalAlpha = 0.15 - i * 0.03;
            ctx.beginPath();
            ctx.arc(sx, sy, sz, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.globalAlpha = 1;
          break;
        }

        case "flag": {
          // Pole
          ctx.fillStyle = "#666";
          ctx.fillRect(dec.x, dec.y - 25, 2, 30);
          // Flag
          const ft = Date.now() * 0.003;
          ctx.fillStyle = "#DA251D";
          ctx.beginPath();
          ctx.moveTo(dec.x + 2, dec.y - 25);
          ctx.lineTo(dec.x + 18 + Math.sin(ft) * 2, dec.y - 20 + Math.sin(ft * 1.3) * 1);
          ctx.lineTo(dec.x + 2, dec.y - 15);
          ctx.fill();
          // Star
          ctx.fillStyle = "#FFD700";
          ctx.fillRect(dec.x + 7, dec.y - 22, 3, 3);
          break;
        }

        case "debris":
          ctx.fillStyle = "#3a3a30";
          ctx.fillRect(dec.x, dec.y, 12, 4);
          ctx.fillRect(dec.x + 3, dec.y - 3, 6, 3);
          ctx.fillStyle = "#4a4a40";
          ctx.fillRect(dec.x + 8, dec.y + 2, 8, 3);
          ctx.fillRect(dec.x - 2, dec.y + 4, 5, 2);
          break;

        case "tree_stump":
          ctx.fillStyle = "#4a3520";
          ctx.fillRect(dec.x - 5, dec.y, 10, 8);
          ctx.fillStyle = "#3a2a15";
          ctx.beginPath();
          ctx.arc(dec.x, dec.y, 7, Math.PI, 0);
          ctx.fill();
          // Rings
          ctx.strokeStyle = "#5a4530";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(dec.x, dec.y, 4, Math.PI, 0);
          ctx.stroke();
          break;

        case "shell_casing":
          ctx.fillStyle = "#8a7a30";
          ctx.fillRect(dec.x, dec.y, 3, 6);
          ctx.fillRect(dec.x + 5, dec.y + 2, 3, 6);
          ctx.fillRect(dec.x + 2, dec.y + 6, 3, 6);
          ctx.fillStyle = "#9a8a40";
          ctx.fillRect(dec.x + 8, dec.y + 5, 2, 5);
          break;
      }
    }

    function drawWeather() {
      const AW = sizeRef.current.w, AH = sizeRef.current.h;
      const weather = levelData.map?.weather;
      if (!weather || weather === "clear") return;

      if (weather === "rain") {
        ctx.strokeStyle = "#88aacc30";
        ctx.lineWidth = 1;
        for (let i = 0; i < 60; i++) {
          const rx = (Date.now() * 0.3 + i * 79) % AW;
          const ry = (Date.now() * 0.8 + i * 53) % AH;
          ctx.beginPath();
          ctx.moveTo(rx, ry);
          ctx.lineTo(rx - 2, ry + 8);
          ctx.stroke();
        }
      } else if (weather === "fog") {
        ctx.fillStyle = "#ffffff08";
        for (let i = 0; i < 8; i++) {
          const fx = (Math.sin(Date.now() * 0.0005 + i * 2) * 100) + i * 100;
          const fy = 50 + i * 70;
          ctx.beginPath();
          ctx.ellipse(fx, fy, 120, 30, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (weather === "night") {
        // Dark overlay
        ctx.fillStyle = "#000000" + "30";
        ctx.fillRect(0, 0, AW, AH);
        // Muzzle flashes / light spots
        const nt = Date.now() * 0.001;
        if (Math.sin(nt * 3) > 0.8) {
          ctx.fillStyle = "#FFD70010";
          ctx.beginPath();
          ctx.arc(
            200 + Math.sin(nt) * 100,
            200 + Math.cos(nt * 0.7) * 80,
            40, 0, Math.PI * 2
          );
          ctx.fill();
        }
      }
    }

    function drawCrosshair() {
      const m = mouseRef.current;
      ctx.strokeStyle = "#FFD700aa";
      ctx.lineWidth = 1;
      // Outer circle
      ctx.beginPath();
      ctx.arc(m.x, m.y, 10, 0, Math.PI * 2);
      ctx.stroke();
      // Cross
      ctx.beginPath();
      ctx.moveTo(m.x - 14, m.y);
      ctx.lineTo(m.x - 6, m.y);
      ctx.moveTo(m.x + 6, m.y);
      ctx.lineTo(m.x + 14, m.y);
      ctx.moveTo(m.x, m.y - 14);
      ctx.lineTo(m.x, m.y - 6);
      ctx.moveTo(m.x, m.y + 6);
      ctx.lineTo(m.x, m.y + 14);
      ctx.stroke();
      // Center dot
      ctx.fillStyle = "#ff4444";
      ctx.fillRect(m.x - 1, m.y - 1, 2, 2);
    }

    let running = true;

    function gameLoop() {
      if (!running) return;

      const AW = sizeRef.current.w, AH = sizeRef.current.h;
      const p = s.player;
      const u = upgradesRef.current;

      // Speed upgrade: +15% per stack
      const speedStacks = u["speed_up"] || 0;
      const pSpeed = PLAYER_SPEED * (1 + speedStacks * 0.15);

      // Bonus score per kill
      const bonusScore = (u["damage_up"] || 0) * 50;

      // ---- Input (with obstacle collision) ----
      const obstacles = levelData.map?.obstacles || [];
      const oldX = p.x;
      const oldY = p.y;

      if (s.keys.has("w") || s.keys.has("W") || s.keys.has("ArrowUp"))
        p.y = Math.max(PLAYER_SIZE / 2, p.y - pSpeed);
      if (s.keys.has("s") || s.keys.has("S") || s.keys.has("ArrowDown"))
        p.y = Math.min(AH - PLAYER_SIZE / 2, p.y + pSpeed);
      if (s.keys.has("a") || s.keys.has("A") || s.keys.has("ArrowLeft"))
        p.x = Math.max(PLAYER_SIZE / 2, p.x - pSpeed);
      if (s.keys.has("d") || s.keys.has("D") || s.keys.has("ArrowRight"))
        p.x = Math.min(AW - PLAYER_SIZE / 2, p.x + pSpeed);

      // Check player collision with solid obstacles
      for (const obs of obstacles) {
        if (obs.type === "crater" || obs.type === "wire") continue; // non-blocking
        const half = PLAYER_SIZE / 2;
        if (
          p.x + half > obs.x && p.x - half < obs.x + obs.w &&
          p.y + half > obs.y && p.y - half < obs.y + obs.h
        ) {
          p.x = oldX;
          p.y = oldY;
          break;
        }
      }

      // Update aim angle live
      s.aimAngle = Math.atan2(
        mouseRef.current.y - p.y,
        mouseRef.current.x - p.x
      );

      // ---- Spawn enemies ----
      if (s.spawned < s.enemyCount && !s.waveCleared) {
        s.spawnTimer++;
        if (s.spawnTimer >= 35) {
          s.spawnTimer = 0;
          spawnEnemy();
        }
      }

      // ---- Move bullets (with obstacle collision) ----
      s.bullets = s.bullets.filter((b) => {
        b.x += b.dx;
        b.y += b.dy;
        // Check obstacle collision
        for (const obs of obstacles) {
          if (obs.type === "crater" || obs.type === "wire") continue;
          if (
            b.x > obs.x && b.x < obs.x + obs.w &&
            b.y > obs.y && b.y < obs.y + obs.h
          ) {
            return false;
          }
        }
        return b.x > -10 && b.x < AW + 10 && b.y > -10 && b.y < AH + 10;
      });

      // ---- Move enemies toward player (with obstacle avoidance) ----
      for (const e of s.enemies) {
        const dx = p.x - e.x;
        const dy = p.y - e.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 1) {
          const newX = e.x + (dx / dist) * ENEMY_SPEED;
          const newY = e.y + (dy / dist) * ENEMY_SPEED;
          let blocked = false;
          for (const obs of obstacles) {
            if (obs.type === "crater" || obs.type === "wire") continue;
            const half = ENEMY_SIZE / 2;
            if (
              newX + half > obs.x && newX - half < obs.x + obs.w &&
              newY + half > obs.y && newY - half < obs.y + obs.h
            ) {
              blocked = true;
              break;
            }
          }
          if (blocked) {
            // Try to go around: pick perpendicular direction
            const perpX = e.x + (dy / dist) * ENEMY_SPEED * 1.5;
            const perpY = e.y + (-dx / dist) * ENEMY_SPEED * 1.5;
            let perpBlocked = false;
            for (const obs of obstacles) {
              if (obs.type === "crater" || obs.type === "wire") continue;
              const half = ENEMY_SIZE / 2;
              if (
                perpX + half > obs.x && perpX - half < obs.x + obs.w &&
                perpY + half > obs.y && perpY - half < obs.y + obs.h
              ) {
                perpBlocked = true;
                break;
              }
            }
            if (!perpBlocked) {
              e.x = perpX;
              e.y = perpY;
            }
          } else {
            e.x = newX;
            e.y = newY;
          }
        }
        if (dist < PLAYER_SIZE / 2 + ENEMY_SIZE / 2 - 4) {
          e.hp = 0;
          s.killed++;
          setHp((h) => Math.max(0, h - 1));
          s.explosions.push({ id: s.nextId++, x: e.x, y: e.y, frame: 0 });
        }
      }

      // ---- Bullet-enemy collision ----
      for (const b of s.bullets) {
        for (const e of s.enemies) {
          if (e.hp <= 0) continue;
          const dx = b.x - e.x;
          const dy = b.y - e.y;
          if (Math.sqrt(dx * dx + dy * dy) < ENEMY_SIZE / 2 + BULLET_SIZE) {
            e.hp = 0;
            s.killed++;
            b.x = -999;
            setScore((sc) => sc + 50 + bonusScore);
            s.explosions.push({ id: s.nextId++, x: e.x, y: e.y, frame: 0 });
          }
        }
      }

      s.enemies = s.enemies.filter((e) => e.hp > 0);
      s.bullets = s.bullets.filter((b) => b.x > -10);
      s.explosions = s.explosions
        .map((ex) => ({ ...ex, frame: ex.frame + 0.3 }))
        .filter((ex) => ex.frame < 6);

      // ---- Wave clear ----
      if (s.killed >= s.enemyCount && s.enemies.length === 0 && !s.waveCleared) {
        s.waveCleared = true;
        setTimeout(() => onWaveCleared(), 600);
      }

      // ──── DRAW ────
      drawGround();

      // Decorations (below everything)
      const decorations = levelData.map?.decorations || [];
      for (const dec of decorations) drawDecoration(dec);

      // Obstacles
      for (const obs of obstacles) drawObstacle(obs);

      // Bullets
      ctx.fillStyle = "#FFD700";
      for (const b of s.bullets) {
        ctx.fillRect(b.x - BULLET_SIZE / 2, b.y - BULLET_SIZE / 2, BULLET_SIZE, BULLET_SIZE);
        ctx.fillStyle = "#FFD70055";
        ctx.fillRect(b.x - b.dx * 2 - 1, b.y - b.dy * 2 - 1, 3, 3);
        ctx.fillStyle = "#FFD700";
      }

      // Enemies
      for (const e of s.enemies) drawEnemy(e.x, e.y);

      // Explosions
      for (const ex of s.explosions) drawExplosion(ex.x, ex.y, ex.frame);

      // Player
      drawPixelSoldier(p.x, p.y, s.aimAngle);

      // Aim line (faint)
      ctx.strokeStyle = "#FFD70030";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(
        p.x + Math.cos(s.aimAngle) * (PLAYER_SIZE / 2 + 14),
        p.y + Math.sin(s.aimAngle) * (PLAYER_SIZE / 2 + 14)
      );
      ctx.lineTo(
        p.x + Math.cos(s.aimAngle) * 60,
        p.y + Math.sin(s.aimAngle) * 60
      );
      ctx.stroke();
      ctx.setLineDash([]);

      // Crosshair
      drawCrosshair();

      // Weather effects (on top of everything)
      drawWeather();

      // HUD on canvas
      ctx.fillStyle = "#ffffff88";
      ctx.font = "9px 'Press Start 2P', monospace";
      ctx.fillText(`WAVE ${waveNum + 1}  HA: ${s.killed}/${s.enemyCount}`, 10, AH - 10);

      s.frameId = requestAnimationFrame(gameLoop);
    }

    s.frameId = requestAnimationFrame(gameLoop);
    return () => {
      running = false;
      cancelAnimationFrame(s.frameId);
    };
  }, [waveNum, levelData, onWaveCleared, setHp, setScore, shoot]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <canvas
        ref={canvasRef}
        width={canvasSize.w}
        height={canvasSize.h}
        className="border-0 cursor-none block"
        style={{
          imageRendering: "pixelated",
          width: "100%",
          height: "100%",
          background: "#000",
        }}
      />
    </div>
  );
}
