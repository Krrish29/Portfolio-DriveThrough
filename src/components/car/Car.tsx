import { useRef, useImperativeHandle, forwardRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, type RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { useKeyboardControls } from "../../hooks/useKeyboardControls";
import { useGameStore } from "../../hooks/useGameStore";
import { CAR_TUNING } from "../../constants/world";

export interface CarHandle {
  body: React.RefObject<RapierRigidBody | null>;
  group: React.RefObject<THREE.Group | null>;
}

/** Builds a canvas texture reading "KRRISH07" for the number plate. */
function usePlateTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#f4efe4";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#141414";
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, canvas.width - 6, canvas.height - 6);
    ctx.fillStyle = "#141414";
    ctx.font = "bold 40px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("KRRISH07", canvas.width / 2, canvas.height / 2 + 2);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function NumberPlate({ z, facingBack }: { z: number; facingBack?: boolean }) {
  const texture = usePlateTexture();
  return (
    <mesh position={[0, 0.28, z]} rotation={[0, facingBack ? Math.PI : 0, 0]}>
      <planeGeometry args={[0.55, 0.15]} />
      <meshStandardMaterial map={texture} toneMapped={false} side={THREE.DoubleSide} />
    </mesh>
  );
}

const Car = forwardRef<CarHandle>((_props, ref) => {
  const bodyRef = useRef<RapierRigidBody>(null);
  const groupRef = useRef<THREE.Group>(null);
  const wheelRefs = useRef<THREE.Group[]>([]);
  const controls = useKeyboardControls();

  const speedRef = useRef(0);
  const visualTilt = useRef(0);

  const setSpeedKmh = useGameStore((s) => s.setSpeedKmh);
  const setCarPosition = useGameStore((s) => s.setCarPosition);
  const setCarHeading = useGameStore((s) => s.setCarHeading);
  const setIsSkidding = useGameStore((s) => s.setIsSkidding);

  useImperativeHandle(ref, () => ({ body: bodyRef, group: groupRef }), []);

  useFrame((_, delta) => {
    const body = bodyRef.current;
    const group = groupRef.current;
    if (!body || !group) return;

    const dt = Math.min(delta, 0.05);
    const { forward, backward, left, right, brake } = controls.current;

    const c = CAR_TUNING;
    if (brake) {
      speedRef.current -= Math.sign(speedRef.current || 1) * c.brakeForce * dt;
      if (Math.abs(speedRef.current) < 0.3) speedRef.current = 0;
    } else if (forward && !backward) {
      speedRef.current += c.acceleration * dt;
    } else if (backward && !forward) {
      speedRef.current -= c.reverseAcceleration * dt;
    } else {
      const drag = c.drag * dt;
      if (speedRef.current > 0) speedRef.current = Math.max(0, speedRef.current - drag);
      else if (speedRef.current < 0) speedRef.current = Math.min(0, speedRef.current + drag);
    }
    speedRef.current = THREE.MathUtils.clamp(speedRef.current, -c.maxReverseSpeed, c.maxSpeed);

    const speedFactor = THREE.MathUtils.clamp(Math.abs(speedRef.current) / c.maxSpeed, 0, 1);
    const steerAuthority = c.maxSteerAtSpeed + (1 - c.maxSteerAtSpeed) * (1 - speedFactor);
    let steerInput = 0;
    if (left && !right) steerInput = 1;
    else if (right && !left) steerInput = -1;

    const steerDir = speedRef.current < -0.05 ? -1 : 1;
    const yawDelta = steerInput * steerDir * c.steerSpeed * steerAuthority * speedFactor * dt;

    const rotation = body.rotation();
    const quat = new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);
    const yawQuat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), yawDelta);
    quat.multiply(yawQuat);
    body.setRotation({ x: quat.x, y: quat.y, z: quat.z, w: quat.w }, true);

    const forwardVec = new THREE.Vector3(0, 0, 1).applyQuaternion(quat);
    const vel = forwardVec.multiplyScalar(speedRef.current);
    const currentVel = body.linvel();
    body.setLinvel({ x: vel.x, y: currentVel.y, z: vel.z }, true);

    const targetTilt = -steerInput * steerDir * c.tiltAmount * speedFactor;
    visualTilt.current = THREE.MathUtils.lerp(visualTilt.current, targetTilt, 0.15);
    group.rotation.z = visualTilt.current;

    const wheelSpin = (speedRef.current / 0.35) * dt;
    wheelRefs.current.forEach((wheel, i) => {
      if (!wheel) return;
      wheel.rotation.x += wheelSpin;
      if (i < 2) {
        wheel.rotation.y = THREE.MathUtils.lerp(wheel.rotation.y, steerInput * 0.4, 0.2);
      }
    });

    // --- Skid detection: hard braking or sharp steering at speed ---------
    const speedAbs = Math.abs(speedRef.current);
    const hardBraking = brake && speedAbs > c.skidMinSpeed * 0.5;
    const sharpTurn = Math.abs(steerInput) > 0 && speedAbs > c.skidMinSpeed;
    setIsSkidding(hardBraking || sharpTurn);

    const kmh = speedAbs * 3.6;
    setSpeedKmh(Math.round(kmh));
    const pos = body.translation();
    setCarPosition([pos.x, pos.z]);
    const euler = new THREE.Euler().setFromQuaternion(quat, "YXZ");
    setCarHeading(euler.y);
  });

  return (
    <RigidBody
      ref={bodyRef}
      colliders="cuboid"
      mass={CAR_TUNING.bodyMass}
      lockRotations={false}
      enabledRotations={[false, true, false]}
      position={[0, 0.4, 8]}
      friction={0.3}
      linearDamping={0.5}
      angularDamping={4}
    >
      <group ref={groupRef}>
        <mesh castShadow position={[0, 0.32, 0]}>
          <boxGeometry args={[1.7, 0.5, 3.4]} />
          <meshStandardMaterial color="#e0463a" metalness={0.4} roughness={0.35} />
        </mesh>
        <mesh castShadow position={[0, 0.68, -0.15]}>
          <boxGeometry args={[1.3, 0.42, 1.7]} />
          <meshStandardMaterial color="#1c1c24" metalness={0.2} roughness={0.2} />
        </mesh>
        {[-0.55, 0.55].map((x) => (
          <mesh key={`hl-${x}`} position={[x, 0.35, 1.68]}>
            <boxGeometry args={[0.28, 0.14, 0.06]} />
            <meshStandardMaterial
              color="#ffe9b0"
              emissive="#ffd580"
              emissiveIntensity={2}
              toneMapped={false}
            />
          </mesh>
        ))}
        {[-0.55, 0.55].map((x) => (
          <mesh key={`bl-${x}`} position={[x, 0.4, -1.68]}>
            <boxGeometry args={[0.26, 0.12, 0.05]} />
            <meshStandardMaterial
              color="#ff3b3b"
              emissive="#ff2222"
              emissiveIntensity={controls.current.brake ? 3 : 0.6}
              toneMapped={false}
            />
          </mesh>
        ))}

        {/* Number plates */}
        <NumberPlate z={1.72} />
        <NumberPlate z={-1.72} facingBack />

        {[
          [-0.85, 0.28, 1.1],
          [0.85, 0.28, 1.1],
          [-0.85, 0.28, -1.1],
          [0.85, 0.28, -1.1],
        ].map((p, i) => (
          <group
            key={i}
            position={p as [number, number, number]}
            ref={(el) => {
              if (el) wheelRefs.current[i] = el;
            }}
          >
            <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.32, 0.32, 0.26, 16]} />
              <meshStandardMaterial color="#141414" roughness={0.8} />
            </mesh>
          </group>
        ))}
      </group>
    </RigidBody>
  );
});

Car.displayName = "Car";
export default Car;
