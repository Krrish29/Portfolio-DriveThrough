import { useMemo } from "react";

interface Peak {
  position: [number, number, number];
  radius: number;
  height: number;
  color: string;
}

export default function Mountains() {
  const peaks = useMemo<Peak[]>(() => {
    const list: Peak[] = [];
    const ring = 130;
    const count = 14;
    let seed = 7;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + rand() * 0.3;
      const dist = ring + rand() * 30;
      list.push({
        position: [Math.cos(angle) * dist, 0, Math.sin(angle) * dist],
        radius: 18 + rand() * 22,
        height: 26 + rand() * 34,
        color: i % 2 === 0 ? "#4a3a63" : "#5a4570",
      });
    }
    return list;
  }, []);

  return (
    <group>
      {peaks.map((p, i) => (
        <mesh key={i} position={[p.position[0], p.height / 2 - 4, p.position[2]]}>
          <coneGeometry args={[p.radius, p.height, 7]} />
          <meshStandardMaterial color={p.color} fog={true} />
        </mesh>
      ))}
    </group>
  );
}
