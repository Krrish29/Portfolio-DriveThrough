import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const KEYS: [string, string][] = [
  ["W / ↑", "Accelerate"],
  ["S / ↓", "Reverse"],
  ["A D / ← →", "Steer"],
  ["Space", "Brake"],
  ["Right-drag", "Look around"],
  ["Scroll", "Zoom"],
  ["E", "Enter building"],
  ["Esc", "Close panel"],
];

export default function ControlsToggle() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="glass-panel rounded-2xl px-4 py-3 w-56 absolute bottom-14 left-0"
          >
            <p className="text-[10px] tracking-[0.25em] mb-2" style={{ color: "var(--color-muted)" }}>
              CONTROLS
            </p>
            <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
              {KEYS.map(([key, action]) => (
                <div key={key} className="contents">
                  <span
                    className="font-[var(--font-mono)] text-xs px-1.5 py-0.5 rounded border text-center"
                    style={{ color: "var(--color-glow)", borderColor: "rgba(255,201,120,0.25)" }}
                  >
                    {key}
                  </span>
                  <span className="text-xs self-center" style={{ color: "var(--color-muted)" }}>
                    {action}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        className="glass-panel rounded-full w-11 h-11 flex items-center justify-center text-lg"
        style={{ color: open ? "var(--color-glow)" : "var(--color-ink)" }}
        aria-label="Toggle controls"
        title="Controls"
      >
        ⌨
      </button>
    </div>
  );
}