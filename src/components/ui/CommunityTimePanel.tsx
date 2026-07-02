import { useGameStore } from "../../hooks/useGameStore";

function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
}

export default function CommunityTimePanel() {
  const communityTimeSeconds = useGameStore((s) => s.communityTimeSeconds);

  return (
    <div className="glass-panel rounded-full px-3 py-2 flex items-center gap-3 border border-white/10 bg-white/10 shadow-[0_24px_48px_rgba(0,0,0,0.14)] backdrop-blur-lg" style={{ minWidth: 170 }}>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#65d5ec]/20 text-[#c8f4ff]">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#56b5c0" strokeWidth="1.8">
          <path d="M6 10h12M7 6h10M8 14h8" strokeLinecap="round" />
          <path d="M12 18h4" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[9px] uppercase tracking-[0.35em] text-[var(--color-muted)]">Time Played</span>
        <span className="text-base font-[var(--font-display)] font-semibold text-[var(--color-ink)]">{formatTime(communityTimeSeconds)}</span>
      </div>
    </div>
  );
}
