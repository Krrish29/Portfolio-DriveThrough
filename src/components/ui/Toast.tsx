import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "../../hooks/useGameStore";

export default function Toast() {
  const toasts = useGameStore((s) => s.toasts);

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => {
          const isUnlock = t.message.startsWith("Location unlocked:");
          const isComplete = t.message.startsWith("Congrats — all locations complete");
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              className="glass-panel glass-panel-glow rounded-3xl px-6 py-4 text-left max-w-[20rem]"
              style={{ background: "rgba(16,12,32,0.96)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-2xl"
                  style={{ background: "rgba(82,211,199,0.12)" }}
                >
                  <span className="text-lg" style={{ color: "var(--color-accent)" }}>
                    {isComplete ? "🎉" : "✨"}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-[var(--font-display)]" style={{ color: "var(--color-glow)" }}>
                    {isComplete ? "All locations complete" : isUnlock ? "Location unlocked" : "Update"}
                  </p>
                  <p className="text-[11px] leading-relaxed mt-1" style={{ color: "var(--color-muted)" }}>
                    {isUnlock ? t.message.replace("Location unlocked: ", "") : isComplete ? "You’ve reached every destination in the world." : t.message}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
