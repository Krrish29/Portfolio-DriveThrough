import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { dispatchMobileControlState } from "../../hooks/useKeyboardControls";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function MobileControls() {
  const baseRef = useRef<HTMLDivElement>(null);
  const [stickPosition, setStickPosition] = useState({ x: 0, y: 0 });
  const [brakePressed, setBrakePressed] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px) and (pointer: coarse)");
    const orientation = window.matchMedia("(orientation: landscape)");

    const update = () => {
      setIsMobile(media.matches);
      setIsLandscape(orientation.matches);
    };

    update();
    media.addEventListener("change", update);
    orientation.addEventListener("change", update);
    return () => {
      media.removeEventListener("change", update);
      orientation.removeEventListener("change", update);
    };
  }, []);

  const updateFromPoint = (clientX: number, clientY: number) => {
    const rect = baseRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = clamp(((clientX - rect.left) / rect.width - 0.5) * 2, -1, 1);
    const y = clamp(((clientY - rect.top) / rect.height - 0.5) * 2, -1, 1);
    setStickPosition({ x, y });

    const nextState = {
      forward: y < -0.25,
      backward: y > 0.25,
      left: x < -0.25,
      right: x > 0.25,
      brake: false,
    };

    dispatchMobileControlState(nextState);
  };

  const resetControls = () => {
    setIsActive(false);
    setStickPosition({ x: 0, y: 0 });
    dispatchMobileControlState({
      forward: false,
      backward: false,
      left: false,
      right: false,
      brake: false,
    });
  };

  if (!isMobile) return null;

  return (
    <div className={`pointer-events-none fixed inset-0 z-30 flex items-end justify-between px-3 pb-3 sm:px-5 sm:pb-5 mobile-controls-safe ${isLandscape ? "px-4 pb-2" : ""}`}>
      <div className="pointer-events-auto flex flex-col items-center gap-2">
        <div
          ref={baseRef}
          onPointerDown={(event) => {
            event.preventDefault();
            event.currentTarget.setPointerCapture(event.pointerId);
            setIsActive(true);
            updateFromPoint(event.clientX, event.clientY);
          }}
          onPointerMove={(event) => {
            if (!isActive) return;
            updateFromPoint(event.clientX, event.clientY);
          }}
          onPointerUp={() => resetControls()}
          onPointerCancel={() => resetControls()}
          onPointerLeave={() => {
            if (!isActive) return;
            resetControls();
          }}
          className={`relative flex ${isLandscape ? "h-24 w-24" : "h-28 w-28"} items-center justify-center rounded-full border border-white/20 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),rgba(0,0,0,0.25))] shadow-[0_0_35px_rgba(0,0,0,0.4)] backdrop-blur-xl`}
          style={{ touchAction: "none" }}
        >
          <div className="absolute inset-2 rounded-full border border-white/10" />
          <div className="absolute inset-[18%] rounded-full border border-white/10" />
          <motion.div
            animate={{ x: stickPosition.x * 18, y: stickPosition.y * 18 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className={`relative ${isLandscape ? "h-11 w-11" : "h-13 w-13"} rounded-full border border-white/30 bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(200,220,255,0.8))] shadow-[0_6px_18px_rgba(0,0,0,0.25)]`}
          />
        </div>
        <p className={` ${isLandscape ? "text-[9px]" : "text-[10px]"} uppercase tracking-[0.3em] text-white/60`}>Drive</p>
      </div>

      <div className="pointer-events-auto">
        <button
          onPointerDown={(event) => {
            event.preventDefault();
            setBrakePressed(true);
            dispatchMobileControlState({ brake: true });
          }}
          onPointerUp={() => {
            setBrakePressed(false);
            dispatchMobileControlState({ brake: false });
          }}
          onPointerLeave={() => {
            if (!brakePressed) return;
            setBrakePressed(false);
            dispatchMobileControlState({ brake: false });
          }}
          onPointerCancel={() => {
            setBrakePressed(false);
            dispatchMobileControlState({ brake: false });
          }}
          className={`rounded-full border ${isLandscape ? "px-3 py-2 text-[9px]" : "px-4 py-3 text-[10px]"} font-semibold uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(0,0,0,0.3)] transition ${
            brakePressed
              ? "border-[#ffb36b] bg-[#ff7a45]/90 text-white"
              : "border-white/20 bg-black/25 text-white/80"
          }`}
          style={{ touchAction: "none" }}
          aria-label="Brake"
        >
          Brake
        </button>
      </div>
    </div>
  );
}
