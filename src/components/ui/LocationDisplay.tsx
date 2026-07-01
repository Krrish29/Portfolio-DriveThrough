import { useGameStore, TOTAL_LOCATION_COUNT } from "../../hooks/useGameStore";
import { BUILDINGS } from "../../data/sections";

export default function LocationDisplay() {
  const nearestSection = useGameStore((s) => s.nearestSection);
  const visitedCount = useGameStore((s) => s.visited.size);
  const building = BUILDINGS.find((b) => b.id === nearestSection);
  const pct = visitedCount / TOTAL_LOCATION_COUNT;

  return (
    <div className="glass-panel rounded-[28px] px-5 py-4" style={{ minWidth: 220 }}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--color-muted)" }}>
            Current Sector
          </p>
          <p className="font-[var(--font-display)] text-lg leading-tight mt-1" style={{ color: "var(--color-ink)" }}>
            {building ? building.label : "The Open Road"}
          </p>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-[var(--font-mono)] text-[var(--color-accent)]">
          {visitedCount}/{TOTAL_LOCATION_COUNT}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <div className="min-w-[56px] text-[10px] uppercase tracking-[0.25em] text-[var(--color-muted)]">
          Progress
        </div>
        <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
          <div
            className="h-full transition-[width] duration-300"
            style={{
              width: `${pct * 100}%`,
              background: "linear-gradient(90deg, var(--color-accent), var(--color-sunset))",
            }}
          />
        </div>
      </div>
    </div>
  );
}