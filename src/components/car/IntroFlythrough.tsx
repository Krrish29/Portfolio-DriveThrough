import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGameStore } from "../../hooks/useGameStore";

interface Keyframe {
  pos: [number, number, number];
  look: [number, number, number];
  /** Seconds this keyframe should take to reach, from the previous one. */
  duration: number;
}

// Banner (0,0,15.5) → swing past a couple of buildings → the lake → settle
// behind the car's spawn point before handing control to the player.
const KEYFRAMES: Keyframe[] = [
  { pos: [0, 10, 34], look: [0, 5, 15.5], duration: 0 },
  { pos: [6, 8, 20], look: [0, 5, 15.5], duration: 2.2 },
  { pos: [-14, 9, -6], look: [-22, 3, -18], duration: 2.4 },
  { pos: [30, 12, -8], look: [24, 5, -20], duration: 2.4 },
  { pos: [-48, 10, -30], look: [-40, 1, -45], duration: 2.4 },
  { pos: [4, 6, 22], look: [0, 1, 8], duration: 2.2 },
];

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export default function IntroFlythrough() {
  const { camera } = useThree();
  const introDone = useGameStore((s) => s.introDone);
  const setIntroDone = useGameStore((s) => s.setIntroDone);
  const elapsed = useRef(0);
  const finished = useRef(false);

  useFrame((_, delta) => {
    if (introDone || finished.current) return;
    elapsed.current += delta;

    // Find which segment we're in.
    let t = elapsed.current;
    let segIndex = 0;
    for (let i = 1; i < KEYFRAMES.length; i++) {
      if (t <= KEYFRAMES[i].duration) {
        segIndex = i;
        break;
      }
      t -= KEYFRAMES[i].duration;
      segIndex = i + 1;
    }

    if (segIndex >= KEYFRAMES.length) {
      finished.current = true;
      setIntroDone(true);
      return;
    }

    const from = KEYFRAMES[segIndex - 1] ?? KEYFRAMES[0];
    const to = KEYFRAMES[segIndex];
    const segT = to.duration > 0 ? easeInOut(THREE.MathUtils.clamp(t / to.duration, 0, 1)) : 1;

    const pos = new THREE.Vector3(...from.pos).lerp(new THREE.Vector3(...to.pos), segT);
    const look = new THREE.Vector3(...from.look).lerp(new THREE.Vector3(...to.look), segT);

    camera.position.copy(pos);
    camera.lookAt(look);
  });

  return null;
}
