import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "../../hooks/useGameStore";
import { BUILDINGS } from "../../data/sections";

export default function EnterPrompt() {
  const nearestSection = useGameStore((s) => s.nearestSection);
  const activePanel = useGameStore((s) => s.activePanel);
  const building = BUILDINGS.find((b) => b.id === nearestSection);

  return (
    <AnimatePresence>
      {building && !activePanel && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="fixed bottom-28 left-1/2 -translate-x-1/2 z-30 glass-panel glass-panel-glow rounded-[32px] px-4 py-3 flex items-center gap-4"
        >
          <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/90">
            E
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--color-muted)" }}>
              Interact
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
