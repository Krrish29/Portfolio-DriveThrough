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
      } else {1 
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
              "radial-gradient(circle at 50% 22%, rgba(154, 92, 255, 0.18), transparent 18%), radial-gradient(circle at 75% 15%, rgba(255, 190, 105, 0.08), transparent 12%), radial-gradient(circle at 20% 18%, rgba(82, 211, 199, 0.08), transparent 14%), linear-gradient(180deg, #12071f 0%, #120a27 30%, #09050e 100%)",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="font-[var(--font-display)] text-3xl md:text-4xl tracking-wide mb-2"
            style={{ color: "#d6b6ff" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            KRRISH GARG
          </motion.h1>
          <p className="text-sm mb-10 tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.74)" }}>
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
              style={{ color: "#f7f1f8", background: "rgba(89, 55, 133, 0.4)", borderColor: "rgba(255, 187, 255, 0.22)" }}
            >
              START ENGINE
            </motion.button>
          )}

          <p className="mt-10 text-xs font-[var(--font-mono)]" style={{ color: "rgba(255,255,255,0.62)" }}>
            Ready to explore?
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
