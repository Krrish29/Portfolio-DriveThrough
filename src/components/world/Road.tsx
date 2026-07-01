import { useMemo } from "react";
import { WORLD } from "../../constants/world";

const WAYPOINTS: [number, number][] = [
  [0, 8],
  [-22, 8],
  [-26, -2],
  [-22, -18],
  [0, -22],
  [24, -18],
  [28, -2],
  [24, 18],
  [26, 26],
  [0, 30],
  [-26, 20],
  [-22, 8],
  [0, 8],
];

function buildSegments(points: [number, number][]) {
  const segments: { center: [number, number]; length: number; angle: number }[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, z1] = points[i];
    const [x2, z2] = points[i + 1];
    const dx = x2 - x1;
    const dz = z2 - z1;
    const length = Math.sqrt(dx * dx + dz * dz);
    const angle = Math.atan2(dx, dz);
    segments.push({ center: [(x1 + x2) / 2, (z1 + z2) / 2], length, angle });
  }
  return segments;
}

export default function Road() {
  const segments = useMemo(() => buildSegments(WAYPOINTS), []);

  return (
    <group>
      {segments.map((seg, i) => (
        <group key={i} position={[seg.center[0], 0.01, seg.center[1]]} rotation={[0, seg.angle, 0]}>
          <mesh receiveShadow>
            <boxGeometry args={[WORLD.roadWidth, 0.05, seg.length + WORLD.roadWidth * 0.6]} />
            <meshStandardMaterial color={WORLD.roadColor} roughness={0.9} />
          </mesh>
          {Array.from({ length: Math.floor(seg.length / 4) }).map((_, j) => (
            <mesh key={j} position={[0, 0.03, -seg.length / 2 + j * 4 + 1]}>
              <boxGeometry args={[0.2, 0.02, 1.4]} />
              <meshStandardMaterial color="#e8d9b0" />
            </mesh>
          ))}
          {[-1, 1].map((side) => (
            <mesh key={side} position={[side * (WORLD.roadWidth / 2 + 1.1), 0.06, 0]} receiveShadow>
              <boxGeometry args={[1.4, 0.12, seg.length + WORLD.roadWidth * 0.6]} />
              <meshStandardMaterial color="#8f8a94" roughness={1} />
            </mesh>
          ))}
        </group>
      ))}

      <mesh position={[0, 0.02, 4]} receiveShadow>
        <cylinderGeometry args={[10, 10, 0.05, 32]} />
        <meshStandardMaterial color={WORLD.roadColor} roughness={0.9} />
      </mesh>
    </group>
  );
}

export { WAYPOINTS };
