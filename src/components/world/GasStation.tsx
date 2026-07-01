import { RigidBody } from "@react-three/rapier";
import { Text, Billboard } from "@react-three/drei";

/** Small decorative gas station landmark near spawn. */
export default function GasStation() {
  return (
    <group position={[-10, 0, 12]} rotation={[0, 0.4, 0]}>
      <RigidBody type="fixed" colliders="cuboid" position={[0, 2.6, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.25, 5.2, 0.25]} />
          <meshStandardMaterial color="#8a8a92" />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" position={[3.6, 2.6, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.25, 5.2, 0.25]} />
          <meshStandardMaterial color="#8a8a92" />
        </mesh>
      </RigidBody>

      {/* Canopy */}
      <mesh castShadow position={[1.8, 5.1, 0]}>
        <boxGeometry args={[5.4, 0.25, 3]} />
        <meshStandardMaterial color="#d64545" roughness={0.4} />
      </mesh>
      <mesh position={[1.8, 4.9, 0]}>
        <boxGeometry args={[5.4, 0.06, 3]} />
        <meshStandardMaterial color="#fff1e0" emissive="#ffc978" emissiveIntensity={1.2} toneMapped={false} />
      </mesh>

      {/* Pumps */}
      {[0.8, 2.8].map((x) => (
        <RigidBody key={x} type="fixed" colliders="cuboid" position={[x, 0.55, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.5, 1.1, 0.4]} />
            <meshStandardMaterial color="#e8e4dc" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.2, 0.22]}>
            <boxGeometry args={[0.3, 0.4, 0.02]} />
            <meshStandardMaterial color="#2a9d5c" emissive="#2a9d5c" emissiveIntensity={0.8} toneMapped={false} />
          </mesh>
        </RigidBody>
      ))}

      <Billboard position={[1.8, 6.2, 0]}>
        <Text fontSize={0.42} color="#fff1e0" outlineWidth={0.02} outlineColor="#150f26">
          FUEL
        </Text>
      </Billboard>
    </group>
  );
}
