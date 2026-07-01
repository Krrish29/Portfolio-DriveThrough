import { RigidBody } from "@react-three/rapier";
import { WORLD } from "../../constants/world";

export default function Ground() {
  const size = WORLD.boundsHalfExtent * 2 + 20;
  return (
    <RigidBody type="fixed" colliders="cuboid" position={[0, -0.5, 0]}>
      <mesh receiveShadow>
        <boxGeometry args={[size, 1, size]} />
        <meshStandardMaterial color={WORLD.groundColor} roughness={1} />
      </mesh>
    </RigidBody>
  );
}
