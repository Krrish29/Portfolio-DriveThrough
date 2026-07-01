import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import Experience from "./scenes/Experience";
import LoadingScreen from "./components/ui/LoadingScreen";
import HUD from "./components/ui/HUD";
import SectionPanel from "./components/ui/SectionPanel";
import AudioManager from "./components/ui/AudioManager";
import { useGameStore } from "./hooks/useGameStore";
import { CAMERA_TUNING } from "./constants/world";

export default function App() {
  const hasLoaded = useGameStore((s) => s.hasLoaded);

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

      <LoadingScreen />
      {hasLoaded && (
        <>
          <HUD />
          <SectionPanel />
          <AudioManager />
        </>
      )}
    </div>
  );
}
