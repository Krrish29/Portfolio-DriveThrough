import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import type { CarHandle } from "../components/car/Car";
import { BUILDINGS } from "../data/sections";
import { useGameStore } from "./useGameStore";

export function useProximity(carHandle: React.RefObject<CarHandle | null>) {
  const setNearestSection = useGameStore((s) => s.setNearestSection);

  useFrame(() => {
    const body = carHandle.current?.body.current;
    if (!body) return;
    const pos = body.translation();

    let closest: (typeof BUILDINGS)[number] | null = null;
    let closestDist = Infinity;

    for (const b of BUILDINGS) {
      const mx = b.position[0] + b.markerOffset[0];
      const mz = b.position[2] + b.markerOffset[2];
      const dx = pos.x - mx;
      const dz = pos.z - mz;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < b.triggerRadius && dist < closestDist) {
        closest = b;
        closestDist = dist;
      }
    }

    setNearestSection(closest ? closest.id : null);
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const { nearestSection, activePanel, openPanel, closePanel } = useGameStore.getState();
      if (e.code === "Escape" && activePanel) {
        closePanel();
      } else if (e.code === "KeyE" && !activePanel && nearestSection) {
        openPanel(nearestSection);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}
