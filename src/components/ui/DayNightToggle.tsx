import { useGameStore } from "../../hooks/useGameStore";

export default function DayNightToggle() {
  const timeOfDay = useGameStore((s) => s.timeOfDay);
  const toggleTimeOfDay = useGameStore((s) => s.toggleTimeOfDay);

  return (
    <button
      onClick={toggleTimeOfDay}
      className="glass-panel game-ui-button rounded-full w-11 h-11 flex items-center justify-center text-lg transition hover:bg-white/12"
      style={{ color: "var(--color-ink)" }}
      aria-label="Toggle day / night"
      title="Toggle day / night"
    >
      {timeOfDay === "dusk" ? "🌆" : "🌙"}
    </button>
  );
}
