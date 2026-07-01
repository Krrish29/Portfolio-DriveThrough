import { Sky, Cloud, Environment } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";
import { DAY_NIGHT } from "../../constants/world";
import { useGameStore } from "../../hooks/useGameStore";

export default function SkyAndLights() {
  const timeOfDay = useGameStore((s) => s.timeOfDay);
  const preset = DAY_NIGHT[timeOfDay];
  const { scene } = useThree();

  useEffect(() => {
    scene.background = new THREE.Color(preset.bgColor);
  }, [preset.bgColor, scene]);

  return (
    <>
      <Sky
        distance={450000}
        sunPosition={preset.sunPosition}
        inclination={timeOfDay === "night" ? 0.08 : 0.52}
        azimuth={0.25}
        turbidity={timeOfDay === "night" ? 3 : 8}
        rayleigh={timeOfDay === "night" ? 0.6 : 2.2}
        mieCoefficient={0.02}
        mieDirectionalG={0.85}
      />
      <Environment preset={timeOfDay === "night" ? "night" : "sunset"} environmentIntensity={preset.envIntensity} />

      <fog attach="fog" args={[preset.fogColor, 30, preset.fogFar]} />

      <directionalLight
        position={preset.sunPosition}
        intensity={preset.keyIntensity}
        color={preset.keyColor}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-70}
        shadow-camera-right={70}
        shadow-camera-top={70}
        shadow-camera-bottom={-70}
        shadow-camera-near={1}
        shadow-camera-far={200}
      />
      <hemisphereLight color={preset.hemiSky} groundColor={preset.hemiGround} intensity={preset.hemiIntensity} />

      {timeOfDay === "dusk" && (
        <>
          <Cloud position={[-30, 26, -50]} speed={0.05} opacity={0.35} segments={20} bounds={[20, 4, 10]} />
          <Cloud position={[25, 30, -40]} speed={0.04} opacity={0.25} segments={16} bounds={[16, 3, 8]} />
          <Cloud position={[10, 24, 40]} speed={0.06} opacity={0.2} segments={14} bounds={[14, 3, 8]} />
        </>
      )}
    </>
  );
}