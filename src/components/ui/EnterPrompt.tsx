import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "../../hooks/useGameStore";
import { BUILDINGS } from "../../data/sections";

export default function EnterPrompt() {
  const nearestSection = useGameStore((s) => s.nearestSection);
  const activePanel = useGameStore((s) => s.activePanel);
  const openPanel = useGameStore((s) => s.openPanel);
  const building = BUILDINGS.find((b) => b.id === nearestSection);

  const handleEnter = () => {
    if (nearestSection) openPanel(nearestSection);
  };

  return (
    <AnimatePresence>
      {building && !activePanel && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="fixed bottom-28 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-[32px] px-4 py-3 glass-panel game-ui-panel"
        >
          <button
            type="button"
            onClick={handleEnter}
            className="rounded-2xl game-ui-button px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/90 transition hover:bg-white/18 active:scale-95"
          >
            E
          </button>
          <div className="flex flex-col text-left">
            <span className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--color-muted)" }}>
              Interact
            </span>
            <span className="mt-0.5 text-[10px] text-white/70">Tap to enter</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
