import { useMemo } from "react";
import * as THREE from "three";
import { RigidBody, CylinderCollider } from "@react-three/rapier";

interface TreeSpec {
  position: [number, number, number];
  scale: number;
}

function generateTrees(count: number, exclusionZones: { x: number; z: number; r: number }[]): TreeSpec[] {
  const trees: TreeSpec[] = [];
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  let attempts = 0;
  while (trees.length < count && attempts < count * 6) {
    attempts++;
    const x = (rand() - 0.5) * 170;
    const z = (rand() - 0.5) * 170;
    const tooClose = exclusionZones.some((zone) => {
      const d = Math.hypot(x - zone.x, z - zone.z);
      return d < zone.r;
    });
    if (tooClose) continue;
    trees.push({ position: [x, 0, z], scale: 0.8 + rand() * 0.9 });
  }
  return trees;
}

export default function Trees() {
  const exclusions = useMemo(
    () => [
      { x: 0, z: 8, r: 14 },
      { x: -22, z: -18, r: 10 },
      { x: 24, z: -20, r: 12 },
      { x: 26, z: 18, r: 11 },
      { x: -26, z: 20, r: 11 },
      { x: 0, z: -34, r: 12 },
      { x: 0, z: 30, r: 11 },
      { x: 0, z: 8, r: 10 },
      { x: -10, z: 12, r: 8 }, // gas station
    ],
    []
  );

  const trees = useMemo(() => generateTrees(90, exclusions), [exclusions]);

  const trunkGeo = useMemo(() => new THREE.CylinderGeometry(0.18, 0.24, 1.6, 6), []);
  const leavesGeo = useMemo(() => new THREE.ConeGeometry(1.1, 2.2, 7), []);

  return (
    <group>
      {trees.map((t, i) => (
        <RigidBody key={i} type="fixed" colliders={false} position={t.position}>
          <CylinderCollider args={[0.8 * t.scale, 0.3 * t.scale]} position={[0, 0.3 * t.scale, 0]} />
          <group scale={t.scale}>
            <mesh castShadow position={[0, 0.8, 0]} geometry={trunkGeo}>
              <meshStandardMaterial color="#6b4a30" roughness={1} />
            </mesh>
            <mesh castShadow position={[0, 2.2, 0]} geometry={leavesGeo}>
              <meshStandardMaterial color="#3f6b3a" roughness={0.9} />
            </mesh>
          </group>
        </RigidBody>
      ))}
    </group>
  );
}
