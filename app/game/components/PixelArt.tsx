"use client";

/* ═══════════════════════════════════════════════════════════════════ */
/*  PIXEL ART COMPONENTS (SVG)                                         */
/* ═══════════════════════════════════════════════════════════════════ */

export function PixelHeart({ filled }: { filled: boolean }) {
  return (
    <div
      className="inline-block w-5 h-5 relative"
      style={{ imageRendering: "pixelated" }}
    >
      <svg viewBox="0 0 16 16" className="w-full h-full">
        {filled ? (
          <>
            <rect x="2" y="1" width="4" height="2" fill="#ff2222" />
            <rect x="8" y="1" width="4" height="2" fill="#ff2222" />
            <rect x="1" y="3" width="6" height="2" fill="#ff2222" />
            <rect x="7" y="3" width="6" height="2" fill="#ff2222" />
            <rect x="0" y="5" width="14" height="2" fill="#ff2222" />
            <rect x="1" y="7" width="12" height="2" fill="#cc0000" />
            <rect x="2" y="9" width="10" height="2" fill="#cc0000" />
            <rect x="3" y="11" width="8" height="2" fill="#990000" />
            <rect x="4" y="13" width="6" height="1" fill="#990000" />
            <rect x="5" y="14" width="4" height="1" fill="#660000" />
          </>
        ) : (
          <>
            <rect x="2" y="1" width="4" height="2" fill="#333" />
            <rect x="8" y="1" width="4" height="2" fill="#333" />
            <rect x="1" y="3" width="6" height="2" fill="#222" />
            <rect x="7" y="3" width="6" height="2" fill="#222" />
            <rect x="0" y="5" width="14" height="2" fill="#222" />
            <rect x="1" y="7" width="12" height="2" fill="#1a1a1a" />
            <rect x="2" y="9" width="10" height="2" fill="#1a1a1a" />
            <rect x="3" y="11" width="8" height="2" fill="#111" />
            <rect x="4" y="13" width="6" height="1" fill="#111" />
            <rect x="5" y="14" width="4" height="1" fill="#0a0a0a" />
          </>
        )}
      </svg>
    </div>
  );
}

export function PixelStar({
  filled,
  size = 28,
}: {
  filled: boolean;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      style={{ imageRendering: "pixelated" }}
    >
      <rect x="7" y="0" width="2" height="2" fill={filled ? "#FFD700" : "#333"} />
      <rect x="6" y="2" width="4" height="2" fill={filled ? "#FFD700" : "#333"} />
      <rect x="0" y="4" width="16" height="2" fill={filled ? "#FFC107" : "#2a2a2a"} />
      <rect x="2" y="6" width="12" height="2" fill={filled ? "#FFD700" : "#333"} />
      <rect x="3" y="8" width="10" height="2" fill={filled ? "#FFA000" : "#2a2a2a"} />
      <rect x="2" y="10" width="4" height="2" fill={filled ? "#FF8F00" : "#222"} />
      <rect x="10" y="10" width="4" height="2" fill={filled ? "#FF8F00" : "#222"} />
      <rect x="1" y="12" width="3" height="2" fill={filled ? "#E65100" : "#1a1a1a"} />
      <rect x="12" y="12" width="3" height="2" fill={filled ? "#E65100" : "#1a1a1a"} />
      <rect x="0" y="14" width="2" height="2" fill={filled ? "#BF360C" : "#111"} />
      <rect x="14" y="14" width="2" height="2" fill={filled ? "#BF360C" : "#111"} />
    </svg>
  );
}

export function PixelCharacter({
  state,
}: {
  state: "idle" | "happy" | "hurt" | "victory";
}) {
  const bodyColor = state === "hurt" ? "#ff4444" : "#DA251D";
  const faceColor = "#FFD5A0";
  const hairColor = "#1a1a2e";

  return (
    <div
      className={`relative ${
        state === "idle"
          ? "pixel-idle"
          : state === "hurt"
          ? "pixel-shake"
          : ""
      }`}
      style={{ imageRendering: "pixelated", width: 64, height: 80 }}
    >
      <svg viewBox="0 0 16 20" width="64" height="80">
        <rect x="5" y="0" width="6" height="2" fill={hairColor} />
        <rect x="4" y="2" width="8" height="1" fill={hairColor} />
        <rect x="4" y="3" width="8" height="5" fill={faceColor} />
        {state === "happy" || state === "victory" ? (
          <>
            <rect x="5" y="5" width="2" height="1" fill={hairColor} />
            <rect x="9" y="5" width="2" height="1" fill={hairColor} />
          </>
        ) : (
          <>
            <rect x="6" y="4" width="1" height="2" fill={hairColor} />
            <rect x="9" y="4" width="1" height="2" fill={hairColor} />
          </>
        )}
        {state === "happy" || state === "victory" ? (
          <rect x="6" y="6" width="4" height="1" fill="#c0392b" />
        ) : state === "hurt" ? (
          <>
            <rect x="7" y="6" width="2" height="1" fill="#333" />
            <rect x="6" y="7" width="1" height="1" fill="#333" />
            <rect x="9" y="7" width="1" height="1" fill="#333" />
          </>
        ) : (
          <rect x="7" y="7" width="2" height="1" fill="#c0392b" />
        )}
        <rect x="4" y="8" width="8" height="1" fill={bodyColor} />
        <rect x="3" y="9" width="10" height="4" fill={bodyColor} />
        <rect x="7" y="10" width="2" height="2" fill="#FFD700" />
        {state === "victory" ? (
          <>
            <rect x="1" y="7" width="2" height="2" fill={faceColor} />
            <rect x="13" y="7" width="2" height="2" fill={faceColor} />
          </>
        ) : (
          <>
            <rect x="1" y="9" width="2" height="4" fill={faceColor} />
            <rect x="13" y="9" width="2" height="4" fill={faceColor} />
          </>
        )}
        <rect x="4" y="13" width="3" height="4" fill="#1a5276" />
        <rect x="9" y="13" width="3" height="4" fill="#1a5276" />
        <rect x="3" y="17" width="4" height="2" fill="#333" />
        <rect x="9" y="17" width="4" height="2" fill="#333" />
        {state === "victory" && (
          <>
            <rect x="14" y="4" width="1" height="5" fill="#663300" />
            <rect x="10" y="2" width="4" height="3" fill="#DA251D" />
            <rect x="11" y="3" width="1" height="1" fill="#FFD700" />
          </>
        )}
      </svg>
    </div>
  );
}
