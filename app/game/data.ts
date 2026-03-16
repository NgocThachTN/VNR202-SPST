/* ═══════════════════════════════════════════════════════════════════ */
/*  TYPES & GAME DATA                                                  */
/* ═══════════════════════════════════════════════════════════════════ */

export interface GameQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  era: string;
}

export interface Obstacle {
  x: number;
  y: number;
  w: number;
  h: number;
  type: "sandbag" | "crater" | "trench" | "tank" | "wall" | "bunker" | "barrel" | "wire" | "palace" | "gate" | "vehicle";
}

export interface MapDecoration {
  x: number;
  y: number;
  type: "fire" | "smoke" | "flag" | "debris" | "tree_stump" | "shell_casing" | "tank_active";
}

export interface MapTheme {
  terrain: "jungle" | "urban" | "rice_field" | "mountain" | "coast" | "delta" | "highland";
  weather: "clear" | "rain" | "fog" | "night";
  obstacles: Obstacle[];
  decorations: MapDecoration[];
}

export interface LevelData {
  name: string;
  emoji: string;
  bg: string;
  groundColor: string;
  enemyColor: string;
  questions: GameQuestion[];
  map?: MapTheme;
}

export interface Vec2 {
  x: number;
  y: number;
}

export interface Bullet {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  spawnX?: number;
  spawnY?: number;
  maxRange?: number;
  isRocket?: boolean;
  aoeRadius?: number;
}

export interface EnemyBullet {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  fromTank: boolean;
}

export type EnemyType = "soldier" | "fortified" | "tank";

export interface EnemyTypeConfig {
  type: EnemyType;
  speed: number;
  size: number;
  hp: number;
  shootCooldown: number;
  bulletSpeed: number;
  scoreValue: number;
}

export interface Enemy {
  id: number;
  x: number;
  y: number;
  hp: number;
  type: EnemyType;
  speed: number;
  size: number;
  lastShot: number;
  anchorX?: number;
  anchorY?: number;
  shootCooldown: number;
  bulletSpeed: number;
}

export interface Explosion {
  id: number;
  x: number;
  y: number;
  frame: number;
  scale?: number;
}

export interface AllyTank {
  x: number;
  y: number;
  targetY: number;
  speed: number;
  lastShot: number;
  shootCooldown: number;
  bulletSpeed: number;
  active: boolean;
  width: number;
  height: number;
}

export interface WeaponType {
  id: string;
  name: string;
  emoji: string;
  bulletCount: number;    // số đường đạn bắn ra cùng lúc
  spreadAngle: number;    // góc lệch giữa các đường đạn (radian), 0 = circle
  cost: number;           // giá mua bằng score
  description: string;
  maxRange?: number;
  bulletSpeedMultiplier?: number;
  isRocket?: boolean;
  aoeRadius?: number;
}

/* ── Constants ─────────────────────────────────────────────────────── */

export const ARENA_W = 960;
export const ARENA_H = 640;
export const PLAYER_SIZE = 22;
export const PLAYER_SPEED = 3.2;
export const BULLET_SPEED = 7;
export const BULLET_SIZE = 4;
export const ENEMY_SIZE = 20;
export const ENEMY_SPEED = 1.3;
export const ENEMIES_PER_WAVE = 6;
export const SHOOT_COOLDOWN = 180;
export const WAVES_PER_LEVEL = 5;

export const ENEMY_TYPES: Record<EnemyType, EnemyTypeConfig> = {
  soldier: {
    type: "soldier",
    speed: 1.3,
    size: 20,
    hp: 1,
    shootCooldown: 2500,
    bulletSpeed: 3,
    scoreValue: 50,
  },
  fortified: {
    type: "fortified",
    speed: 0.3,
    size: 20,
    hp: 2,
    shootCooldown: 1800,
    bulletSpeed: 3.5,
    scoreValue: 80,
  },
  tank: {
    type: "tank",
    speed: 0.5,
    size: 36,
    hp: 5,
    shootCooldown: 3000,
    bulletSpeed: 4,
    scoreValue: 150,
  },
};

export const ENEMY_SHOOT_RANGE = 300;
export const FORTIFIED_ANCHOR_RANGE = 60;
export const ENEMY_BULLET_SIZE = 3;
export const TANK_BULLET_SIZE = 6;

export const ALLY_TANK_843 = {
  startX: 400,
  startY: 500,
  targetY: 130,
  speed: 0.12,
  shootCooldown: 2500,
  bulletSpeed: 5,
  width: 44,
  height: 28,
};

export interface WaveComposition {
  soldiers: number;
  fortified: number;
  tanks: number;
}

export function getWaveComposition(levelIndex: number, waveNum: number): WaveComposition {
  if (levelIndex === 0) {
    // Level 1: Chiến dịch HCM — lính địch tử thủ, có xe tăng
    return {
      soldiers: 3 + waveNum,
      fortified: 2 + Math.floor(waveNum / 2),
      tanks: waveNum >= 2 ? 1 + Math.floor(waveNum / 3) : 0,
    };
  }
  // Default cho các level khác (backwards compatible)
  return {
    soldiers: ENEMIES_PER_WAVE + waveNum * 2,
    fortified: 0,
    tanks: 0,
  };
}

export const WEAPONS: WeaponType[] = [
  {
    id: "single",
    name: "SÚNG TRƯỜNG",
    emoji: "🔫",
    bulletCount: 1,
    spreadAngle: 0,
    cost: 0,
    description: "Bắn 1 viên đạn",
  },
  {
    id: "double",
    name: "SÚNG ĐÔI",
    emoji: "🔫🔫",
    bulletCount: 2,
    spreadAngle: 0.15,
    cost: 300,
    description: "Bắn 2 viên đạn",
  },
  {
    id: "shotgun",
    name: "SHOTGUN",
    emoji: "🔫💨",
    bulletCount: 5,
    spreadAngle: 0.35,
    cost: 450,
    description: "Bắn 5 viên tầm ngắn",
    maxRange: 150,
  },
  {
    id: "triple",
    name: "LIÊN THANH",
    emoji: "💥",
    bulletCount: 3,
    spreadAngle: 0.2,
    cost: 600,
    description: "Bắn 3 viên đạn hình quạt",
  },
  {
    id: "rocket",
    name: "RPG",
    emoji: "🚀",
    bulletCount: 1,
    spreadAngle: 0,
    cost: 800,
    description: "Tên lửa chậm, nổ diện rộng",
    bulletSpeedMultiplier: 0.5,
    isRocket: true,
    aoeRadius: 60,
  },
  {
    id: "circle",
    name: "VÒNG TRÒN",
    emoji: "💫",
    bulletCount: 8,
    spreadAngle: 0, // 0 = full circle (2*PI / bulletCount)
    cost: 1000,
    description: "Bắn 8 viên đạn vòng tròn",
  },
];

/* ── Level data ────────────────────────────────────────────────────── */

export const GAME_LEVELS: LevelData[] = [
  /* ──────── LEVEL 1: CHIẾN DỊCH HCM — Xe tăng húc Dinh Độc Lập ──────── */
  {
    name: "GIẢI PHÓNG SÀI GÒN",
    emoji: "🚩",
    bg: "#2a3a2a",
    groundColor: "#3a5a3a",
    enemyColor: "#8B7355",
    map: {
      terrain: "urban",
      weather: "clear",
      obstacles: [
        // === DINH ĐỘC LẬP (tòa nhà chính phía trên) ===
        { x: 280, y: 20, w: 240, h: 80, type: "palace" },
        // Cổng Dinh (2 trụ cổng)
        { x: 300, y: 110, w: 20, h: 30, type: "gate" },
        { x: 480, y: 110, w: 20, h: 30, type: "gate" },
        // Hàng rào 2 bên
        { x: 120, y: 100, w: 60, h: 15, type: "wall" },
        { x: 600, y: 100, w: 60, h: 15, type: "wall" },

        // === TUYẾN PHÒNG THỦ 1 (gần Dinh, ~170y) ===
        { x: 150, y: 170, w: 50, h: 20, type: "sandbag" },
        { x: 600, y: 170, w: 50, h: 20, type: "sandbag" },
        { x: 370, y: 180, w: 60, h: 20, type: "sandbag" },

        // === TUYẾN PHÒNG THỦ 2 (giữa, ~280-320y) ===
        { x: 350, y: 280, w: 60, h: 40, type: "bunker" },
        { x: 80, y: 320, w: 50, h: 40, type: "bunker" },
        { x: 700, y: 300, w: 50, h: 20, type: "sandbag" },
        { x: 200, y: 290, w: 80, h: 16, type: "trench" },
        { x: 500, y: 290, w: 80, h: 16, type: "trench" },

        // === CHƯỚNG NGẠI VẬT ĐẠI LỘ (~360-420y) ===
        { x: 300, y: 380, w: 40, h: 20, type: "sandbag" },
        { x: 500, y: 400, w: 40, h: 20, type: "sandbag" },
        { x: 350, y: 360, w: 100, h: 12, type: "wire" },

        // === XE CHÁY ===
        { x: 180, y: 420, w: 55, h: 30, type: "vehicle" },
        { x: 550, y: 380, w: 55, h: 30, type: "vehicle" },

        // === HỐ BOM & CÔNG SỰ (~450-540y) ===
        { x: 200, y: 480, w: 50, h: 50, type: "crater" },
        { x: 650, y: 450, w: 40, h: 40, type: "crater" },
        { x: 100, y: 540, w: 60, h: 20, type: "sandbag" },
      ],
      decorations: [
        // Xe tăng 843 tiến về cổng Dinh (sẽ trở thành ally tank)
        { x: 400, y: 500, type: "tank_active" },
        // Cờ giải phóng
        { x: 395, y: 15, type: "flag" },
        // Khói lửa chiến trận
        { x: 150, y: 220, type: "smoke" },
        { x: 550, y: 350, type: "fire" },
        { x: 350, y: 450, type: "debris" },
        { x: 650, y: 170, type: "smoke" },
        { x: 250, y: 380, type: "fire" },
        { x: 450, y: 500, type: "debris" },
        { x: 100, y: 300, type: "shell_casing" },
      ],
    },
    questions: [
      {
        question: "Chiến dịch Hồ Chí Minh bắt đầu ngày nào?",
        options: ["26/4/1975", "30/4/1975", "21/4/1975", "1/5/1975"],
        correctIndex: 0,
        explanation:
          "Chiến dịch Hồ Chí Minh bắt đầu ngày 26/4/1975, kết thúc thắng lợi vào 30/4/1975.",
        era: "1975",
      },
      {
        question: "Ai là Tổng tư lệnh Chiến dịch Hồ Chí Minh?",
        options: [
          "Võ Nguyên Giáp",
          "Văn Tiến Dũng",
          "Lê Đức Thọ",
          "Trần Văn Trà",
        ],
        correctIndex: 1,
        explanation:
          "Đại tướng Văn Tiến Dũng là Tư lệnh Chiến dịch Hồ Chí Minh.",
        era: "1975",
      },
      {
        question: "Xe tăng nào húc đổ cổng Dinh Độc Lập?",
        options: ["Xe 390", "Xe 843", "Xe 354", "Xe 279"],
        correctIndex: 1,
        explanation:
          "Xe tăng 843 do Bùi Quang Thận lái húc đổ cổng Dinh Độc Lập trưa 30/4/1975.",
        era: "1975",
      },
      {
        question: "Chiến dịch Tây Nguyên bắt đầu đánh vào đâu?",
        options: ["Pleiku", "Buôn Ma Thuột", "Kon Tum", "Đà Lạt"],
        correctIndex: 1,
        explanation:
          "Chiến dịch Tây Nguyên mở màn bằng trận đánh Buôn Ma Thuột ngày 10/3/1975.",
        era: "1975",
      },
      {
        question: "Tổng thống cuối cùng của Việt Nam Cộng hòa là ai?",
        options: [
          "Nguyễn Văn Thiệu",
          "Trần Văn Hương",
          "Dương Văn Minh",
          "Nguyễn Cao Kỳ",
        ],
        correctIndex: 2,
        explanation:
          "Dương Văn Minh tuyên bố đầu hàng vô điều kiện trưa 30/4/1975.",
        era: "1975",
      },
      {
        question: "Chiến dịch HCM gồm bao nhiêu quân đoàn tham gia?",
        options: ["3 quân đoàn", "4 quân đoàn", "5 quân đoàn", "6 quân đoàn"],
        correctIndex: 2,
        explanation: "5 quân đoàn (1, 2, 3, 4 và đoàn 232) tham gia chiến dịch Hồ Chí Minh.",
        era: "1975",
      },
      {
        question: "Trận Xuân Lộc diễn ra trước chiến dịch HCM có ý nghĩa gì?",
        options: [
          "Mở đường vào Sài Gòn",
          "Phá vỡ 'cánh cửa thép' phòng thủ",
          "Đánh chiếm sân bay",
          "Giải phóng Biên Hòa",
        ],
        correctIndex: 1,
        explanation: "Trận Xuân Lộc (9-21/4/1975) phá vỡ tuyến phòng thủ 'cánh cửa thép' trước Sài Gòn.",
        era: "1975",
      },
      {
        question: "Ai là người cắm cờ trên nóc Dinh Độc Lập?",
        options: ["Bùi Quang Thận", "Nguyễn Văn Thiệu", "Phạm Xuân Thệ", "Trần Văn Trà"],
        correctIndex: 0,
        explanation: "Đại úy Bùi Quang Thận cắm lá cờ giải phóng trên nóc Dinh Độc Lập trưa 30/4/1975.",
        era: "1975",
      },
      {
        question: "Chiến dịch giải phóng Đà Nẵng diễn ra vào thời gian nào?",
        options: ["26-29/3/1975", "1-5/4/1975", "10-15/3/1975", "20-25/4/1975"],
        correctIndex: 0,
        explanation: "Đà Nẵng được giải phóng ngày 29/3/1975, chỉ sau 3 ngày chiến đấu.",
        era: "1975",
      },
      {
        question: "Trận đánh nào mở màn cho Tổng tiến công mùa Xuân 1975?",
        options: ["Trận Phước Long", "Trận Buôn Ma Thuột", "Trận Huế", "Trận Xuân Lộc"],
        correctIndex: 1,
        explanation: "Trận Buôn Ma Thuột (10/3/1975) mở màn cho cuộc Tổng tiến công mùa Xuân 1975.",
        era: "1975",
      },
      {
        question: "Hiệp định Paris về Việt Nam được ký năm nào?",
        options: ["1971", "1972", "1973", "1974"],
        correctIndex: 2,
        explanation: "Hiệp định Paris được ký ngày 27/1/1973, Mỹ phải rút quân khỏi Việt Nam.",
        era: "1973",
      },
      {
        question: "Thành phố Huế được giải phóng vào ngày nào năm 1975?",
        options: ["20/3/1975", "25/3/1975", "29/3/1975", "1/4/1975"],
        correctIndex: 1,
        explanation: "Ngày 25/3/1975, thành phố Huế được giải phóng hoàn toàn sau khi địch tháo chạy.",
        era: "1975",
      },
      {
        question: "Chiến dịch Hồ Chí Minh kéo dài trong bao nhiêu ngày?",
        options: ["3 ngày", "5 ngày", "7 ngày", "10 ngày"],
        correctIndex: 1,
        explanation: "Chiến dịch Hồ Chí Minh kéo dài 5 ngày, từ 26/4 đến 30/4/1975.",
        era: "1975",
      },
      {
        question: "Sau khi mất Tây Nguyên, quân địch rút chạy theo con đường nào và bị tiêu diệt?",
        options: ["Quốc lộ 1", "Liên tỉnh lộ 7B", "Đường 19", "Đường 14"],
        correctIndex: 1,
        explanation: "Quân địch rút theo Liên tỉnh lộ 7B (đường số 7) về Tuy Hòa, bị ta truy kích và tiêu diệt hoàn toàn.",
        era: "1975",
      },
      {
        question: "Tổng thống Mỹ nào đã ký kết Hiệp định Paris 1973?",
        options: ["Johnson", "Kennedy", "Nixon", "Ford"],
        correctIndex: 2,
        explanation: "Tổng thống Nixon ký Hiệp định Paris ngày 27/1/1973, rút toàn bộ quân Mỹ khỏi Việt Nam.",
        era: "1973",
      },
      {
        question: "Đại tướng Văn Tiến Dũng viết hồi ký nào ghi lại toàn bộ Chiến dịch HCM?",
        options: ["Chiến đấu trong vòng vây", "Đại thắng mùa Xuân", "Điểm hẹn lịch sử", "Mùa xuân toàn thắng"],
        correctIndex: 1,
        explanation: "Cuốn 'Đại thắng mùa Xuân' của Đại tướng Văn Tiến Dũng ghi lại toàn bộ diễn biến Chiến dịch HCM.",
        era: "1975",
      },
      {
        question: "Tỉnh Quảng Trị được giải phóng vào ngày nào năm 1975?",
        options: ["17/3/1975", "19/3/1975", "21/3/1975", "25/3/1975"],
        correctIndex: 1,
        explanation: "Ngày 19/3/1975, tỉnh Quảng Trị được giải phóng, mở đầu làn sóng giải phóng miền Trung.",
        era: "1975",
      },
      {
        question: "Dinh Độc Lập được kiến trúc sư nào thiết kế?",
        options: ["Huỳnh Tấn Phát", "Ngô Viết Thụ", "Võ Đình Diệp", "Nguyễn Hữu Hạnh"],
        correctIndex: 1,
        explanation: "KTS Ngô Viết Thụ thiết kế Dinh Độc Lập, hoàn thành năm 1966.",
        era: "1966",
      },
      {
        question: "Ai là Tổng thống VNCH trực tiếp trước Dương Văn Minh (5/1975)?",
        options: ["Nguyễn Văn Thiệu", "Trần Văn Hương", "Nguyễn Cao Kỳ", "Nguyễn Khánh"],
        correctIndex: 1,
        explanation: "Trần Văn Hương nhậm chức Tổng thống ngày 21/4/1975, rồi trao quyền cho Dương Văn Minh ngày 28/4/1975.",
        era: "1975",
      },
      {
        question: "Chiến dịch Điện Biên Phủ trên không (Mỹ dội bom B-52 Hà Nội) diễn ra vào tháng nào?",
        options: ["Tháng 10/1972", "Tháng 11/1972", "Tháng 12/1972", "Tháng 1/1973"],
        correctIndex: 2,
        explanation: "Chiến dịch Linebacker II (Điện Biên Phủ trên không) diễn ra 18-29/12/1972, Mỹ thất bại và phải ký Hiệp định Paris.",
        era: "1972",
      },
      {
        question: "Chiến dịch Hồ Chí Minh đánh vào 5 mục tiêu trọng điểm nào ở Sài Gòn?",
        options: [
          "Sân bay, Cảng, Nhà tù, Ngân hàng, Chợ Bến Thành",
          "Dinh Độc Lập, Bộ Tổng tham mưu, Sân bay, Đài phát thanh, Tổng nha cảnh sát",
          "Đại sứ quán Mỹ, Dinh Độc Lập, Cảng Sài Gòn, Sân bay, Biệt khu thủ đô",
          "Nhà Trắng, Cảnh sát, Cảng biển, Bệnh viện, Trường học",
        ],
        correctIndex: 1,
        explanation: "5 mục tiêu trọng điểm: Dinh Độc Lập, Bộ Tổng tham mưu, Sân bay Tân Sơn Nhất, Đài phát thanh, Tổng nha cảnh sát.",
        era: "1975",
      },
      {
        question: "Thành phố Đà Lạt được giải phóng vào ngày nào?",
        options: ["29/3/1975", "3/4/1975", "10/4/1975", "17/4/1975"],
        correctIndex: 1,
        explanation: "Thành phố Đà Lạt được giải phóng ngày 3/4/1975 do quân ta tiến công và quần chúng nổi dậy.",
        era: "1975",
      },
      {
        question: "Tên gọi đầy đủ của chiến dịch giải phóng Sài Gòn trước khi mang tên Hồ Chí Minh?",
        options: [
          "Chiến dịch Giải phóng miền Nam",
          "Chiến dịch giải phóng Sài Gòn - Gia Định",
          "Chiến dịch Mùa Xuân",
          "Chiến dịch Thống Nhất",
        ],
        correctIndex: 1,
        explanation: "Ban đầu có tên 'Chiến dịch giải phóng Sài Gòn - Gia Định', đổi thành Chiến dịch Hồ Chí Minh theo đề nghị của Bộ Chính trị ngày 14/4/1975.",
        era: "1975",
      },
      {
        question: "Sân bay Tân Sơn Nhất bị pháo kích phá hủy vào ngày nào trong Chiến dịch HCM?",
        options: ["27/4/1975", "28/4/1975", "29/4/1975", "30/4/1975"],
        correctIndex: 2,
        explanation: "Rạng sáng 29/4/1975, sân bay Tân Sơn Nhất bị tấn công dữ dội, ngăn chặn việc Mỹ di tản tiếp.",
        era: "1975",
      },
    ],
  },
  /* ──────── LEVEL 2: THỐNG NHẤT ──────── */
  {
    name: "THỐNG NHẤT",
    emoji: "🏛️",
    bg: "#2d5016",
    groundColor: "#3a6b1e",
    enemyColor: "#cc2222",
    map: {
      terrain: "jungle",
      weather: "clear",
      obstacles: [
        { x: 120, y: 80, w: 60, h: 20, type: "sandbag" },
        { x: 500, y: 120, w: 50, h: 50, type: "crater" },
        { x: 300, y: 400, w: 80, h: 16, type: "trench" },
        { x: 600, y: 350, w: 40, h: 20, type: "sandbag" },
        { x: 80, y: 300, w: 50, h: 50, type: "crater" },
      ],
      decorations: [
        { x: 150, y: 200, type: "tree_stump" },
        { x: 550, y: 450, type: "debris" },
        { x: 400, y: 50, type: "shell_casing" },
        { x: 650, y: 200, type: "tree_stump" },
      ],
    },
    questions: [
      {
        question: "Ngày 30/4/1975 đánh dấu sự kiện gì?",
        options: [
          "Thành lập Đảng",
          "Thống nhất đất nước",
          "Đại hội VI",
          "Khoán 100",
        ],
        correctIndex: 1,
        explanation:
          "Chiến dịch Hồ Chí Minh toàn thắng, giải phóng miền Nam, thống nhất đất nước.",
        era: "1975",
      },
      {
        question: "Hội nghị Hiệp thương Bắc-Nam diễn ra tại đâu?",
        options: ["Hà Nội", "Huế", "Sài Gòn", "Đà Nẵng"],
        correctIndex: 2,
        explanation:
          "Hội nghị Hiệp thương tổ chức tại Sài Gòn từ 15-21/11/1975.",
        era: "1975",
      },
      {
        question: "Tổng tuyển cử bầu Quốc hội chung diễn ra ngày nào?",
        options: ["30/4/1975", "2/9/1975", "25/4/1976", "7/1/1979"],
        correctIndex: 2,
        explanation:
          "Ngày 25/04/1976, toàn dân đi bầu Quốc hội chung cho nước Việt Nam thống nhất.",
        era: "1976",
      },
      {
        question: "Nước ta đổi tên thành gì sau thống nhất?",
        options: [
          "Việt Nam Dân chủ Cộng hòa",
          "Cộng hòa XHCN Việt Nam",
          "Việt Nam Cộng hòa",
          "Liên bang Việt Nam",
        ],
        correctIndex: 1,
        explanation:
          "Quốc hội khóa VI quyết định đổi tên thành nước CHXHCN Việt Nam.",
        era: "1976",
      },
      {
        question: "Đại hội IV đề ra nhiệm vụ trung tâm gì?",
        options: [
          "Phát triển công nghệ",
          "Xây dựng CNXH & Bảo vệ Tổ quốc",
          "Mở rộng ngoại giao",
          "Cải cách giáo dục",
        ],
        correctIndex: 1,
        explanation:
          "Đại hội IV: 'Đảng lãnh đạo cả nước xây dựng CNXH và bảo vệ Tổ quốc'.",
        era: "1976",
      },
      {
        question: "Sài Gòn được đổi tên thành gì sau 1975?",
        options: ["Thành phố Hồ Chí Minh", "Thành phố Giải Phóng", "Thành phố Thống Nhất", "Thành phố Cách Mạng"],
        correctIndex: 0,
        explanation: "Sài Gòn được đổi tên thành Thành phố Hồ Chí Minh vào ngày 2/7/1976.",
        era: "1976",
      },
      {
        question: "Quốc hội thống nhất họp khóa đầu tiên vào tháng mấy năm 1976?",
        options: ["Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7"],
        correctIndex: 2,
        explanation: "Quốc hội thống nhất họp phiên đầu tiên từ 24/6 đến 3/7/1976.",
        era: "1976",
      },
      {
        question: "Kế hoạch 5 năm đầu tiên sau thống nhất (1976-1980) tập trung vào gì?",
        options: ["Công nghiệp hóa", "Khôi phục kinh tế", "Mở cửa thị trường", "Phát triển du lịch"],
        correctIndex: 1,
        explanation: "Kế hoạch 5 năm 1976-1980 tập trung khôi phục và phát triển kinh tế sau chiến tranh.",
        era: "1976-80",
      },
      {
        question: "Việt Nam gia nhập Liên Hợp Quốc năm nào?",
        options: ["1975", "1976", "1977", "1978"],
        correctIndex: 2,
        explanation: "Việt Nam chính thức gia nhập Liên Hợp Quốc ngày 20/9/1977.",
        era: "1977",
      },
      {
        question: "Sau thống nhất, miền Nam thực hiện cải tạo gì về kinh tế?",
        options: [
          "Tư nhân hóa",
          "Cải tạo XHCN",
          "Kinh tế thị trường",
          "Mở cửa ngoại thương",
        ],
        correctIndex: 1,
        explanation: "Miền Nam thực hiện cải tạo XHCN: quốc hữu hóa, hợp tác xã hóa nông nghiệp.",
        era: "1976-80",
      },
      {
        question: "Đại hội IV chính thức đổi tên Đảng thành gì?",
        options: [
          "Đảng Lao động Việt Nam",
          "Đảng Cộng sản Việt Nam",
          "Đảng Nhân dân Cách mạng",
          "Đảng Xã hội Việt Nam",
        ],
        correctIndex: 1,
        explanation: "Đại hội IV (12/1976) chính thức đổi tên từ Đảng Lao động Việt Nam thành Đảng Cộng sản Việt Nam.",
        era: "1976",
      },
      {
        question: "Tổng Bí thư Đảng trong giai đoạn thống nhất (1976-1986) là ai?",
        options: ["Hồ Chí Minh", "Trường Chinh", "Lê Duẩn", "Nguyễn Văn Linh"],
        correctIndex: 2,
        explanation: "Lê Duẩn là Bí thư thứ nhất/Tổng Bí thư từ 1960 đến khi qua đời tháng 7/1986, lãnh đạo đất nước qua giai đoạn thống nhất.",
        era: "1976-86",
      },
      {
        question: "Chủ tịch nước đầu tiên của nước CHXHCN Việt Nam (7/1976) là ai?",
        options: ["Phạm Văn Đồng", "Trường Chinh", "Tôn Đức Thắng", "Võ Nguyên Giáp"],
        correctIndex: 2,
        explanation: "Tôn Đức Thắng tiếp tục được bầu làm Chủ tịch nước CHXHCN Việt Nam tại kỳ họp đầu tiên Quốc hội khóa VI.",
        era: "1976",
      },
      {
        question: "Quốc ca của nước CHXHCN Việt Nam có tên gọi là gì?",
        options: ["Bài ca thống nhất", "Tiến quân ca", "Giải phóng miền Nam", "Quốc tế ca"],
        correctIndex: 1,
        explanation: "'Tiến quân ca' của Văn Cao trở thành Quốc ca chính thức của nước CHXHCN Việt Nam.",
        era: "1976",
      },
      {
        question: "Hiến pháp đầu tiên của nước CHXHCN Việt Nam (sau thống nhất) được thông qua năm nào?",
        options: ["1976", "1978", "1980", "1982"],
        correctIndex: 2,
        explanation: "Hiến pháp 1980 là hiến pháp đầu tiên của nước thống nhất, thể hiện ý chí xây dựng CNXH trên cả nước.",
        era: "1980",
      },
      {
        question: "Việt Nam gia nhập ASEAN vào năm nào?",
        options: ["1990", "1993", "1995", "1997"],
        correctIndex: 2,
        explanation: "Ngày 28/7/1995, Việt Nam chính thức gia nhập ASEAN - bước ngoặt lớn trong hội nhập khu vực.",
        era: "1995",
      },
      {
        question: "Thủ tướng Chính phủ đầu tiên của nước thống nhất là ai?",
        options: ["Võ Nguyên Giáp", "Phạm Văn Đồng", "Lê Duẩn", "Trường Chinh"],
        correctIndex: 1,
        explanation: "Phạm Văn Đồng tiếp tục giữ chức Thủ tướng Chính phủ CHXHCN Việt Nam từ 1976 đến 1987.",
        era: "1976",
      },
      {
        question: "Quốc kỳ và Quốc huy của nước CHXHCN Việt Nam được xác định trong văn bản nào?",
        options: ["Hiến pháp 1959", "Hiến pháp 1980", "Nghị quyết Quốc hội 7/1976", "Quyết định Bộ Chính trị"],
        correctIndex: 2,
        explanation: "Kỳ họp đầu tiên Quốc hội khóa VI (7/1976) xác định các biểu tượng quốc gia: Quốc kỳ, Quốc huy, Quốc ca.",
        era: "1976",
      },
      {
        question: "Kế hoạch Nhà nước 5 năm lần thứ hai (1976-1980) đạt kết quả như thế nào?",
        options: [
          "Vượt mọi chỉ tiêu đề ra",
          "Đạt khoảng 80% chỉ tiêu",
          "Hầu hết các mục tiêu không đạt",
          "Chỉ đạt 50% chỉ tiêu",
        ],
        correctIndex: 2,
        explanation: "Kế hoạch 5 năm 1976-1980 thất bại nặng nề do cơ chế bao cấp và duy ý chí, hầu hết chỉ tiêu không đạt.",
        era: "1976-80",
      },
      {
        question: "Đại hội IV (1976) chủ trương ưu tiên phát triển ngành nào - đây là một sai lầm chủ quan?",
        options: ["Nông nghiệp", "Thương mại", "Công nghiệp nặng", "Dịch vụ"],
        correctIndex: 2,
        explanation: "Đại hội IV ưu tiên công nghiệp nặng khi điều kiện chưa cho phép, dẫn đến khó khăn kinh tế.",
        era: "1976",
      },
      {
        question: "Việt Nam bình thường hóa quan hệ ngoại giao với Mỹ vào năm nào?",
        options: ["1992", "1993", "1994", "1995"],
        correctIndex: 3,
        explanation: "Ngày 11/7/1995, Việt Nam và Mỹ chính thức thiết lập quan hệ ngoại giao, mở ra trang mới trong quan hệ hai nước.",
        era: "1995",
      },
      {
        question: "Đồng tiền Việt Nam thống nhất được lưu hành trên cả nước từ năm nào?",
        options: ["1975", "1976", "1977", "1978"],
        correctIndex: 1,
        explanation: "Năm 1976, đồng tiền thống nhất được ban hành, thay thế hai loại tiền ở hai miền trước đó.",
        era: "1976",
      },
      {
        question: "Chiến dịch bình định kinh tế đưa dân từ thành thị về vùng 'kinh tế mới' nhằm mục đích gì?",
        options: [
          "Phát triển công nghiệp",
          "Giảm dân số thành thị và khai phá đất hoang",
          "Xây dựng quốc phòng",
          "Phát triển du lịch",
        ],
        correctIndex: 1,
        explanation: "Chính sách vùng kinh tế mới nhằm giảm áp lực dân số đô thị và khai hoang phát triển nông nghiệp sau giải phóng.",
        era: "1976-80",
      },
    ],
  },
  /* ──────── LEVEL 3: BIÊN GIỚI ──────── */
  {
    name: "BIÊN GIỚI",
    emoji: "⚔️",
    bg: "#2a3a1a",
    groundColor: "#4A5D23",
    enemyColor: "#dd7722",
    map: {
      terrain: "mountain",
      weather: "fog",
      obstacles: [
        { x: 80, y: 60, w: 70, h: 30, type: "sandbag" },
        { x: 350, y: 150, w: 80, h: 16, type: "trench" },
        { x: 550, y: 250, w: 60, h: 60, type: "crater" },
        { x: 200, y: 380, w: 50, h: 40, type: "bunker" },
        { x: 600, y: 450, w: 70, h: 30, type: "sandbag" },
        { x: 100, y: 200, w: 40, h: 40, type: "crater" },
      ],
      decorations: [
        { x: 300, y: 80, type: "flag" },
        { x: 450, y: 400, type: "smoke" },
        { x: 150, y: 480, type: "shell_casing" },
        { x: 500, y: 100, type: "debris" },
      ],
    },
    questions: [
      {
        question: "Chiến tranh biên giới phía Bắc bắt đầu ngày nào?",
        options: ["30/4/1975", "17/2/1979", "7/1/1979", "5/3/1979"],
        correctIndex: 1,
        explanation:
          "Ngày 17/02/1979, hơn 60 vạn quân tấn công biên giới phía Bắc.",
        era: "1979",
      },
      {
        question:
          "Tập đoàn nào ở Campuchia gây ra chiến tranh Tây Nam?",
        options: [
          "Lon Nol",
          "Pol Pot - Ieng Sary",
          "Norodom Sihanouk",
          "Hun Sen",
        ],
        correctIndex: 1,
        explanation:
          "Tập đoàn Pol Pot - Ieng Sary gây chiến tranh biên giới Tây Nam.",
        era: "1978",
      },
      {
        question: "Thủ đô Phnom Penh được giải phóng ngày nào?",
        options: ["23/12/1978", "7/1/1979", "17/2/1979", "30/4/1979"],
        correctIndex: 1,
        explanation:
          "Ngày 07/01/1979, Quân tình nguyện VN tiến vào giải phóng Phnom Penh.",
        era: "1979",
      },
      {
        question: "Mặt trận Vị Xuyên còn có tên gọi nào?",
        options: [
          "Cối xay thịt",
          "Lò vôi thế kỷ",
          "Cánh đồng chết",
          "Đồi máu",
        ],
        correctIndex: 1,
        explanation:
          "Mặt trận Vị Xuyên mệnh danh là 'lò vôi thế kỷ' vì sự khốc liệt.",
        era: "1984-89",
      },
      {
        question: "Quân tình nguyện VN tại Campuchia được gọi là gì?",
        options: [
          "Đội quân thép",
          "Đội quân nhà Phật",
          "Đội quân giải phóng",
          "Đội quân anh hùng",
        ],
        correctIndex: 1,
        explanation:
          "Quân tình nguyện VN được gọi là 'Đội quân nhà Phật', cứu dân Campuchia.",
        era: "1979-89",
      },
      {
        question: "Trận phòng thủ biên giới phía Bắc kéo dài đến năm nào?",
        options: ["1979", "1984", "1989", "1991"],
        correctIndex: 2,
        explanation: "Xung đột biên giới phía Bắc kéo dài từ 1979 đến 1989 mới hoàn toàn chấm dứt.",
        era: "1979-89",
      },
      {
        question: "Bao nhiêu tỉnh biên giới phía Bắc bị tấn công tháng 2/1979?",
        options: ["3 tỉnh", "4 tỉnh", "6 tỉnh", "8 tỉnh"],
        correctIndex: 2,
        explanation: "6 tỉnh biên giới phía Bắc bị tấn công: Quảng Ninh, Lạng Sơn, Cao Bằng, Hà Tuyên, Hoàng Liên Sơn, Lai Châu.",
        era: "1979",
      },
      {
        question: "Anh hùng Lê Đình Chinh hy sinh ở đâu?",
        options: ["Lạng Sơn", "Cao Bằng", "Biên giới Tây Nam", "Vị Xuyên"],
        correctIndex: 2,
        explanation: "Lê Đình Chinh hy sinh tại biên giới Tây Nam năm 1978 khi chống quân Pol Pot xâm lấn.",
        era: "1978",
      },
      {
        question: "Sau khi giải phóng Campuchia, VN giúp nước này điều gì?",
        options: [
          "Xây dựng quân đội",
          "Hồi sinh đất nước khỏi diệt chủng",
          "Khai thác tài nguyên",
          "Sáp nhập lãnh thổ",
        ],
        correctIndex: 1,
        explanation: "Việt Nam giúp Campuchia hồi sinh sau nạn diệt chủng khiến gần 2 triệu người chết.",
        era: "1979",
      },
      {
        question: "Quân VN rút khỏi Campuchia hoàn toàn vào năm nào?",
        options: ["1985", "1987", "1989", "1991"],
        correctIndex: 2,
        explanation: "Quân tình nguyện Việt Nam rút hoàn toàn khỏi Campuchia vào tháng 9/1989.",
        era: "1989",
      },
      {
        question: "Vụ thảm sát tại xã Ba Chúc (An Giang) do Khmer Đỏ thực hiện năm 1978 khiến bao nhiêu người chết?",
        options: ["Hơn 500 người", "Hơn 1.000 người", "Hơn 3.000 người", "Hơn 5.000 người"],
        correctIndex: 2,
        explanation: "Tháng 4/1978, Khmer Đỏ tàn sát hơn 3.000 thường dân tại Ba Chúc, là tội ác diệt chủng điển hình.",
        era: "1978",
      },
      {
        question: "Cuộc tổng phản công vào Campuchia của quân ta bắt đầu ngày nào?",
        options: ["1/12/1978", "23/12/1978", "7/1/1979", "17/2/1979"],
        correctIndex: 1,
        explanation: "Ngày 23/12/1978, Quân đội Việt Nam phối hợp cùng lực lượng cách mạng Campuchia mở cuộc tổng phản công.",
        era: "1978",
      },
      {
        question: "Khmer Đỏ đã chiếm đóng các đảo nào của Việt Nam?",
        options: ["Hoàng Sa, Trường Sa", "Thổ Chu, Phú Quốc", "Cát Bà, Cô Tô", "Phú Quý, Lý Sơn"],
        correctIndex: 1,
        explanation: "Khmer Đỏ xua quân đánh chiếm đảo Thổ Chu và tấn công đảo Phú Quốc của Việt Nam.",
        era: "1975-78",
      },
      {
        question: "Khmer Đỏ huy động bao nhiêu sư đoàn áp sát biên giới Tây Nam?",
        options: ["5 sư đoàn", "10 sư đoàn", "15 sư đoàn", "19 sư đoàn"],
        correctIndex: 3,
        explanation: "Khmer Đỏ huy động 19 sư đoàn (hơn 10 vạn quân) áp sát biên giới Tây Nam trước khi ta phản công.",
        era: "1978",
      },
      {
        question: "Lý do chính Trung Quốc tấn công biên giới phía Bắc Việt Nam năm 1979?",
        options: [
          "Tranh chấp lãnh thổ",
          "Để trả đũa cho chế độ Khmer Đỏ mà VN vừa đánh đổ",
          "Xung đột kinh tế",
          "Việt Nam tấn công trước",
        ],
        correctIndex: 1,
        explanation: "Trung Quốc tấn công Việt Nam để 'dạy một bài học', trả đũa cho đồng minh Khmer Đỏ bị VN đánh đổ tháng 1/1979.",
        era: "1979",
      },
      {
        question: "Nạn diệt chủng dưới chế độ Pol Pot - Khmer Đỏ khiến bao nhiêu người Campuchia chết?",
        options: ["Khoảng 500 nghìn", "Khoảng 1 triệu", "1,7 - 2 triệu người", "Hơn 3 triệu"],
        correctIndex: 2,
        explanation: "Chế độ Pol Pot (1975-1979) khiến khoảng 1,7 - 2 triệu người Campuchia chết, gần 1/4 dân số.",
        era: "1975-79",
      },
      {
        question: "Lệnh Tổng động viên toàn quốc bảo vệ biên giới phía Bắc được ban bố ngày nào?",
        options: ["17/2/1979", "25/2/1979", "5/3/1979", "18/3/1979"],
        correctIndex: 2,
        explanation: "Ngày 5/3/1979, Chủ tịch nước Tôn Đức Thắng công bố lệnh Tổng động viên toàn quốc.",
        era: "1979",
      },
      {
        question: "Quân địch tấn công biên giới phía Bắc cơ bản rút về bên kia biên giới vào ngày nào?",
        options: ["5/3/1979", "10/3/1979", "18/3/1979", "30/4/1979"],
        correctIndex: 2,
        explanation: "Đến ngày 18/3/1979, quân địch chịu nhiều thiệt hại phải rút về bên kia biên giới phía Bắc.",
        era: "1979",
      },
      {
        question: "Tỉnh Lạng Sơn bị chiếm đóng trong chiến tranh biên giới phía Bắc bao lâu?",
        options: ["3 ngày", "5 ngày", "10 ngày", "1 tháng"],
        correctIndex: 2,
        explanation: "Sau 10 ngày chiến đấu ác liệt, Lạng Sơn tạm thời bị chiếm trước khi địch phải rút lui.",
        era: "1979",
      },
      {
        question: "Quân tình nguyện Việt Nam tại Campuchia đóng quân trong bao nhiêu năm?",
        options: ["5 năm", "8 năm", "10 năm", "12 năm"],
        correctIndex: 2,
        explanation: "Quân tình nguyện VN ở Campuchia từ 1979 đến 1989 - 10 năm giúp xây dựng và bảo vệ đất nước này.",
        era: "1979-89",
      },
      {
        question: "Cụm từ nào nói lên tinh thần của quân tình nguyện Việt Nam tại Campuchia?",
        options: [
          "Đội quân chinh phục",
          "Đội quân nhà Phật",
          "Đội quân thắng trận",
          "Đội quân hòa bình",
        ],
        correctIndex: 1,
        explanation: "Nhân dân Campuchia và thế giới gọi quân tình nguyện VN là 'Đội quân nhà Phật' vì tinh thần nhân đạo.",
        era: "1979-89",
      },
      {
        question: "Toàn tuyến biên giới phía Bắc Việt Nam dài khoảng bao nhiêu km?",
        options: ["600 km", "800 km", "1.000 km", "Hơn 1.200 km"],
        correctIndex: 3,
        explanation: "Toàn tuyến biên giới đất liền phía Bắc tiếp giáp với Trung Quốc dài hơn 1.200 km.",
        era: "1979",
      },
      {
        question: "Chiến tranh biên giới phía Bắc 1979 còn được gọi là gì trong lịch sử Việt Nam?",
        options: [
          "Cuộc chiến tranh vệ quốc",
          "Chiến tranh chống xâm lược phía Bắc",
          "Trận chiến Bắc Hà",
          "Chiến tranh phòng thủ",
        ],
        correctIndex: 1,
        explanation: "Lịch sử gọi đây là cuộc chiến tranh bảo vệ biên giới phía Bắc, thể hiện tinh thần vệ quốc của quân dân ta.",
        era: "1979",
      },
    ],
  },
  /* ──────── LEVEL 4: KINH TẾ & ĐỔI MỚI ──────── */
  {
    name: "KINH TẾ & ĐỔI MỚI",
    emoji: "📜",
    bg: "#1a3a5c",
    groundColor: "#1a5276",
    enemyColor: "#8833aa",
    map: {
      terrain: "urban",
      weather: "clear",
      obstacles: [
        { x: 100, y: 100, w: 80, h: 60, type: "wall" },
        { x: 500, y: 80, w: 60, h: 40, type: "wall" },
        { x: 300, y: 300, w: 50, h: 50, type: "bunker" },
        { x: 150, y: 420, w: 40, h: 30, type: "barrel" },
        { x: 580, y: 400, w: 80, h: 60, type: "wall" },
      ],
      decorations: [
        { x: 250, y: 150, type: "debris" },
        { x: 450, y: 350, type: "debris" },
        { x: 620, y: 100, type: "smoke" },
      ],
    },
    questions: [
      {
        question: "Đại hội V coi ngành nào là 'mặt trận hàng đầu'?",
        options: ["Công nghiệp nặng", "Giáo dục", "Nông nghiệp", "Quốc phòng"],
        correctIndex: 2,
        explanation:
          "Đại hội V quyết định coi nông nghiệp là mặt trận hàng đầu.",
        era: "1982",
      },
      {
        question: "Lạm phát cao nhất 1985-86 lên tới bao nhiêu?",
        options: ["200%", "500%", "Trên 700%", "50%"],
        correctIndex: 2,
        explanation:
          "Lạm phát phi mã lên tới hơn 700% trong giai đoạn 1985-1986.",
        era: "1986",
      },
      {
        question: "Cơ chế nào gây khủng hoảng kinh tế trước Đổi Mới?",
        options: [
          "Kinh tế thị trường",
          "Tập trung quan liêu bao cấp",
          "Kinh tế hỗn hợp",
          "Kinh tế tư nhân",
        ],
        correctIndex: 1,
        explanation:
          "Cơ chế tập trung quan liêu bao cấp triệt tiêu mọi động lực phát triển.",
        era: "1982-86",
      },
      {
        question: "Khoán 100 ban hành năm nào?",
        options: ["1979", "1981", "1983", "1986"],
        correctIndex: 1,
        explanation:
          "Chỉ thị 100 về khoán sản phẩm trong nông nghiệp ban hành năm 1981.",
        era: "1981",
      },
      {
        question: "Đại hội VI (12/1986) được gọi là gì?",
        options: [
          "Đại hội Thống nhất",
          "Đại hội Đổi mới",
          "Đại hội Cải cách",
          "Đại hội Mở cửa",
        ],
        correctIndex: 1,
        explanation:
          "Đại hội VI mở ra thời kỳ Đổi mới toàn diện đất nước.",
        era: "1986",
      },
      {
        question: "Luật Đầu tư nước ngoài đầu tiên được ban hành năm nào?",
        options: ["1986", "1987", "1988", "1990"],
        correctIndex: 1,
        explanation: "Luật Đầu tư nước ngoài tại Việt Nam được ban hành ngày 29/12/1987.",
        era: "1987",
      },
      {
        question: "Khoán 10 (Nghị quyết 10) ban hành năm nào?",
        options: ["1986", "1988", "1990", "1992"],
        correctIndex: 1,
        explanation: "Nghị quyết 10 (Khoán 10) ban hành năm 1988, giao đất cho hộ nông dân tự chủ sản xuất.",
        era: "1988",
      },
      {
        question: "Trước Đổi Mới, Việt Nam chủ yếu nhận viện trợ từ đâu?",
        options: ["Mỹ", "Liên Xô và các nước XHCN", "Trung Quốc", "Nhật Bản"],
        correctIndex: 1,
        explanation: "Trước 1986, Việt Nam phụ thuộc viện trợ từ Liên Xô và các nước XHCN.",
        era: "1976-86",
      },
      {
        question: "Đổi Mới chuyển nền kinh tế sang mô hình gì?",
        options: [
          "Kinh tế tư bản",
          "Kinh tế thị trường định hướng XHCN",
          "Kinh tế kế hoạch hóa",
          "Kinh tế tự cung tự cấp",
        ],
        correctIndex: 1,
        explanation: "Đổi Mới chuyển sang kinh tế thị trường định hướng XHCN, thừa nhận nhiều thành phần kinh tế.",
        era: "1986",
      },
      {
        question: "Tổng Bí thư nào khởi xướng đường lối Đổi Mới?",
        options: ["Lê Duẩn", "Trường Chinh", "Nguyễn Văn Linh", "Đỗ Mười"],
        correctIndex: 2,
        explanation: "Tổng Bí thư Nguyễn Văn Linh được coi là kiến trúc sư của công cuộc Đổi Mới (1986).",
        era: "1986",
      },
      {
        question: "Hội nghị TW 8 (6/1985) chọn khâu đột phá nào để xóa bỏ cơ chế bao cấp?",
        options: [
          "Giáo dục - Y tế - Quốc phòng",
          "Giá - Lương - Tiền",
          "Sản xuất - Xuất khẩu - Đầu tư",
          "Công nghiệp - Nông nghiệp - Dịch vụ",
        ],
        correctIndex: 1,
        explanation: "Hội nghị TW 8 (6/1985) là Bước đột phá thứ hai, chọn 'Giá - Lương - Tiền' làm khâu đột phá.",
        era: "1985",
      },
      {
        question: "Hội nghị TW 6 (8/1979) đưa ra chủ trương gì mang tính đột phá?",
        options: [
          "Tập trung quan liêu bao cấp",
          "Sản xuất bung ra",
          "Giá - Lương - Tiền",
          "Đổi mới toàn diện",
        ],
        correctIndex: 1,
        explanation: "Hội nghị TW 6 (8/1979) lịch sử đưa ra chủ trương 'sản xuất bung ra', mở đầu cho bước đột phá kinh tế đầu tiên.",
        era: "1979",
      },
      {
        question: "Phương châm hành động đột phá của Đại hội VI là gì?",
        options: [
          "Đoàn kết - Đổi mới - Phát triển",
          "Nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật",
          "Dân giàu, nước mạnh, xã hội công bằng văn minh",
          "Ổn định - Phát triển - Hội nhập",
        ],
        correctIndex: 1,
        explanation: "'Nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật' là phương châm hành động mang tính đột phá của Đại hội VI.",
        era: "1986",
      },
      {
        question: "Đổi tiền năm 1985 gây hậu quả gì cho nền kinh tế?",
        options: [
          "Ổn định giá cả, tăng trưởng kinh tế",
          "Lạm phát tăng vọt, đời sống khó khăn hơn",
          "Thu hẹp khoảng cách giàu nghèo",
          "Tăng xuất khẩu",
        ],
        correctIndex: 1,
        explanation: "Đổi tiền tháng 9/1985 thất bại, gây hỗn loạn thị trường, lạm phát tăng vọt lên trên 700%.",
        era: "1985",
      },
      {
        question: "Đại hội VI đề ra 3 chương trình kinh tế trọng điểm nào?",
        options: [
          "Nông nghiệp, Công nghiệp nặng, Dịch vụ",
          "Lương thực-thực phẩm, Hàng tiêu dùng, Hàng xuất khẩu",
          "Xây dựng, Thương mại, Ngoại giao",
          "Quốc phòng, Giáo dục, Y tế",
        ],
        correctIndex: 1,
        explanation: "Ba chương trình kinh tế của Đại hội VI: Lương thực-thực phẩm, Hàng tiêu dùng, và Hàng xuất khẩu.",
        era: "1986",
      },
      {
        question: "Trong thời bao cấp, người dân mua lương thực qua hình thức nào?",
        options: ["Tiền mặt tự do", "Tem phiếu", "Đổi hàng", "Ngân hàng"],
        correctIndex: 1,
        explanation: "Thời bao cấp, mọi nhu yếu phẩm được phân phối qua hệ thống tem phiếu, nhà nước quản lý toàn bộ.",
        era: "1975-86",
      },
      {
        question: "Luật Doanh nghiệp tư nhân đầu tiên của Việt Nam được ban hành năm nào?",
        options: ["1987", "1988", "1990", "1992"],
        correctIndex: 2,
        explanation: "Luật Doanh nghiệp tư nhân ban hành năm 1990, thừa nhận quyền kinh doanh của khu vực tư nhân trong nền kinh tế.",
        era: "1990",
      },
      {
        question: "Việt Nam lần đầu tiên xuất khẩu gạo trở lại sau bao nhiêu năm thiếu ăn?",
        options: ["1987", "1988", "1989", "1991"],
        correctIndex: 2,
        explanation: "Năm 1989, sau Khoán 10, Việt Nam xuất khẩu 1,4 triệu tấn gạo - từ nước thiếu ăn thành nước xuất khẩu gạo.",
        era: "1989",
      },
      {
        question: "'Bước đột phá thứ ba' trong tiến trình tiền Đổi Mới gắn với hội nghị nào?",
        options: [
          "Hội nghị TW 6 (8/1979)",
          "Hội nghị TW 8 (6/1985)",
          "Hội nghị Bộ Chính trị (8/1986)",
          "Đại hội VI (12/1986)",
        ],
        correctIndex: 2,
        explanation: "Hội nghị Bộ Chính trị tháng 8/1986 là Bước đột phá thứ ba, thừa nhận nền kinh tế hàng hóa nhiều thành phần, định hình tư duy cho Đại hội VI.",
        era: "1986",
      },
      {
        question: "Giai đoạn 1975-1986 được nhìn nhận là giai đoạn gì trong lịch sử Đổi Mới?",
        options: [
          "Giai đoạn bứt phá kinh tế",
          "11 năm thai nghén đường lối Đổi Mới",
          "Giai đoạn khôi phục kinh tế",
          "Giai đoạn hội nhập quốc tế",
        ],
        correctIndex: 1,
        explanation: "11 năm 1975-1986 là giai đoạn 'thai nghén vĩ đại', trải qua nhiều phép thử để hình thành đường lối Đổi Mới.",
        era: "1975-86",
      },
      {
        question: "Cơ chế kinh tế nào Đổi Mới hướng tới thay thế bao cấp?",
        options: [
          "Kinh tế kế hoạch hóa hoàn toàn",
          "Kinh tế tư bản tự do",
          "Kinh tế hàng hóa nhiều thành phần theo cơ chế thị trường",
          "Kinh tế tự cung tự cấp",
        ],
        correctIndex: 2,
        explanation: "Đổi Mới xây dựng nền kinh tế hàng hóa nhiều thành phần, vận hành theo cơ chế thị trường có sự quản lý của nhà nước.",
        era: "1986",
      },
      {
        question: "Trước Đại hội VI (12/1986), ai là Tổng Bí thư Đảng?",
        options: ["Hồ Chí Minh", "Lê Duẩn", "Trường Chinh", "Đỗ Mười"],
        correctIndex: 2,
        explanation: "Trường Chinh giữ chức Tổng Bí thư từ tháng 7/1986 (sau khi Lê Duẩn qua đời) đến Đại hội VI, rồi Nguyễn Văn Linh được bầu.",
        era: "1986",
      },
      {
        question: "Kế hoạch 5 năm 1981-1985 có kết quả như thế nào so với 1976-1980?",
        options: [
          "Tệ hơn nhiều",
          "Tương đương",
          "Khá hơn nhờ Khoán 100 nhưng vẫn chưa ổn định",
          "Vượt mọi chỉ tiêu",
        ],
        correctIndex: 2,
        explanation: "Nhờ Khoán 100 và Hội nghị TW 6, kế hoạch 1981-1985 khá hơn nhưng kinh tế vẫn khủng hoảng, lạm phát cao.",
        era: "1981-85",
      },
    ],
  },
  /* ──────── LEVEL 5: ĐIỆN BIÊN PHỦ ──────── */
  {
    name: "ĐIỆN BIÊN PHỦ",
    emoji: "🏔️",
    bg: "#3d2b1f",
    groundColor: "#5c4033",
    enemyColor: "#2266aa",
    map: {
      terrain: "highland",
      weather: "fog",
      obstacles: [
        { x: 100, y: 80, w: 80, h: 16, type: "trench" },
        { x: 300, y: 60, w: 60, h: 40, type: "bunker" },
        { x: 550, y: 120, w: 70, h: 16, type: "trench" },
        { x: 150, y: 250, w: 80, h: 30, type: "sandbag" },
        { x: 400, y: 300, w: 60, h: 60, type: "crater" },
        { x: 600, y: 350, w: 50, h: 40, type: "bunker" },
        { x: 250, y: 450, w: 60, h: 16, type: "trench" },
        { x: 500, y: 480, w: 50, h: 20, type: "sandbag" },
        { x: 80, y: 400, w: 60, h: 60, type: "crater" },
      ],
      decorations: [
        { x: 200, y: 150, type: "flag" },
        { x: 450, y: 200, type: "smoke" },
        { x: 350, y: 400, type: "fire" },
        { x: 600, y: 50, type: "debris" },
        { x: 100, y: 500, type: "shell_casing" },
      ],
    },
    questions: [
      {
        question: "Chiến dịch Điện Biên Phủ diễn ra năm nào?",
        options: ["1952", "1953", "1954", "1955"],
        correctIndex: 2,
        explanation:
          "Chiến dịch Điện Biên Phủ diễn ra từ 13/3 đến 7/5/1954.",
        era: "1954",
      },
      {
        question: "Ai là Tổng chỉ huy chiến dịch Điện Biên Phủ?",
        options: [
          "Hồ Chí Minh",
          "Võ Nguyên Giáp",
          "Phạm Văn Đồng",
          "Trường Chinh",
        ],
        correctIndex: 1,
        explanation:
          "Đại tướng Võ Nguyên Giáp trực tiếp chỉ huy chiến dịch Điện Biên Phủ.",
        era: "1954",
      },
      {
        question: "Phương châm tác chiến cuối cùng của ta ở ĐBP là gì?",
        options: [
          "Đánh nhanh thắng nhanh",
          "Đánh chắc tiến chắc",
          "Chiến tranh du kích",
          "Phòng ngự tích cực",
        ],
        correctIndex: 1,
        explanation:
          "Tướng Giáp thay đổi phương châm từ 'đánh nhanh thắng nhanh' sang 'đánh chắc tiến chắc'.",
        era: "1954",
      },
      {
        question: "Tướng Pháp chỉ huy ở Điện Biên Phủ là ai?",
        options: [
          "De Castries",
          "Navarre",
          "De Lattre",
          "Cogny",
        ],
        correctIndex: 0,
        explanation:
          "Tướng De Castries chỉ huy tập đoàn cứ điểm Điện Biên Phủ và đã bị bắt sống.",
        era: "1954",
      },
      {
        question: "Anh hùng nào lấy thân mình lấp lỗ châu mai?",
        options: [
          "Tô Vĩnh Diện",
          "Phan Đình Giót",
          "Bế Văn Đàn",
          "La Văn Cầu",
        ],
        correctIndex: 1,
        explanation:
          "Phan Đình Giót anh dũng lấy thân mình lấp lỗ châu mai tại đồi Him Lam.",
        era: "1954",
      },
      {
        question: "Chiến dịch Điện Biên Phủ chia thành mấy đợt tiến công?",
        options: ["2 đợt", "3 đợt", "4 đợt", "5 đợt"],
        correctIndex: 1,
        explanation: "Chiến dịch ĐBP chia 3 đợt: đợt 1 (13-17/3), đợt 2 (30/3-30/4), đợt 3 (1-7/5/1954).",
        era: "1954",
      },
      {
        question: "Tô Vĩnh Diện hy sinh khi làm nhiệm vụ gì?",
        options: ["Đánh bộc phá", "Kéo pháo", "Đào hào", "Trinh sát"],
        correctIndex: 1,
        explanation: "Tô Vĩnh Diện lấy thân chèn pháo khi kéo pháo vào trận địa Điện Biên Phủ.",
        era: "1954",
      },
      {
        question: "Cứ điểm đầu tiên bị tiêu diệt ở Điện Biên Phủ là gì?",
        options: ["Độc Lập", "Him Lam", "Bản Kéo", "Hồng Cúm"],
        correctIndex: 1,
        explanation: "Cứ điểm Him Lam bị tiêu diệt đêm 13/3/1954, mở màn chiến dịch.",
        era: "1954",
      },
      {
        question: "Chiến thắng ĐBP góp phần đưa đến hội nghị nào?",
        options: ["Hội nghị Paris", "Hội nghị Geneva", "Hội nghị Bandung", "Hội nghị Potsdam"],
        correctIndex: 1,
        explanation: "Chiến thắng ĐBP (7/5/1954) buộc Pháp ký Hiệp định Geneva (21/7/1954).",
        era: "1954",
      },
      {
        question: "Bao nhiêu dân công tham gia phục vụ chiến dịch ĐBP?",
        options: ["100.000", "200.000", "260.000", "350.000"],
        correctIndex: 2,
        explanation: "Khoảng 260.000 dân công tham gia vận chuyển lương thực, đạn dược phục vụ chiến dịch.",
        era: "1954",
      },
      {
        question: "Điện Biên Phủ thuộc tỉnh nào của Việt Nam?",
        options: ["Lai Châu", "Điện Biên (Lai Châu cũ)", "Sơn La", "Hòa Bình"],
        correctIndex: 1,
        explanation: "Điện Biên Phủ nay thuộc tỉnh Điện Biên (trước đây thuộc tỉnh Lai Châu), vùng Tây Bắc Việt Nam.",
        era: "1954",
      },
      {
        question: "Cuộc kháng chiến chống thực dân Pháp của Việt Nam kéo dài bao nhiêu năm?",
        options: ["5 năm", "7 năm", "9 năm", "12 năm"],
        correctIndex: 2,
        explanation: "Cuộc kháng chiến chống Pháp kéo dài 9 năm (1945-1954), kết thúc với Chiến thắng Điện Biên Phủ.",
        era: "1945-54",
      },
      {
        question: "Quân Pháp ở Điện Biên Phủ có khoảng bao nhiêu quân?",
        options: ["5.000", "10.000", "16.000", "25.000"],
        correctIndex: 2,
        explanation: "Tập đoàn cứ điểm Điện Biên Phủ có khoảng 16.200 quân thuộc nhiều quốc tịch cùng trang bị hiện đại.",
        era: "1954",
      },
      {
        question: "Hiệp định Geneva 1954 chia đôi Việt Nam tại vĩ tuyến mấy?",
        options: ["Vĩ tuyến 13", "Vĩ tuyến 16", "Vĩ tuyến 17", "Vĩ tuyến 18"],
        correctIndex: 2,
        explanation: "Hiệp định Geneva (7/1954) lấy vĩ tuyến 17 (sông Bến Hải) làm ranh giới tạm thời chia đôi Việt Nam.",
        era: "1954",
      },
      {
        question: "Tướng Navarre là ai trong chiến tranh Đông Dương?",
        options: [
          "Chỉ huy tập đoàn cứ điểm ĐBP",
          "Tổng chỉ huy quân đội Pháp ở Đông Dương",
          "Bộ trưởng quốc phòng Pháp",
          "Đại sứ Pháp tại Việt Nam",
        ],
        correctIndex: 1,
        explanation: "Tướng Navarre là Tổng chỉ huy quân đội viễn chinh Pháp ở Đông Dương, người lập ra 'Kế hoạch Navarre' với Điện Biên Phủ.",
        era: "1954",
      },
      {
        question: "Anh hùng La Văn Cầu trong chiến dịch ĐBP đã làm gì?",
        options: [
          "Lấy thân lấp lỗ châu mai",
          "Chèn thân dưới pháo để cứu pháo",
          "Bị thương nhưng vẫn chiến đấu, chặt bỏ cánh tay bị thương để tiếp tục",
          "Hy sinh khi đánh cứ điểm Him Lam",
        ],
        correctIndex: 2,
        explanation: "La Văn Cầu bị thương nát cánh tay nhưng xin chỉ huy chặt đứt để tiếp tục chiến đấu, thể hiện tinh thần anh hùng.",
        era: "1954",
      },
      {
        question: "Cứ điểm Độc Lập (gần Him Lam) bị tiêu diệt đêm nào?",
        options: ["13/3/1954", "14/3/1954", "15/3/1954", "17/3/1954"],
        correctIndex: 2,
        explanation: "Sau khi Him Lam thất thủ (13/3), cứ điểm Độc Lập bị tiêu diệt đêm 14 rạng 15/3/1954.",
        era: "1954",
      },
      {
        question: "Chiến thắng Điện Biên Phủ ảnh hưởng đến phong trào giải phóng dân tộc trên thế giới như thế nào?",
        options: [
          "Không ảnh hưởng nhiều",
          "Cổ vũ mạnh mẽ phong trào đấu tranh giải phóng thuộc địa trên toàn thế giới",
          "Chỉ ảnh hưởng đến châu Á",
          "Gây lo ngại cho các nước phương Tây",
        ],
        correctIndex: 1,
        explanation: "Chiến thắng ĐBP 1954 cổ vũ mạnh mẽ các dân tộc thuộc địa châu Á, châu Phi, Mỹ La-tinh đứng lên giành độc lập.",
        era: "1954",
      },
      {
        question: "Đại bác (pháo) của ta được đưa vào trận địa ĐBP bằng cách nào?",
        options: [
          "Máy bay vận tải",
          "Xe tăng kéo",
          "Kéo bằng tay và sức người qua rừng núi hiểm trở",
          "Đường bộ bình thường",
        ],
        correctIndex: 2,
        explanation: "Bộ đội ta kéo pháo bằng tay qua rừng núi hiểm trở - kỳ tích của tinh thần và sức mạnh con người Việt Nam.",
        era: "1954",
      },
      {
        question: "Hiệp định Geneva về Đông Dương được ký kết ngày nào?",
        options: ["7/5/1954", "21/7/1954", "2/9/1954", "30/11/1954"],
        correctIndex: 1,
        explanation: "Hiệp định Geneva về Đông Dương được ký ngày 21/7/1954, buộc Pháp rút quân và chia đôi Việt Nam.",
        era: "1954",
      },
      {
        question: "Cuộc kháng chiến chống Pháp đặt dưới sự lãnh đạo của ai từ 1945?",
        options: ["Võ Nguyên Giáp", "Hồ Chí Minh", "Phạm Văn Đồng", "Trường Chinh"],
        correctIndex: 1,
        explanation: "Chủ tịch Hồ Chí Minh lãnh đạo toàn dân kháng chiến chống Pháp từ 19/12/1946 đến Chiến thắng ĐBP 1954.",
        era: "1946-54",
      },
      {
        question: "Phương châm ban đầu được lên kế hoạch cho Chiến dịch ĐBP là gì, và tại sao bị thay đổi?",
        options: [
          "'Đánh nhanh thắng nhanh' - thay đổi vì địch được tăng cường",
          "'Đánh chắc tiến chắc' - thay đổi vì quân ta thiếu pháo",
          "'Bao vây cô lập' - thay đổi vì mưa mùa",
          "'Vây điểm diệt viện' - thay đổi vì địch đầu hàng sớm",
        ],
        correctIndex: 0,
        explanation: "Ban đầu là 'đánh nhanh thắng nhanh'. Tướng Giáp quyết định đổi sang 'đánh chắc tiến chắc' khi thấy địch được tăng cường.",
        era: "1954",
      },
      {
        question: "Ngày 7/5/1954 có ý nghĩa lịch sử gì?",
        options: [
          "Ký Hiệp định Geneva",
          "Kết thúc chiến dịch Điện Biên Phủ, De Castries ra đầu hàng",
          "Pháp tuyên bố rút quân",
          "Việt Nam độc lập hoàn toàn",
        ],
        correctIndex: 1,
        explanation: "Ngày 7/5/1954, De Castries cùng toàn bộ Bộ tham mưu và hơn 16.000 quân Pháp ra đầu hàng, kết thúc chiến dịch ĐBP.",
        era: "1954",
      },
    ],
  },
  /* ──────── LEVEL 6: ĐƯỜNG TRƯỜNG SƠN ──────── */
  {
    name: "ĐƯỜNG TRƯỜNG SƠN",
    emoji: "🌿",
    bg: "#0d2b0d",
    groundColor: "#1a4d1a",
    enemyColor: "#cc6600",
    map: {
      terrain: "jungle",
      weather: "rain",
      obstacles: [
        { x: 100, y: 50, w: 50, h: 50, type: "crater" },
        { x: 350, y: 100, w: 40, h: 20, type: "sandbag" },
        { x: 550, y: 200, w: 60, h: 60, type: "crater" },
        { x: 200, y: 300, w: 70, h: 50, type: "tank" },
        { x: 450, y: 400, w: 60, h: 20, type: "sandbag" },
        { x: 80, y: 450, w: 50, h: 50, type: "crater" },
        { x: 620, y: 100, w: 40, h: 30, type: "barrel" },
        { x: 300, y: 200, w: 100, h: 16, type: "trench" },
      ],
      decorations: [
        { x: 180, y: 120, type: "tree_stump" },
        { x: 400, y: 50, type: "tree_stump" },
        { x: 600, y: 350, type: "fire" },
        { x: 100, y: 350, type: "smoke" },
        { x: 500, y: 500, type: "shell_casing" },
        { x: 300, y: 480, type: "tree_stump" },
      ],
    },
    questions: [
      {
        question: "Đường Trường Sơn bắt đầu mở từ năm nào?",
        options: ["1954", "1959", "1965", "1968"],
        correctIndex: 1,
        explanation:
          "Đường Trường Sơn (đường Hồ Chí Minh) bắt đầu mở từ ngày 19/5/1959.",
        era: "1959",
      },
      {
        question: "Đơn vị nào được giao nhiệm vụ mở đường Trường Sơn?",
        options: [
          "Đoàn 559",
          "Đoàn 338",
          "Đoàn 125",
          "Đoàn 772",
        ],
        correctIndex: 0,
        explanation:
          "Đoàn 559 (Binh đoàn Trường Sơn) được thành lập ngày 19/5/1959 để mở đường.",
        era: "1959",
      },
      {
        question: "Tổng chiều dài đường Trường Sơn khoảng bao nhiêu km?",
        options: ["5.000 km", "10.000 km", "20.000 km", "1.000 km"],
        correctIndex: 2,
        explanation:
          "Hệ thống đường Trường Sơn có tổng chiều dài khoảng 20.000 km đường bộ.",
        era: "1959-75",
      },
      {
        question: "Đường Trường Sơn còn gọi là gì?",
        options: [
          "Đường Quốc lộ 1",
          "Đường Hồ Chí Minh",
          "Đường Cách mạng",
          "Đường Thống nhất",
        ],
        correctIndex: 1,
        explanation:
          "Đường Trường Sơn được gọi là đường Hồ Chí Minh – con đường huyền thoại.",
        era: "1959-75",
      },
      {
        question: "Nữ anh hùng nào nổi tiếng trên đường Trường Sơn?",
        options: [
          "Võ Thị Sáu",
          "Nguyễn Thị Minh Khai",
          "Tám thanh niên xung phong Ngã ba Đồng Lộc",
          "Nguyễn Thị Định",
        ],
        correctIndex: 2,
        explanation:
          "10 cô gái ở Ngã ba Đồng Lộc hy sinh anh dũng để bảo vệ huyết mạch Trường Sơn.",
        era: "1968",
      },
      {
        question: "Mỹ dùng chiến dịch gì để phá hoại đường Trường Sơn?",
        options: ["Sấm Rền", "Linebacker", "Arc Light", "Rolling Thunder"],
        correctIndex: 0,
        explanation: "Chiến dịch Sấm Rền (Rolling Thunder) là chiến dịch ném bom quy mô lớn nhắm vào tuyến vận tải Trường Sơn.",
        era: "1965-68",
      },
      {
        question: "Đường Trường Sơn đi qua mấy nước?",
        options: ["1 nước", "2 nước", "3 nước", "4 nước"],
        correctIndex: 2,
        explanation: "Đường Trường Sơn đi qua 3 nước: Việt Nam, Lào, và Campuchia.",
        era: "1959-75",
      },
      {
        question: "Xăng dầu được vận chuyển vào Nam bằng gì trên Trường Sơn?",
        options: ["Xe bồn", "Đường ống xăng dầu", "Thùng phi", "Tàu biển"],
        correctIndex: 1,
        explanation: "Hệ thống đường ống xăng dầu dài hàng nghìn km được xây dựng dọc Trường Sơn.",
        era: "1968-75",
      },
      {
        question: "Thanh niên xung phong trên Trường Sơn chủ yếu làm gì?",
        options: ["Chiến đấu", "Mở đường và rà phá bom", "Nấu ăn", "Trồng trọt"],
        correctIndex: 1,
        explanation: "Thanh niên xung phong chịu trách nhiệm mở đường, rà phá bom mìn, đảm bảo giao thông thông suốt.",
        era: "1959-75",
      },
      {
        question: "Bao nhiêu tấn bom Mỹ đã thả xuống đường Trường Sơn?",
        options: ["1 triệu tấn", "3 triệu tấn", "4 triệu tấn", "Hơn 4 triệu tấn"],
        correctIndex: 3,
        explanation: "Mỹ đã thả hơn 4 triệu tấn bom xuống khu vực Trường Sơn nhưng không ngăn được dòng tiếp tế.",
        era: "1965-73",
      },
      {
        question: "Đoàn 559 (Binh đoàn Trường Sơn) được thành lập ngày tháng năm nào?",
        options: ["5/5/1959", "19/5/1959", "2/9/1959", "22/12/1959"],
        correctIndex: 1,
        explanation: "Đoàn 559 được thành lập ngày 19/5/1959 - trùng với ngày sinh nhật Bác Hồ - để mở đường chi viện miền Nam.",
        era: "1959",
      },
      {
        question: "Người chỉ huy đầu tiên của Đoàn 559 là ai?",
        options: ["Đồng Sĩ Nguyên", "Võ Bẩm", "Đặng Tính", "Hoàng Văn Thái"],
        correctIndex: 1,
        explanation: "Đại tá Võ Bẩm là Đoàn trưởng đầu tiên của Đoàn 559, người khai mở tuyến chi viện lịch sử.",
        era: "1959",
      },
      {
        question: "Ngã ba Đồng Lộc nơi 10 cô gái hy sinh thuộc tỉnh nào?",
        options: ["Nghệ An", "Hà Tĩnh", "Quảng Bình", "Quảng Trị"],
        correctIndex: 1,
        explanation: "Ngã ba Đồng Lộc thuộc huyện Can Lộc, tỉnh Hà Tĩnh - nút giao thông trọng yếu trên đường Trường Sơn.",
        era: "1968",
      },
      {
        question: "10 cô gái Ngã ba Đồng Lộc hy sinh vào ngày nào?",
        options: ["24/7/1968", "24/7/1969", "5/5/1968", "19/5/1968"],
        correctIndex: 0,
        explanation: "Ngày 24/7/1968, 10 cô gái thanh niên xung phong hy sinh anh dũng khi san lấp hố bom tại Ngã ba Đồng Lộc.",
        era: "1968",
      },
      {
        question: "Đường Hồ Chí Minh trên biển (Đường biển Hồ Chí Minh) do đơn vị nào phụ trách?",
        options: ["Đoàn 559", "Đoàn 125 Hải quân", "Lữ đoàn 125", "Đoàn 962"],
        correctIndex: 1,
        explanation: "Đoàn 125 Hải quân (còn gọi là Đoàn tàu không số) vận chuyển vũ khí vào Nam bằng đường biển bí mật.",
        era: "1961-75",
      },
      {
        question: "Mỹ dùng công nghệ gì để phát hiện đoàn xe và người đi trên Trường Sơn?",
        options: ["Vệ tinh do thám", "Cảm biến điện tử Igloo White", "Máy bay không người lái", "Radar"],
        correctIndex: 1,
        explanation: "Mỹ rải cảm biến điện tử 'Igloo White' dọc Trường Sơn để phát hiện chuyển động, nhưng ta tìm cách đánh lừa.",
        era: "1968-72",
      },
      {
        question: "Bộ đội binh chủng nào là lực lượng chủ lực vận tải trên Đường Trường Sơn?",
        options: ["Bộ binh", "Pháo binh", "Công binh - Vận tải", "Đặc công"],
        correctIndex: 2,
        explanation: "Binh chủng Công binh - Vận tải là chủ lực vận tải Trường Sơn, gồm cả xe tải, pháo thủ phòng không bảo vệ đoàn xe.",
        era: "1959-75",
      },
      {
        question: "Chất độc da cam (Agent Orange) do Mỹ rải xuống Trường Sơn từ năm nào?",
        options: ["1959", "1962", "1965", "1968"],
        correctIndex: 1,
        explanation: "Mỹ sử dụng chất độc da cam từ năm 1962 (chiến dịch Ranch Hand) để phá hủy rừng che phủ Trường Sơn.",
        era: "1962-71",
      },
      {
        question: "Sau năm 1975, Đường Trường Sơn được phát triển thành gì?",
        options: [
          "Khu bảo tồn thiên nhiên",
          "Đường Hồ Chí Minh (Quốc lộ Hồ Chí Minh)",
          "Đường cao tốc Bắc Nam",
          "Khu kinh tế đặc biệt",
        ],
        correctIndex: 1,
        explanation: "Sau thống nhất, Đường Trường Sơn huyền thoại được phát triển thành Đường Hồ Chí Minh, con đường giao thông quốc gia.",
        era: "1975+",
      },
      {
        question: "Đường Trường Sơn được coi là 'tuyến chi viện chiến lược' chủ yếu nhờ đặc điểm gì?",
        options: [
          "Nằm gần bờ biển",
          "Đi qua nhiều thành phố lớn",
          "Được che phủ bởi rừng rậm, khó phát hiện từ trên không",
          "Có địa hình bằng phẳng dễ vận chuyển",
        ],
        correctIndex: 2,
        explanation: "Rừng rậm và địa hình hiểm trở của Trường Sơn giúp che giấu hoạt động vận tải khỏi sự trinh sát của không quân Mỹ.",
        era: "1959-75",
      },
      {
        question: "Chiến dịch ném bom Trường Sơn của Mỹ mang tên gì?",
        options: ["Chiến dịch Sấm Rền", "Chiến dịch Linebacker", "Chiến dịch Arc Light", "Chiến dịch Tiger Hound"],
        correctIndex: 0,
        explanation: "Chiến dịch Rolling Thunder (Sấm Rền 1965-1968) là chiến dịch ném bom quy mô lớn nhắm vào tuyến vận tải Trường Sơn.",
        era: "1965-68",
      },
      {
        question: "Đồng Sĩ Nguyên giữ chức vụ gì trong Binh đoàn Trường Sơn?",
        options: [
          "Đoàn trưởng đầu tiên",
          "Tư lệnh giai đoạn 1967-1975",
          "Phó đoàn trưởng chính trị",
          "Chỉ huy đặc công",
        ],
        correctIndex: 1,
        explanation: "Tướng Đồng Sĩ Nguyên là Tư lệnh Binh đoàn Trường Sơn giai đoạn 1967-1975, người có công lớn xây dựng hệ thống vận tải.",
        era: "1967-75",
      },
      {
        question: "Hệ thống đường ống xăng dầu trên Trường Sơn dài bao nhiêu km?",
        options: ["500 km", "1.000 km", "Hơn 5.000 km", "10.000 km"],
        correctIndex: 2,
        explanation: "Hệ thống đường ống xăng dầu dọc Trường Sơn trải dài hơn 5.000 km, đảm bảo cung cấp nhiên liệu liên tục cho chiến trường.",
        era: "1968-75",
      },
    ],
  },
  /* ──────── LEVEL 7: TẾT MẬU THÂN ──────── */
  {
    name: "TẾT MẬU THÂN",
    emoji: "💥",
    bg: "#1a1a2e",
    groundColor: "#2a2a4e",
    enemyColor: "#33aa55",
    map: {
      terrain: "urban",
      weather: "night",
      obstacles: [
        { x: 80, y: 50, w: 100, h: 70, type: "wall" },
        { x: 500, y: 60, w: 80, h: 50, type: "wall" },
        { x: 300, y: 180, w: 50, h: 50, type: "bunker" },
        { x: 120, y: 320, w: 60, h: 30, type: "barrel" },
        { x: 550, y: 300, w: 70, h: 16, type: "wire" },
        { x: 350, y: 420, w: 80, h: 60, type: "wall" },
        { x: 200, y: 450, w: 50, h: 50, type: "crater" },
        { x: 620, y: 430, w: 40, h: 30, type: "barrel" },
      ],
      decorations: [
        { x: 250, y: 80, type: "fire" },
        { x: 450, y: 250, type: "fire" },
        { x: 150, y: 250, type: "smoke" },
        { x: 600, y: 180, type: "smoke" },
        { x: 400, y: 500, type: "debris" },
        { x: 100, y: 500, type: "shell_casing" },
      ],
    },
    questions: [
      {
        question: "Tổng tiến công Tết Mậu Thân diễn ra năm nào?",
        options: ["1966", "1967", "1968", "1969"],
        correctIndex: 2,
        explanation:
          "Cuộc Tổng tiến công và nổi dậy Tết Mậu Thân diễn ra đêm 30 rạng 31/1/1968.",
        era: "1968",
      },
      {
        question: "Biệt động Sài Gòn đánh vào đâu trong Tết Mậu Thân?",
        options: [
          "Dinh Độc Lập",
          "Tòa Đại sứ Mỹ",
          "Sân bay Tân Sơn Nhất",
          "Tất cả các đáp án trên",
        ],
        correctIndex: 3,
        explanation:
          "Biệt động Sài Gòn tấn công đồng loạt Dinh Độc Lập, Tòa Đại sứ Mỹ, sân bay và nhiều mục tiêu.",
        era: "1968",
      },
      {
        question: "Cuộc chiến đấu khốc liệt nhất Mậu Thân ở miền Trung diễn ra tại đâu?",
        options: ["Đà Nẵng", "Huế", "Quảng Trị", "Quy Nhơn"],
        correctIndex: 1,
        explanation:
          "Trận Huế kéo dài 26 ngày đêm là trận chiến ác liệt nhất trong Tết Mậu Thân.",
        era: "1968",
      },
      {
        question: "Sự kiện Mậu Thân tác động gì đến nước Mỹ?",
        options: [
          "Mỹ tăng quân",
          "Phong trào phản chiến bùng nổ",
          "Mỹ ném bom nhiều hơn",
          "Không ảnh hưởng gì",
        ],
        correctIndex: 1,
        explanation:
          "Tết Mậu Thân gây chấn động nước Mỹ, phong trào phản chiến bùng nổ mạnh mẽ.",
        era: "1968",
      },
      {
        question: "Sau Mậu Thân, tổng thống Mỹ nào tuyên bố không tái tranh cử?",
        options: [
          "Nixon",
          "Johnson",
          "Kennedy",
          "Eisenhower",
        ],
        correctIndex: 1,
        explanation:
          "Tổng thống Johnson tuyên bố không tái tranh cử ngày 31/3/1968 do áp lực từ chiến tranh.",
        era: "1968",
      },
      {
        question: "Bao nhiêu đô thị miền Nam bị tấn công trong Tết Mậu Thân?",
        options: ["10", "20", "36", "44"],
        correctIndex: 2,
        explanation: "36/44 tỉnh lỵ, 5/6 thành phố lớn và nhiều căn cứ quân sự Mỹ-ngụy bị tấn công đồng loạt.",
        era: "1968",
      },
      {
        question: "Biệt động Sài Gòn gồm bao nhiêu đội tham gia Mậu Thân?",
        options: ["5 đội", "11 đội", "15 đội", "20 đội"],
        correctIndex: 1,
        explanation: "11 đội biệt động Sài Gòn tấn công các mục tiêu quan trọng trong đêm Giao thừa Mậu Thân.",
        era: "1968",
      },
      {
        question: "Cuộc Tổng tiến công Mậu Thân diễn ra vào dịp gì?",
        options: ["Tết Nguyên Đán", "Quốc khánh 2/9", "Ngày thống nhất", "Sinh nhật Bác Hồ"],
        correctIndex: 0,
        explanation: "Cuộc tấn công bất ngờ diễn ra đêm giao thừa Tết Nguyên Đán Mậu Thân (30 rạng 31/1/1968).",
        era: "1968",
      },
      {
        question: "Chiến dịch Mậu Thân do ai trực tiếp chỉ đạo ở miền Nam?",
        options: ["Võ Nguyên Giáp", "Nguyễn Chí Thanh", "Trần Văn Trà", "Phạm Hùng"],
        correctIndex: 2,
        explanation: "Trung tướng Trần Văn Trà là Tư lệnh Quân giải phóng miền Nam, trực tiếp chỉ đạo chiến dịch.",
        era: "1968",
      },
      {
        question: "Sự kiện nào sau Mậu Thân dẫn đến đàm phán hòa bình?",
        options: [
          "Mỹ ném bom B-52",
          "Mỹ chấp nhận đàm phán Paris",
          "Mỹ tăng viện trợ",
          "Mỹ đổ thêm quân",
        ],
        correctIndex: 1,
        explanation: "Sau Mậu Thân, Mỹ chấp nhận ngồi vào bàn đàm phán Paris (5/1968), bước ngoặt ngoại giao.",
        era: "1968",
      },
      {
        question: "Năm Mậu Thân (1968) theo âm lịch là năm con gì?",
        options: ["Năm Đinh Mùi (Dê)", "Năm Mậu Thân (Khỉ)", "Năm Kỷ Dậu (Gà)", "Năm Bính Ngọ (Ngựa)"],
        correctIndex: 1,
        explanation: "Mậu Thân là năm Khỉ theo Thiên can - Địa chi, tên gọi cuộc tổng tiến công Tết Mậu Thân 1968 bắt nguồn từ đây.",
        era: "1968",
      },
      {
        question: "Chiến lược nào của Mỹ được áp dụng sau khi Tết Mậu Thân thất bại?",
        options: [
          "Chiến tranh đặc biệt",
          "Chiến tranh cục bộ",
          "Việt Nam hóa chiến tranh",
          "Chiến tranh tổng lực",
        ],
        correctIndex: 2,
        explanation: "Sau Mậu Thân, Nixon đề ra 'Việt Nam hóa chiến tranh' - rút quân Mỹ, tăng cường cho VNCH để thay thế.",
        era: "1969",
      },
      {
        question: "Tướng Mỹ nào thay Westmoreland làm Tổng chỉ huy ở Việt Nam sau Tết Mậu Thân?",
        options: ["Abrams", "Taylor", "Harkins", "Wheeler"],
        correctIndex: 0,
        explanation: "Tướng Creighton Abrams thay Westmoreland sau Tết Mậu Thân, thực hiện chiến lược 'Việt Nam hóa chiến tranh'.",
        era: "1968",
      },
      {
        question: "Tướng Westmoreland từng khẳng định điều gì trước Tết Mậu Thân?",
        options: [
          "Mỹ sẽ thua trong 2 năm",
          "Mỹ đang 'thấy ánh sáng ở cuối đường hầm' - gần thắng",
          "Phải tăng thêm 500.000 quân",
          "Cần ném bom miền Bắc nhiều hơn",
        ],
        correctIndex: 1,
        explanation: "Westmoreland tuyên bố 'thấy ánh sáng ở cuối đường hầm' - Mỹ sắp thắng. Tết Mậu Thân đã bác bỏ hoàn toàn điều này.",
        era: "1967-68",
      },
      {
        question: "Lực lượng ta tiến công thành phố Huế trong Tết Mậu Thân gồm bao nhiêu trung đoàn?",
        options: ["2 trung đoàn", "4 trung đoàn", "6 trung đoàn", "8 trung đoàn"],
        correctIndex: 1,
        explanation: "4 trung đoàn của ta tiến công Huế gồm 2 trung đoàn bộ đội chủ lực và 2 tiểu đoàn địa phương.",
        era: "1968",
      },
      {
        question: "Phong trào phản chiến của sinh viên Mỹ bùng phát mạnh nhất sau Tết Mậu Thân ở đâu?",
        options: [
          "Columbia University",
          "Harvard University",
          "Đại học Kent State và nhiều trường đại học khác",
          "Chỉ ở Washington D.C.",
        ],
        correctIndex: 2,
        explanation: "Phong trào phản chiến lan rộng khắp các trường đại học Mỹ, đặc biệt sau vụ bắn chết sinh viên tại Kent State (1970).",
        era: "1968-70",
      },
      {
        question: "Cuộc tấn công vào Tòa đại sứ Mỹ ở Sài Gòn trong Tết Mậu Thân kéo dài bao lâu?",
        options: ["1 giờ", "6 giờ", "12 giờ", "24 giờ"],
        correctIndex: 1,
        explanation: "Biệt động đánh chiếm và giữ Tòa Đại Sứ Mỹ khoảng 6 giờ, gây chấn động lớn cho nước Mỹ.",
        era: "1968",
      },
      {
        question: "Tết Mậu Thân được đánh giá thành công hay thất bại về mặt quân sự?",
        options: [
          "Thành công hoàn toàn",
          "Thiệt hại nặng về quân sự nhưng thắng lợi về chính trị",
          "Thất bại hoàn toàn",
          "Không có đánh giá rõ ràng",
        ],
        correctIndex: 1,
        explanation: "Ta chịu thiệt hại lớn về lực lượng, nhưng Mậu Thân là chiến thắng vĩ đại về chính trị và tâm lý chiến lược.",
        era: "1968",
      },
      {
        question: "Sau Tết Mậu Thân, Tổng thống Johnson quyết định điều gì?",
        options: [
          "Tăng quân thêm 200.000",
          "Không tái tranh cử và ngừng ném bom miền Bắc",
          "Rút toàn bộ quân về nước",
          "Dùng vũ khí hạt nhân",
        ],
        correctIndex: 1,
        explanation: "Ngày 31/3/1968, Johnson tuyên bố không tái tranh cử và ngừng ném bom miền Bắc - hệ quả trực tiếp từ Tết Mậu Thân.",
        era: "1968",
      },
      {
        question: "Cuộc tổng tiến công Tết Mậu Thân đánh vào bao nhiêu thành phố và đô thị?",
        options: ["20 đô thị", "36 đô thị", "40 đô thị", "44 đô thị"],
        correctIndex: 1,
        explanation: "36/44 tỉnh lỵ, 5/6 thành phố lớn và nhiều căn cứ quân sự bị tấn công đồng loạt trong đêm giao thừa.",
        era: "1968",
      },
      {
        question: "Mậu Thân 1968 đặt nền tảng cho điều gì trong quan hệ Việt Nam - Mỹ?",
        options: [
          "Mỹ cắt viện trợ cho VNCH",
          "Đàm phán Hội nghị Paris bắt đầu",
          "Mỹ tuyên bố rút quân ngay",
          "Ngừng bắn hoàn toàn",
        ],
        correctIndex: 1,
        explanation: "Tết Mậu Thân buộc Mỹ ngồi vào bàn đàm phán tại Paris (bắt đầu tháng 5/1968), dẫn đến Hiệp định Paris 1973.",
        era: "1968",
      },
      {
        question: "Trận đánh nào trong Tết Mậu Thân diễn ra dai dẳng và ác liệt nhất, kéo dài 26 ngày?",
        options: ["Trận Sài Gòn", "Trận Huế", "Trận Đà Nẵng", "Trận Khe Sanh"],
        correctIndex: 1,
        explanation: "Trận Huế kéo dài 26 ngày đêm (31/1 - 25/2/1968) là trận chiến đô thị khốc liệt nhất trong Tết Mậu Thân.",
        era: "1968",
      },
      {
        question: "Tổng số quân Quân Giải phóng tham gia cuộc Tổng tiến công Tết Mậu Thân là bao nhiêu?",
        options: ["5 vạn", "7 vạn", "Hơn 8 vạn", "10 vạn"],
        correctIndex: 2,
        explanation: "Hơn 8 vạn quân Quân Giải phóng miền Nam cùng lực lượng vũ trang địa phương tham gia cuộc Tổng tiến công.",
        era: "1968",
      },
    ],
  },
];

export type GameScreen =
  | "title"
  | "tutorial"
  | "level-intro"
  | "combat"
  | "quiz"
  | "upgrade"
  | "shop"
  | "level-complete"
  | "game-over"
  | "victory";

export interface Upgrade {
  id: string;
  name: string;
  emoji: string;
  description: string;
  rarity: "common" | "rare" | "epic";
  maxStack: number;
}

export const UPGRADES: Upgrade[] = [
  { id: "extra_bullet", name: "THÊM ĐẠN", emoji: "🔹", description: "+1 đường đạn bắn ra", rarity: "rare", maxStack: 4 },
  { id: "fire_rate", name: "TỐC ĐỘ BẮN", emoji: "⚡", description: "Bắn nhanh hơn 20%", rarity: "common", maxStack: 5 },
  { id: "bullet_speed", name: "ĐẠN NHANH", emoji: "💨", description: "Đạn bay nhanh hơn 25%", rarity: "common", maxStack: 3 },
  { id: "hp_up", name: "TĂNG HP", emoji: "❤️", description: "+1 HP (hiện tại)", rarity: "common", maxStack: 99 },
  { id: "ammo_up", name: "THÊM ĐẠN DƯỢC", emoji: "📦", description: "+15 viên đạn", rarity: "common", maxStack: 99 },
  { id: "spread_shot", name: "ĐẠN QUẠT", emoji: "🔱", description: "Mở rộng góc bắn", rarity: "rare", maxStack: 3 },
  { id: "circle_shot", name: "ĐẠN VÒNG TRÒN", emoji: "💫", description: "Bắn đạn vòng tròn 360°", rarity: "epic", maxStack: 1 },
  { id: "damage_up", name: "SÁT THƯƠNG", emoji: "🗡️", description: "+50 điểm mỗi lần hạ địch", rarity: "rare", maxStack: 5 },
  { id: "speed_up", name: "TỐC ĐỘ DI CHUYỂN", emoji: "🏃", description: "Di chuyển nhanh hơn 15%", rarity: "common", maxStack: 3 },
];
