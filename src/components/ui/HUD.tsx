import Minimap from "./Minimap";
import Speedometer from "./Speedometer";
import LocationDisplay from "./LocationDisplay";
import ControlsToggle from "./ControlsToggle";
import EnterPrompt from "./EnterPrompt";
import { AudioToggle } from "./AudioManager";
import DayNightToggle from "./DayNightToggle";
import Toast from "./Toast";
import Confetti from "./Confetti";

/** Pure layout shell — each piece manages its own data via the game store. */
export default function HUD() {
  return (
    <div className="fixed inset-0 z-20 pointer-events-none">
      <div className="absolute top-5 left-5 pointer-events-auto">
        <Minimap />
      </div>
      <div className="absolute top-5 right-5 flex items-start gap-3 pointer-events-auto">
        <LocationDisplay />
        <DayNightToggle />
        <AudioToggle />
      </div>
      <div className="absolute bottom-5 left-5 pointer-events-auto">
        <ControlsToggle />
      </div>
      <div className="absolute bottom-5 right-5 pointer-events-auto">
        <Speedometer />
      </div>
      <EnterPrompt />
      <Toast />
      <Confetti />
    </div>
  );
}