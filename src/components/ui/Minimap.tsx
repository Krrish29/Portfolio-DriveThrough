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
      className="glass-panel game-ui-panel rounded-full overflow-hidden relative"
      style={{ width: MAP_SIZE, height: MAP_SIZE, maxWidth: "92vw", maxHeight: "92vw" }}
    >
      <div className="absolute inset-0" style={{ opacity: 0.5, background: "radial-gradient(circle, transparent 55%, rgba(0,0,0,0.45) 100%)" }} />

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
          left: MAP_SIZE / 2,
          top: MAP_SIZE / 2,
          width: 28,
          height: 28,
          transform: `translate(-50%, -50%) rotate(${heading}rad)`,
          transformOrigin: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 14,
            height: 14,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.24)",
            background: "rgba(255,255,255,0.1)",
            boxShadow: "0 0 14px rgba(255,255,255,0.12)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "8%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "7px solid transparent",
            borderRight: "7px solid transparent",
            borderBottom: "13px solid var(--color-glow)",
            filter: "drop-shadow(0 0 5px var(--color-glow))",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "40%",
            transform: "translateX(-50%)",
            width: 2,
            height: 14,
            borderRadius: 1,
            background: "rgba(255,255,255,0.85)",
            opacity: 0.9,
          }}
        />
      </div>
    </div>
  );
}
