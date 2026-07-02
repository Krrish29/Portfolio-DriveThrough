import { useGameStore, TOTAL_LOCATION_COUNT } from "../../hooks/useGameStore";
import { BUILDINGS } from "../../data/sections";

export default function LocationDisplay() {
  const nearestSection = useGameStore((s) => s.nearestSection);
  const visitedCount = useGameStore((s) => s.visited.size);
  const building = BUILDINGS.find((b) => b.id === nearestSection);

  return (
    <div className="glass-panel game-ui-panel rounded-[28px] px-5 py-4" style={{ minWidth: 220 }}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--color-muted)" }}>
            Current Sector
          </p>
          <p className="font-[var(--font-display)] text-lg leading-tight mt-1" style={{ color: "var(--color-ink)" }}>
            {building ? building.label : "The Open Road"}
          </p>
        </div>
        <div className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[11px] font-[var(--font-mono)] text-[var(--color-accent)] shadow-[0_0_20px_rgba(82,211,199,0.12)]">
          {visitedCount}/{TOTAL_LOCATION_COUNT}
        </div>
      </div>
    </div>
  );
}