import Minimap from "./Minimap";
import Speedometer from "./Speedometer";
import ControlsToggle from "./ControlsToggle";
import EnterPrompt from "./EnterPrompt";
import TopRightMenu from "./TopRightMenu";
import Confetti from "./Confetti";
import { useGameStore } from "../../hooks/useGameStore";

function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
}

/** Pure layout shell — each piece manages its own data via the game store. */
export default function HUD() {
  const coinCount = useGameStore((s) => s.coinCount);
  const communityTimeSeconds = useGameStore((s) => s.communityTimeSeconds);

  return (
    <div className="fixed inset-0 z-20 pointer-events-none">
      <div className="absolute left-3 top-3 pointer-events-auto sm:left-5 sm:top-5 hud-top-spaced">
        <Minimap />
      </div>
      <div className="absolute left-1/2 top-3 z-20 flex -translate-x-1/2 items-center gap-2 pointer-events-auto sm:hidden">
        <div className="rounded-full border border-white/10 bg-[#110b1d]/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f4efe4] shadow-[0_12px_30px_rgba(0,0,0,0.28)]">
          {formatTime(communityTimeSeconds)}
        </div>
        <div className="rounded-full border border-[#ffd660]/30 bg-[#ffd660]/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#ffd660] shadow-[0_12px_30px_rgba(0,0,0,0.28)]">
          {coinCount} Coins
        </div>
      </div>
      <div className="absolute right-3 top-3 pointer-events-auto sm:right-5 sm:top-5 hud-top-spaced hud-right-spaced">
        <TopRightMenu />
      </div>
      <div className="absolute right-3 top-24 pointer-events-auto sm:top-auto sm:right-5 sm:bottom-5 sm:left-auto hud-bottom-spaced">
        <Speedometer />
      </div>
      <div className="hidden md:block absolute bottom-24 left-3 pointer-events-auto sm:bottom-5 sm:left-5 hud-bottom-left-spaced">
        <ControlsToggle />
      </div>
      <EnterPrompt />
      <Confetti />
    </div>
  );
}