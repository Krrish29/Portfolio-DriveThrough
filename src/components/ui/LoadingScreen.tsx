import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "../../hooks/useGameStore";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const hasLoaded = useGameStore((s) => s.hasLoaded);
  const setHasLoaded = useGameStore((s) => s.setHasLoaded);

  useEffect(() => {
    if (hasLoaded) return;
    const start = performance.now();
    const duration = 1100;
    let frame: number;

    const tick = () => {
      const elapsed = performance.now() - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (pct < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setReady(true), 300);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [hasLoaded]);

  return (
    <AnimatePresence>
      {!hasLoaded && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, #2a1f45 0%, var(--color-bg-deep) 70%)",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="font-[var(--font-display)] text-3xl md:text-4xl tracking-wide mb-2"
            style={{ color: "var(--color-glow)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            KRRISH GARG
          </motion.h1>
          <p className="text-sm mb-10 tracking-[0.3em]" style={{ color: "var(--color-muted)" }}>
            PORTFOLIO DRIVE
          </p>

          {!ready ? (
            <div className="w-64">
              <div className="h-[3px] w-full rounded-full overflow-hidden bg-white/10">
                <motion.div
                  className="h-full"
                  style={{ background: "var(--color-sunset)" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
              <p className="mt-3 text-center text-xs font-[var(--font-mono)]" style={{ color: "var(--color-muted)" }}>
                LOADING WORLD — {Math.round(progress)}%
              </p>
            </div>
          ) : (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setHasLoaded(true)}
              className="glass-panel glass-panel-glow px-8 py-3 rounded-full font-[var(--font-display)] text-sm tracking-[0.2em]"
              style={{ color: "var(--color-ink)" }}
            >
              START ENGINE
            </motion.button>
          )}

          <p className="mt-10 text-xs font-[var(--font-mono)]" style={{ color: "var(--color-muted)" }}>
            WASD / ARROWS TO DRIVE · E TO ENTER · ESC TO CLOSE
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
