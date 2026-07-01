import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "../../hooks/useGameStore";

const COLORS = ["#ff7a45", "#ffc978", "#52d3c7", "#f4efe4", "#caa24a"];

export default function Confetti() {
  const showConfetti = useGameStore((s) => s.showConfetti);
  const dismissConfetti = useGameStore((s) => s.dismissConfetti);

  const pieces = useMemo(
    () =>
      Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 2.4 + Math.random() * 1.6,
        color: COLORS[i % COLORS.length],
        rotate: Math.random() * 360,
        size: 6 + Math.random() * 6,
      })),
    []
  );

  return (
    <AnimatePresence
      onExitComplete={() => {
        /* no-op, dismissal is time-based below */
      }}
    >
      {showConfetti && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={() => {
            setTimeout(dismissConfetti, 3200);
          }}
        >
          {pieces.map((p) => (
            <motion.div
              key={p.id}
              initial={{ y: -40, x: `${p.left}vw`, opacity: 1, rotate: 0 }}
              animate={{ y: "110vh", rotate: p.rotate }}
              transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
              style={{
                position: "absolute",
                width: p.size,
                height: p.size * 0.4,
                background: p.color,
              }}
            />
          ))}
          <motion.div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 glass-panel glass-panel-glow rounded-2xl px-8 py-5 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="font-[var(--font-display)] text-xl" style={{ color: "var(--color-glow)" }}>
              Congrats — all locations complete! 🎉
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
              You explored every destination in the drive.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
