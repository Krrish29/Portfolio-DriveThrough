import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "../../hooks/useGameStore";
import { BUILDINGS } from "../../data/sections";

export default function EnterPrompt() {
  const [isMobile, setIsMobile] = useState(false);
  const nearestSection = useGameStore((s) => s.nearestSection);
  const activePanel = useGameStore((s) => s.activePanel);
  const openPanel = useGameStore((s) => s.openPanel);
  const building = BUILDINGS.find((b) => b.id === nearestSection);

  useEffect(() => {
    const media = globalThis.matchMedia("(max-width: 900px) and (pointer: coarse), (hover: none)");
    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

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
          className={`fixed bottom-28 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-3 rounded-[32px] px-4 py-3 glass-panel game-ui-panel ${isMobile ? "px-5 py-4" : ""}`}
        >
          <button
            type="button"
            onClick={handleEnter}
            className={`rounded-2xl game-ui-button font-semibold uppercase tracking-[0.35em] text-white/90 transition hover:bg-white/18 active:scale-95 ${isMobile ? "min-w-12 px-4 py-3 text-sm" : "px-4 py-2 text-[11px]"}`}
            style={{ touchAction: "manipulation" }}
          >
            {isMobile ? "Tap" : "E"}
          </button>
          <button
            type="button"
            onClick={handleEnter}
            className="flex flex-col text-left"
            style={{ touchAction: "manipulation" }}
          >
            <span className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--color-muted)" }}>
              Interact
            </span>
            <span className="mt-0.5 text-[10px] text-white/70">{isMobile ? "Touch to enter" : "Tap to enter"}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
