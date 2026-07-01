import { useGameStore } from "../../hooks/useGameStore";

const MAX_KMH = 80;

export default function Speedometer() {
  const speed = useGameStore((s) => s.speedKmh);
  const pct = Math.min(speed / MAX_KMH, 1);

  return (
    <div className="glass-panel rounded-2xl px-5 py-3 flex flex-col items-end gap-1" style={{ minWidth: 140 }}>
      <div className="flex items-baseline gap-1">
        <span
          className="font-[var(--font-mono)] text-3xl font-semibold tabular-nums"
          style={{ color: "var(--color-glow)" }}
        >
          {speed}
        </span>
        <span className="text-xs tracking-widest" style={{ color: "var(--color-muted)" }}>
          KM/H
        </span>
      </div>
      <div className="w-full h-1 rounded-full overflow-hidden bg-white/10">
        <div
          className="h-full transition-[width] duration-150"
          style={{ width: `${pct * 100}%`, background: "linear-gradient(90deg, var(--color-accent), var(--color-sunset))" }}
        />
      </div>
    </div>
  );
}
