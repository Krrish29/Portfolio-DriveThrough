import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface WalkerSpec {
  id: string;
  base: [number, number, number];
  range: number;
  speed: number;
  path: "horizontal" | "vertical" | "circle";
  bodyColor: string;
  headColor: string;
  scale: number;
}

const WALKERS: WalkerSpec[] = [
  {
    id: "north-walker",
    base: [-14, 0, 12],
    range: 10,
    speed: 0.85,
    path: "vertical",
    bodyColor: "#5e7ff2",
    headColor: "#f3d18b",
    scale: 1,
  },
  {
    id: "east-walker",
    base: [18, 0, -8],
    range: 8,
    speed: 1.05,
    path: "horizontal",
    bodyColor: "#f27f48",
    headColor: "#f3d18b",
    scale: 0.95,
  },
  {
    id: "south-walker",
    base: [4, 0, -24],
    range: 7,
    speed: 0.8,
    path: "horizontal",
    bodyColor: "#6cc1a4",
    headColor: "#ffe3c4",
    scale: 1,
  },
  {
    id: "circle-walker",
    base: [0, 0, 24],
    range: 5,
    speed: 0.9,
    path: "circle",
    bodyColor: "#d78ce4",
    headColor: "#fbe3c9",
    scale: 1,
  },
];

function Pedestrian({ walker }: { walker: WalkerSpec }) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const t = clock.getElapsedTime() * walker.speed;
    let x = walker.base[0];
    let z = walker.base[2];
    let rotation = 0;

    if (walker.path === "horizontal") {
      x += Math.sin(t) * walker.range;
      rotation = Math.sign(Math.cos(t)) * Math.PI * 0.5;
    } else if (walker.path === "vertical") {
      z += Math.sin(t) * walker.range;
      rotation = Math.sign(Math.cos(t)) * Math.PI;
    } else {
      x += Math.cos(t) * walker.range;
      z += Math.sin(t) * walker.range;
      rotation = Math.atan2(Math.cos(t), -Math.sin(t));
    }

    ref.current.position.set(x, Math.sin(t * 1.4) * 0.03, z);
    ref.current.rotation.y = rotation;
  });

  return (
    <group ref={ref} scale={walker.scale}>
      <mesh castShadow position={[0, 0.65, 0]}>
        <boxGeometry args={[0.26, 0.9, 0.24]} />
        <meshStandardMaterial color={walker.bodyColor} roughness={0.55} metalness={0.1} />
      </mesh>
      <mesh castShadow position={[0, 1.2, 0]}>
        <boxGeometry args={[0.26, 0.28, 0.26]} />
        <meshStandardMaterial color={walker.headColor} roughness={0.85} />
      </mesh>
      <mesh castShadow position={[0.16, 0.45, 0]}>
        <boxGeometry args={[0.08, 0.6, 0.08]} />
        <meshStandardMaterial color={walker.bodyColor} roughness={0.55} metalness={0.1} />
      </mesh>
      <mesh castShadow position={[-0.16, 0.45, 0]}>
        <boxGeometry args={[0.08, 0.6, 0.08]} />
        <meshStandardMaterial color={walker.bodyColor} roughness={0.55} metalness={0.1} />
      </mesh>
      <mesh castShadow position={[0.08, 0.1, 0.08]}>
        <boxGeometry args={[0.12, 0.2, 0.08]} />
        <meshStandardMaterial color="#2d2d32" roughness={0.8} />
      </mesh>
      <mesh castShadow position={[-0.08, 0.1, 0.08]}>
        <boxGeometry args={[0.12, 0.2, 0.08]} />
        <meshStandardMaterial color="#2d2d32" roughness={0.8} />
      </mesh>
    </group>
  );
}

export default function Pedestrians() {
  return <>{WALKERS.map((walker) => <Pedestrian key={walker.id} walker={walker} />)}</>;
}
