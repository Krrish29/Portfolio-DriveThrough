import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { CarHandle } from "./Car";
import { CAMERA_TUNING } from "../../constants/world";
import { useGameStore } from "../../hooks/useGameStore";

interface CameraRigProps {
  carHandle: React.RefObject<CarHandle | null>;
}

const c = CAMERA_TUNING;

/**
 * Follows behind the car using an exponential damp, gently narrows FOV while
 * accelerating, supports right-click-drag orbit (yaw + limited pitch), and
 * scroll-wheel zoom that dollies the chase distance in/out — all independent
 * of WASD steering.
 */
export default function CameraRig({ carHandle }: CameraRigProps) {
  const { camera, gl } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 4, 14));
  const currentLook = useRef(new THREE.Vector3());
  const isPanelOpen = useGameStore((s) => s.activePanel !== null);

  const isOrbiting = useRef(false);
  const orbitYaw = useRef(0);
  const orbitPitch = useRef(0.1);
  const orbitBlend = useRef(0);
  const zoomDistance = useRef(c.followDistance);

  useEffect(() => {
    const el = gl.domElement;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 2) return;
      isOrbiting.current = true;
      el.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isOrbiting.current) return;
      orbitYaw.current -= e.movementX * c.orbitSensitivity;
      orbitPitch.current = THREE.MathUtils.clamp(
        orbitPitch.current + e.movementY * c.orbitSensitivity,
        c.orbitMinPitch,
        c.orbitMaxPitch
      );
    };
    const onPointerUp = (e: PointerEvent) => {
      if (e.button !== 2) return;
      isOrbiting.current = false;
    };
    const onContextMenu = (e: MouseEvent) => e.preventDefault();
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomDistance.current = THREE.MathUtils.clamp(
        zoomDistance.current + Math.sign(e.deltaY) * c.zoomSpeed,
        c.zoomMin,
        c.zoomMax
      );
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    el.addEventListener("contextmenu", onContextMenu);
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("contextmenu", onContextMenu);
      el.removeEventListener("wheel", onWheel);
    };
  }, [gl]);

  useFrame((_, delta) => {
    const introDone = useGameStore.getState().introDone;
    if (!introDone) return;

    const handle = carHandle.current;
    const body = handle?.body.current;
    if (!body) return;

    const pos = body.translation();
    const rot = body.rotation();
    const quat = new THREE.Quaternion(rot.x, rot.y, rot.z, rot.w);

    const targetBlend = isOrbiting.current ? 1 : 0;
    const blendT = 1 - Math.exp(-c.orbitBlendBack * delta);
    orbitBlend.current = THREE.MathUtils.lerp(orbitBlend.current, targetBlend, blendT);
    if (!isOrbiting.current && orbitBlend.current < 0.001) {
      orbitYaw.current = THREE.MathUtils.lerp(orbitYaw.current, 0, blendT);
      orbitPitch.current = THREE.MathUtils.lerp(orbitPitch.current, 0.1, blendT);
    }

    const orbitQuat = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(orbitPitch.current * orbitBlend.current, orbitYaw.current * orbitBlend.current, 0, "YXZ")
    );
    const combinedQuat = quat.clone().multiply(orbitQuat);

    // Zoom scales both distance and height together so the follow angle
    // stays consistent as you dolly in/out.
    const zoomRatio = zoomDistance.current / c.followDistance;
    const behind = new THREE.Vector3(0, c.followHeight * zoomRatio, -zoomDistance.current).applyQuaternion(
      combinedQuat
    );
    const desiredPos = new THREE.Vector3(pos.x, pos.y, pos.z).add(behind);

    const lookOffset = new THREE.Vector3(0, c.lookHeight, 2).applyQuaternion(quat);
    const desiredLook = new THREE.Vector3(pos.x, pos.y, pos.z).add(lookOffset);

    const t = 1 - Math.exp(-c.damping * delta);
    const posT = isOrbiting.current ? Math.min(1, t * 2.2) : t;
    currentPos.current.lerp(desiredPos, isPanelOpen ? t * 0.2 : posT);
    currentLook.current.lerp(desiredLook, isPanelOpen ? t * 0.2 : t);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLook.current);

    if ("fov" in camera) {
      const speed = useGameStore.getState().speedKmh;
      const targetFov = THREE.MathUtils.lerp(c.fov, c.zoomFov, Math.min(speed / 70, 1));
      const persp = camera as THREE.PerspectiveCamera;
      persp.fov = THREE.MathUtils.lerp(persp.fov, targetFov, 0.05);
      persp.updateProjectionMatrix();
    }
  });

  return null;
}