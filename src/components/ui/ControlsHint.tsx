const KEYS: [string, string][] = [
  ["W / ↑", "Accelerate"],
  ["S / ↓", "Reverse"],
  ["A D / ← →", "Steer"],
  ["Space", "Brake"],
  ["Right-drag", "Look around"],
  ["E", "Enter building"],
  ["Esc", "Close panel"],
];

export default function ControlsHint() {
  return (
    <div className="glass-panel rounded-2xl px-4 py-3 w-56">
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
    </div>
  );
}
