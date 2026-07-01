import { RigidBody } from "@react-three/rapier";
import { WORLD } from "../../constants/world";

export default function Boundaries() {
  const h = WORLD.boundsHalfExtent;
  const wallHeight = 6;
  const wallThickness = 2;

  const walls: { position: [number, number, number]; size: [number, number, number] }[] = [
    { position: [0, wallHeight / 2, h], size: [h * 2, wallHeight, wallThickness] },
    { position: [0, wallHeight / 2, -h], size: [h * 2, wallHeight, wallThickness] },
    { position: [h, wallHeight / 2, 0], size: [wallThickness, wallHeight, h * 2] },
    { position: [-h, wallHeight / 2, 0], size: [wallThickness, wallHeight, h * 2] },
  ];

  return (
    <>
      {walls.map((w, i) => (
        <RigidBody key={i} type="fixed" colliders="cuboid" position={w.position}>
          <mesh visible={false}>
            <boxGeometry args={w.size} />
          </mesh>
        </RigidBody>
      ))}
    </>
  );
}
