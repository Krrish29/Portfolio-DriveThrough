const CONE_CLUSTERS: [number, number, number][][] = [
  [
    [22, 0, -13],
    [22.6, 0, -12.4],
    [23.2, 0, -13.4],
  ],
  [
    [-24, 0, 17],
    [-23.4, 0, 17.6],
  ],
];

function Cone({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.28, 0]}>
        <coneGeometry args={[0.22, 0.56, 10]} />
        <meshStandardMaterial color="#ff6a2e" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.34, 0]}>
        <cylinderGeometry args={[0.18, 0.19, 0.08, 10]} />
        <meshStandardMaterial color="#f4efe4" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.05, 10]} />
        <meshStandardMaterial color="#1c1c24" roughness={0.7} />
      </mesh>
    </group>
  );
}

/** Decorative "more coming soon" touch near a couple of buildings. */
export default function Cones() {
  return (
    <group>
      {CONE_CLUSTERS.map((cluster, ci) => (
        <group key={ci}>
          {cluster.map((pos, i) => (
            <Cone key={i} position={pos} />
          ))}
        </group>
      ))}
    </group>
  );
}
