import { useState } from "react";
import { useGameStore, TOTAL_LOCATION_COUNT } from "../../hooks/useGameStore";

function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
}

export default function TopRightMenu() {
  const [open, setOpen] = useState(false);
  const audioEnabled = useGameStore((s) => s.audioEnabled);
  const toggleAudio = useGameStore((s) => s.toggleAudio);
  const timeOfDay = useGameStore((s) => s.timeOfDay);
  const toggleTimeOfDay = useGameStore((s) => s.toggleTimeOfDay);
  const visitedCount = useGameStore((s) => s.visited.size);
  const coinCount = useGameStore((s) => s.coinCount);
  const communityTimeSeconds = useGameStore((s) => s.communityTimeSeconds);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((value) => !value)}
        className="glass-panel game-ui-button relative rounded-full w-11 h-11 flex items-center justify-center transition hover:bg-white/12 sm:w-12 sm:h-12"
        style={{ color: "var(--color-ink)" }}
        aria-label="Open HUD menu"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
        </svg>
        {coinCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full border border-white/20 bg-[#ffd660]/95 px-1.5 text-[11px] font-semibold text-[#1d1b23] shadow-[0_0_10px_rgba(255,214,96,0.22)]">
            {coinCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="absolute left-1/2 right-1/2 top-14 z-30 -translate-x-1/2 rounded-3xl border border-white/10 bg-[#110b1d]/95 p-3 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:left-auto sm:right-0 sm:translate-x-0"
          style={{ width: "min(92vw, 288px)" }}
        >
          <div className="grid gap-3">
            <button
              onClick={toggleAudio}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f4efe4] transition hover:bg-white/10 sm:px-2 sm:py-2"
            >
              <span className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-[#4a7dff]/20 text-[#a3d4ff]">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M5 9v6h4l5 5V4L9 9H5Z" />
                  </svg>
                </span>
                Music
              </span>
              <span className="text-[11px] uppercase tracking-[0.32em] text-[var(--color-muted)]">
                {audioEnabled ? "On" : "Off"}
              </span>
            </button>

            <button
              onClick={toggleTimeOfDay}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f4efe4] transition hover:bg-white/10 sm:px-2 sm:py-2"
            >
              <span className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-[#ffcc5b]/20 text-[#ffe7a4]">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    {timeOfDay === "dusk" ? (
                      <path d="M12 5.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Z" />
                    ) : (
                      <path d="M12 4a8 8 0 0 0 0 16 8 8 0 0 1 0-16Z" />
                    )}
                  </svg>
                </span>
                Day / Night
              </span>
              <span className="text-[11px] uppercase tracking-[0.32em] text-[var(--color-muted)]">
                {timeOfDay === "dusk" ? "Day" : "Night"}
              </span>
            </button>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-[#f4efe4] sm:p-3">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-muted)]">Time Played</p>
                  <p className="mt-1 text-base font-semibold text-[var(--color-ink)]">{formatTime(communityTimeSeconds)}</p>
                </div>
                <span className="rounded-full bg-gradient-to-r from-[#8ee8ff]/20 to-[#c8b8ff]/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d7f6ff] shadow-[0_0_18px_rgba(142,232,255,0.16)] sm:px-2 sm:text-[10px]">
                  {coinCount} Coins
                </span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-muted)]">Progress</div>
              <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
                <div
                  className="h-full bg-gradient-to-r from-[#52d3c7] via-[#84e5a7] to-[#ffc978] transition-all duration-200"
                  style={{ width: `${Math.min((visitedCount / TOTAL_LOCATION_COUNT) * 100, 100)}%` }}
                />
              </div>
              <div className="mt-3 flex flex-col gap-2 text-[11px] uppercase tracking-[0.32em] text-[var(--color-muted)] sm:text-[10px]">
                <span>{visitedCount}/{TOTAL_LOCATION_COUNT}</span>
                <span className="text-[#f4efe4]/80">Sector progress</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
