import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGameStore } from "../../hooks/useGameStore";

const MAX_MARKS = 240;

/**
 * Leaves faint dark quad decals behind the car's rear wheels while
 * `isSkidding` is true. Uses a single InstancedMesh ring-buffer so cost stays
 * flat regardless of how long the visitor drives.
 */
export default function SkidMarks() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const nextIndex = useRef(0);
  const lastMarkPos = useRef(new THREE.Vector3(Infinity, 0, Infinity));
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Hide every instance below the ground until it's actually used.
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const hidden = new THREE.Object3D();
    hidden.position.set(0, -50, 0);
    hidden.updateMatrix();
    for (let i = 0; i < MAX_MARKS; i++) mesh.setMatrixAt(i, hidden.matrix);
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { isSkidding, carPosition, carHeading } = useGameStore.getState();
    if (!isSkidding) return;

    const [x, z] = carPosition;
    const pos = new THREE.Vector3(x, 0.045, z);
    if (pos.distanceTo(lastMarkPos.current) < 0.35) return;
    lastMarkPos.current.copy(pos);

    for (const side of [-0.45, 0.45]) {
      const offset = new THREE.Vector3(side, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), carHeading);
      dummy.position.set(x + offset.x, 0.045, z + offset.z);
      dummy.rotation.set(-Math.PI / 2, 0, carHeading);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();

      const i = nextIndex.current % MAX_MARKS;
      mesh.setMatrixAt(i, dummy.matrix);
      nextIndex.current++;
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, MAX_MARKS]} frustumCulled={false}>
      <planeGeometry args={[0.22, 0.9]} />
      <meshStandardMaterial color="#0a0a0a" transparent opacity={0.4} depthWrite={false} />
    </instancedMesh>
  );
}
