import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGameStore } from "../../hooks/useGameStore";
import { COIN_POSITIONS } from "../../data/coins";

const PICKUP_RADIUS = 2.5;
const RESPAWN_DELAY = 7000;

export default function Coins() {
  const carPosition = useGameStore((s) => s.carPosition);
  const collectCoin = useGameStore((s) => s.collectCoin);
  const [hiddenCoins, setHiddenCoins] = useState<Set<number>>(new Set());
  const timeoutIds = useRef<Map<number, number>>(new Map());
  const refs = useRef<Array<THREE.Group | null>>([]);

  useEffect(() => {
    return () => {
      timeoutIds.current.forEach((id) => window.clearTimeout(id));
      timeoutIds.current.clear();
    };
  }, []);

  useFrame((_, delta) => {
    const [cx, cz] = carPosition;
    COIN_POSITIONS.forEach((pos, index) => {
      if (hiddenCoins.has(index)) return;
      const dx = pos[0] - cx;
      const dz = pos[2] - cz;
      if (dx * dx + dz * dz < PICKUP_RADIUS * PICKUP_RADIUS) {
        collectCoin();
        setHiddenCoins((current) => {
          const next = new Set(current);
          next.add(index);
          return next;
        });
        const timeoutId = window.setTimeout(() => {
          setHiddenCoins((current) => {
            const next = new Set(current);
            next.delete(index);
            return next;
          });
          timeoutIds.current.delete(index);
        }, RESPAWN_DELAY);
        timeoutIds.current.set(index, timeoutId);
      }
      const group = refs.current[index];
      if (group) {
        group.rotation.y += delta * 2.2;
        group.position.y = 0.4 + Math.sin(Date.now() * 0.003 + index) * 0.08;
      }
    });
  });

  return (
    <>
      {COIN_POSITIONS.map((position, index) =>
        hiddenCoins.has(index) ? null : (
          <group
            key={index}
            ref={(el) => {
              refs.current[index] = el;
            }}
            position={position}
          >
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.5, 0.16, 16, 32]} />
              <meshStandardMaterial
                color="#ffd660"
                emissive="#ffe88c"
                emissiveIntensity={1.2}
                metalness={1}
                roughness={0.15}
              />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 0.06, 24]} />
              <meshStandardMaterial
                color="#ffea93"
                emissive="#fff7ba"
                emissiveIntensity={0.65}
                metalness={0.9}
                roughness={0.18}
              />
            </mesh>
          </group>
        )
      )}
    </>
  );
}
