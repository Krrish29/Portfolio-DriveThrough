import { WAYPOINTS } from "./Road";

export default function StreetLights() {
  const lights = WAYPOINTS.filter((_, i) => i % 2 === 0);

  return (
    <group>
      {lights.map(([x, z], i) => (
        <group key={i} position={[x + 5.5, 0, z]}>
          <mesh castShadow position={[0, 2.4, 0]}>
            <cylinderGeometry args={[0.06, 0.08, 4.8, 8]} />
            <meshStandardMaterial color="#2b2b33" />
          </mesh>
          <mesh position={[0, 4.7, 0.3]}>
            <sphereGeometry args={[0.22, 12, 12]} />
            <meshStandardMaterial
              color="#ffe4a8"
              emissive="#ffd68a"
              emissiveIntensity={2.2}
              toneMapped={false}
            />
          </mesh>
          <pointLight position={[0, 4.7, 0.3]} color="#ffcf8f" intensity={6} distance={12} decay={2} />
        </group>
      ))}
    </group>
  );
}
