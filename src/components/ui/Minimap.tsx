import { useGameStore } from "../../hooks/useGameStore";
import { BUILDINGS } from "../../data/sections";
import { WORLD } from "../../constants/world";

const MAP_SIZE = 148;
const WORLD_RANGE = WORLD.boundsHalfExtent;

export default function Minimap() {
  const [cx, cz] = useGameStore((s) => s.carPosition);
  const heading = useGameStore((s) => s.carHeading);
  const nearestSection = useGameStore((s) => s.nearestSection);

  const toMapCoords = (x: number, z: number) => {
    const dx = x - cx;
    const dz = z - cz;
    const scale = (MAP_SIZE / 2 - 10) / WORLD_RANGE;
    return { left: MAP_SIZE / 2 + dx * scale, top: MAP_SIZE / 2 + dz * scale };
  };

  return (
    <div
      className="glass-panel rounded-full overflow-hidden relative"
      style={{ width: MAP_SIZE, height: MAP_SIZE }}
    >
      <div className="absolute inset-0" style={{ opacity: 0.5, background: "radial-gradient(circle, transparent 60%, rgba(0,0,0,0.4) 100%)" }} />

      {BUILDINGS.map((b) => {
        const { left, top } = toMapCoords(b.position[0], b.position[2]);
        if (left < 2 || left > MAP_SIZE - 2 || top < 2 || top > MAP_SIZE - 2) return null;
        const active = nearestSection === b.id;
        return (
          <div
            key={b.id}
            className="absolute rounded-full"
            style={{
              left: left - (active ? 4 : 3),
              top: top - (active ? 4 : 3),
              width: active ? 8 : 6,
              height: active ? 8 : 6,
              background: b.accent,
              boxShadow: active ? `0 0 8px ${b.accent}` : "none",
              transition: "box-shadow 0.2s",
            }}
            title={b.label}
          />
        );
      })}

      <div
        className="absolute"
        style={{
          left: MAP_SIZE / 2 - 5,
          top: MAP_SIZE / 2 - 5,
          width: 10,
          height: 10,
          transform: `rotate(${heading + Math.PI}rad)`,
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderBottom: "10px solid var(--color-glow)",
            filter: "drop-shadow(0 0 3px var(--color-glow))",
          }}
        />
      </div>
    </div>
  );
}
