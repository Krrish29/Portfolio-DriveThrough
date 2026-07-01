import { RigidBody } from "@react-three/rapier";
import { Text, Billboard } from "@react-three/drei";

/** Two-pole rally-arch straddling the main road near the plaza hub, with a
 *  welcome message and a small glowing pennant strip underneath. */
export default function WelcomeArch() {
  const poleHeight = 6.2;
  const span = 11;
  const z = 15.5;

  return (
    <group position={[0, 0, z]}>
      {[-span / 2, span / 2].map((x) => (
        <RigidBody key={x} type="fixed" colliders="cuboid" position={[x, poleHeight / 2, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.26, 0.32, poleHeight, 10]} />
            <meshStandardMaterial color="#3a3348" roughness={0.6} metalness={0.2} />
          </mesh>
        </RigidBody>
      ))}

      {/* Crossbeam */}
      <mesh castShadow position={[0, poleHeight, 0]}>
        <boxGeometry args={[span + 0.6, 0.5, 0.5]} />
        <meshStandardMaterial color="#3a3348" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Sign backing + text */}
      <Billboard position={[0, poleHeight - 0.55, 0.6]}>
        <mesh position={[0, 0, -0.02]}>
          <boxGeometry args={[span - 1, 1.1, 0.08]} />
          <meshStandardMaterial color="#1c1530" roughness={0.4} />
        </mesh>
        <Text
          position={[0, 0, 0.05]}
          anchorX="center"
          anchorY="middle"
          fontSize={0.72}
          color="#f4d27f"
          outlineWidth={0.025}
          outlineColor="#1a1420"
          letterSpacing={0.03}
        >
          WELCOME TO KRRISH CITY
        </Text>
      </Billboard>

    </group>
  );
}
