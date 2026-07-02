import Minimap from "./Minimap";
import Speedometer from "./Speedometer";
import ControlsToggle from "./ControlsToggle";
import EnterPrompt from "./EnterPrompt";
import TopRightMenu from "./TopRightMenu";
import Confetti from "./Confetti";

/** Pure layout shell — each piece manages its own data via the game store. */
export default function HUD() {
  return (
    <div className="fixed inset-0 z-20 pointer-events-none">
      <div className="absolute left-3 top-3 pointer-events-auto sm:left-5 sm:top-5 hud-top-spaced">
        <Minimap />
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