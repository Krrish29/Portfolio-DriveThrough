import { useGameStore } from "../../hooks/useGameStore";

const MAX_KMH = 80;

function getSpeedColor(speed: number) {
  if (speed < 30) return "#4ade80"; // green
  if (speed < 55) return "#facc15"; // yellow
  return "#f87171"; // red
}

export default function Speedometer() {
  const speed = useGameStore((s) => s.speedKmh);
  const pct = Math.min(speed / MAX_KMH, 1);
  const speedColor = getSpeedColor(speed);

  return (
    <div className="relative" style={{ minWidth: 96, width: "min(76vw, 170px)", aspectRatio: "1 / 1" }}>
      <svg viewBox="0 0 84 84" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path
          d="M22 58 A 22 22 0 0 1 62 58"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="8"
        />
        <path
          d="M22 58 A 22 22 0 0 1 62 58"
          fill="none"
          stroke={speedColor}
          strokeWidth="8"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray={`${pct} 1`}
        />
        {[...Array(9)].map((_, index) => {
          const angle = -90 + (index * 180) / 8;
          const rad = (angle * Math.PI) / 180;
          const inner = { x: 42 + Math.cos(rad) * 20, y: 58 + Math.sin(rad) * 20 };
          const outer = { x: 42 + Math.cos(rad) * 24, y: 58 + Math.sin(rad) * 24 };
          return (
            <line
              key={index}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="rgba(255,255,255,0.16)"
              strokeWidth={index % 2 === 0 ? 2 : 1}
            />
          );
        })}
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[clamp(16px,3.5vw,20px)] font-[var(--font-mono)] font-semibold tabular-nums text-white leading-none">
          {speed}
        </span>
        <span className="text-[clamp(8px,2.5vw,9px)] uppercase tracking-[0.35em] text-white/60 mt-1">
          KM/H
        </span>
      </div>

      <div
        className="absolute bottom-4 left-1/2 h-10 w-1 rounded-full"
        style={{
          background: "rgba(255,255,255,0.9)",
          boxShadow: "0 0 12px rgba(255,255,255,0.18)",
          transformOrigin: "center bottom",
          transform: `translateX(-50%) rotate(${pct * 180 - 90}deg)`,
        }}
      />
    </div>
  );
}
