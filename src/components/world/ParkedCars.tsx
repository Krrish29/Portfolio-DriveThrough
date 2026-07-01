import { RigidBody } from "@react-three/rapier";

interface ParkedSpec {
  position: [number, number, number];
  rotation: number;
  color: string;
}

const PARKED: ParkedSpec[] = [
  { position: [-17, 0.28, -14], rotation: 0.5, color: "#3b6ea5" },
  { position: [20, 0.28, -14], rotation: -0.9, color: "#8a8a8a" },
  { position: [21, 0.28, 22], rotation: 1.4, color: "#c9c14d" },
];

function ParkedCar({ position, rotation, color }: ParkedSpec) {
  return (
    <RigidBody type="fixed" colliders="cuboid" position={position} rotation={[0, rotation, 0]}>
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 0.45, 3.2]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      <mesh castShadow position={[0, 0.34, -0.1]}>
        <boxGeometry args={[1.2, 0.36, 1.5]} />
        <meshStandardMaterial color="#1c1c24" roughness={0.3} />
      </mesh>
      {[
        [-0.8, -0.18, 1.0],
        [0.8, -0.18, 1.0],
        [-0.8, -0.18, -1.0],
        [0.8, -0.18, -1.0],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.28, 0.28, 0.22, 12]} />
          <meshStandardMaterial color="#141414" roughness={0.9} />
        </mesh>
      ))}
    </RigidBody>
  );
}

export default function ParkedCars() {
  return (
    <>
      {PARKED.map((p, i) => (
        <ParkedCar key={i} {...p} />
      ))}
    </>
  );
}
