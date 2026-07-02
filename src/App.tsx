import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import Experience from "./scenes/Experience";
import LoadingScreen from "./components/ui/LoadingScreen";
import HUD from "./components/ui/HUD";
import SectionPanel from "./components/ui/SectionPanel";
import AudioManager from "./components/ui/AudioManager";
import MobileControls from "./components/ui/MobileControls";
import { useGameStore } from "./hooks/useGameStore";
import { CAMERA_TUNING } from "./constants/world";

export default function App() {
  const hasLoaded = useGameStore((s) => s.hasLoaded);
  const loadCommunityTime = useGameStore((s) => s.loadCommunityTime);
  const addCommunitySeconds = useGameStore((s) => s.addCommunitySeconds);
  const [showOrientationHint, setShowOrientationHint] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("communityTimeSeconds") : null;
    if (stored) {
      const seconds = Number(stored);
      if (!Number.isNaN(seconds)) {
        loadCommunityTime(seconds);
      }
    }
  }, [loadCommunityTime]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (hasLoaded) {
      interval = setInterval(() => addCommunitySeconds(1), 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [hasLoaded, addCommunitySeconds]);

  useEffect(() => {
    const updateHint = () => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      setShowOrientationHint(isMobile && isPortrait);
    };

    updateHint();
    window.addEventListener("resize", updateHint);
    window.addEventListener("orientationchange", updateHint);
    return () => {
      window.removeEventListener("resize", updateHint);
      window.removeEventListener("orientationchange", updateHint);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <Canvas
        shadows
        camera={{ fov: CAMERA_TUNING.fov, near: 0.1, far: 400, position: [0, 5, 16] }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#150f26"]} />
        {hasLoaded && <Experience />}
        <EffectComposer>
          <Bloom intensity={0.5} luminanceThreshold={0.35} luminanceSmoothing={0.25} mipmapBlur />
          <Vignette eskil={false} offset={0.25} darkness={0.7} />
        </EffectComposer>
      </Canvas>

      <div className="vignette" />
      <div className="grain" />

      {showOrientationHint && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-[#07040f]/90 px-4 text-center sm:hidden">
          <div className="glass-panel rounded-3xl px-5 py-6">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#ffb36b]">Mobile tip</p>
            <h2 className="mt-2 text-xl font-semibold">Rotate your phone to landscape</h2>
            <p className="mt-2 text-sm text-white/75">
              The driving experience is best in landscape mode with touch controls for smoother navigation.
            </p>
          </div>
        </div>
      )}

      <LoadingScreen />
      {hasLoaded && (
        <>
          <HUD />
          <SectionPanel />
          <AudioManager />
          <MobileControls />
        </>
      )}
    </div>
  );
}
