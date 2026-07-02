import { useGameStore } from "../../hooks/useGameStore";

export default function CoinCounter() {
  const coinCount = useGameStore((s) => s.coinCount);

  return (
    <div className="glass-panel rounded-full px-3 py-2 flex items-center gap-3 border border-white/10 bg-white/10 shadow-[0_24px_48px_rgba(0,0,0,0.14)] backdrop-blur-lg" style={{ minWidth: 150 }}>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ffdd80]/20 text-[#f5e2a6]">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#ffe17f" strokeWidth="1.8">
          <circle cx="12" cy="12" r="7" fill="#ffd660" />
          <circle cx="12" cy="12" r="2.5" fill="rgba(0,0,0,0.08)" />
          <path d="M12 8v8M9.5 12h5" stroke="#7d5a00" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[9px] uppercase tracking-[0.35em] text-[var(--color-muted)]">Coins</span>
        <span className="text-base font-[var(--font-display)] font-semibold text-[var(--color-ink)]">{coinCount}</span>
      </div>
    </div>
  );
}
