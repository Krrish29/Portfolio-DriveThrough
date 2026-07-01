export default function Lake() {
  return (
    <group position={[-40, 0, -45]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <circleGeometry args={[14, 40]} />
        <meshStandardMaterial
          color="#2c5f7a"
          roughness={0.15}
          metalness={0.6}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[13.6, 15.2, 40]} />
        <meshStandardMaterial color="#c9b483" roughness={1} />
      </mesh>
    </group>
  );
}
