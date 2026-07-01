import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import type { BuildingDef } from "../../types";
import { useGameStore } from "../../hooks/useGameStore";

interface BuildingProps {
  def: BuildingDef;
}

function BuildingWindows({ width, height, depth, accent }: { width: number; height: number; depth: number; accent: string }) {
  const windowMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#eef7ff",
        emissive: accent,
        emissiveIntensity: 1.2,
        toneMapped: false,
        transparent: true,
        opacity: 0.92,
      }),
    [accent]
  );

  return (
    <group>
      <mesh position={[0, height * 0.2, depth / 2 + 0.05]}>
        <boxGeometry args={[width * 0.7, 0.18, 0.1]} />
        <primitive object={windowMaterial} attach="material" />
      </mesh>
      <mesh position={[0, height * 0.5, depth / 2 + 0.05]}>
        <boxGeometry args={[width * 0.4, 0.16, 0.1]} />
        <primitive object={windowMaterial} attach="material" />
      </mesh>
      <mesh position={[width / 2 + 0.05, height * 0.35, 0]}>
        <boxGeometry args={[0.1, 0.3, depth * 0.6]} />
        <primitive object={windowMaterial} attach="material" />
      </mesh>
      <mesh position={[-width / 2 - 0.05, height * 0.35, 0]}>
        <boxGeometry args={[0.1, 0.28, depth * 0.5]} />
        <primitive object={windowMaterial} attach="material" />
      </mesh>
    </group>
  );
}

/** A proper triangular-cross-section gabled roof, extruded along depth. */
function GableRoof({ width, depth, height, color }: { width: number; depth: number; height: number; color: string }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-width / 2 - 0.3, 0);
    shape.lineTo(0, height);
    shape.lineTo(width / 2 + 0.3, 0);
    shape.lineTo(-width / 2 - 0.3, 0);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: depth + 0.6,
      bevelEnabled: false,
      steps: 1,
    });
    geo.translate(0, 0, -(depth + 0.6) / 2);
    return geo;
  }, [width, depth, height]);

  return (
    <mesh castShadow geometry={geometry}>
      <meshStandardMaterial color={color} roughness={0.55} />
    </mesh>
  );
}

function ProjectsCampus({ width, accent }: { width: number; accent: string }) {
  return (
    <group>
      {[0, 1, 2].map((level) => {
        const scale = 1 - level * 0.18;
        const depth = width * (0.75 - level * 0.08);
        const height = 1.6 - level * 0.45;
        return (
          <group key={level} position={[0, level * 1.75, 0]}>
            <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
              <boxGeometry args={[width * scale, height, depth]} />
              <meshStandardMaterial color={level === 2 ? accent : "#5e7182"} roughness={0.58} />
            </mesh>
            <mesh position={[0, height + 0.12, 0]} rotation={[0, 0, Math.PI / 4]}>
              <cylinderGeometry args={[depth * 0.25, depth * 0.25, 0.22, 4]} />
              <meshStandardMaterial color="#8c9aa2" roughness={0.55} />
            </mesh>
          </group>
        );
      })}
      <mesh position={[0, 5.1, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[width * 0.18, 0.8, 4]} />
        <meshStandardMaterial color={accent} roughness={0.45} />
      </mesh>
    </group>
  );
}

function CertificationsMuseum({ width, height, color, accent }: { width: number; height: number; color: string; accent: string }) {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
        <cylinderGeometry args={[width / 2, width / 2, height, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} transparent opacity={0.92} />
      </mesh>
      <mesh castShadow position={[0, height + 0.85, 0]}>
        <sphereGeometry args={[width * 0.56, 32, 16]} />
        <meshStandardMaterial color={accent} roughness={0.25} metalness={0.15} transparent opacity={0.75} />
      </mesh>
      <mesh position={[0, height * 0.35, 0]}>
        <torusGeometry args={[width * 0.32, 0.08, 16, 32]} />
        <meshStandardMaterial color={accent} roughness={0.25} metalness={0.1} />
      </mesh>
      <mesh position={[0, height * 0.55, 0]}>
        <torusGeometry args={[width * 0.22, 0.06, 16, 32]} />
        <meshStandardMaterial color={accent} roughness={0.25} metalness={0.1} />
      </mesh>
    </group>
  );
}

const trophyProfile = [
  new THREE.Vector2(0, 0),
  new THREE.Vector2(0.35, 0.1),
  new THREE.Vector2(0.45, 0.35),
  new THREE.Vector2(0.22, 0.55),
  new THREE.Vector2(0.15, 0.9),
  new THREE.Vector2(0.05, 1.1),
];

function AchievementsPlaza({ width, depth, accent }: { width: number; depth: number; accent: string }) {
  const pillarPositions: [number, number][] = [
    [-width / 2 + 0.6, -depth / 2 + 0.6],
    [width / 2 - 0.6, -depth / 2 + 0.6],
    [-width / 2 + 0.6, depth / 2 - 0.6],
    [width / 2 - 0.6, depth / 2 - 0.6],
  ];

  return (
    <group>
      {/* Raised stone platform */}
      <mesh castShadow receiveShadow position={[0, 0.35, 0]}>
        <boxGeometry args={[width, 0.7, depth]} />
        <meshStandardMaterial color="#d7c684" roughness={0.78} />
      </mesh>
      <mesh position={[0, 0.71, 0]}>
        <ringGeometry args={[width * 0.44, width * 0.5, 64]} />
        <meshStandardMaterial color="#a7863d" roughness={0.85} />
      </mesh>

      {/* Corner pillars with glowing caps */}
      {pillarPositions.map(([x, z], i) => (
        <group key={i} position={[x, 0.7, z]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.22, 0.26, 2.2, 10]} />
            <meshStandardMaterial color="#c9b483" roughness={0.6} />
          </mesh>
          <mesh position={[0, 1.25, 0]}>
            <sphereGeometry args={[0.24, 12, 12]} />
            <meshStandardMaterial
              color={accent}
              emissive={accent}
              emissiveIntensity={1.4}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}

      {/* Two award plaques flanking the entrance */}
      {[0.5, 1.4].map((x) => (
        <mesh key={x} castShadow position={[-1.2 + x, 1.55, depth / 2 - 1.2]}>
          <boxGeometry args={[0.5, 1.2, 0.3]} />
          <meshStandardMaterial color={accent} roughness={0.4} />
          <mesh position={[0, 1.1, 0]}>
            <boxGeometry args={[0.7, 0.18, 0.55]} />
            <meshStandardMaterial color={accent} roughness={0.3} metalness={0.4} />
          </mesh>
        </mesh>
      ))}

      {/* Central trophy monument, raised on its own dais */}
      <mesh castShadow receiveShadow position={[0, 0.85, -depth * 0.15]}>
        <cylinderGeometry args={[1.1, 1.3, 0.4, 16]} />
        <meshStandardMaterial color="#a7863d" roughness={0.7} />
      </mesh>
      <mesh castShadow position={[0, 2.05, -depth * 0.15]}>
        <latheGeometry args={[trophyProfile, 32]} />
        <meshStandardMaterial color={accent} roughness={0.3} metalness={0.4} />
      </mesh>
    </group>
  );
}

function ContactCafe({ width, height, depth, color, accent }: { width: number; height: number; depth: number; color: string; accent: string }) {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, height / 2 - 0.1, 0]}>
        <boxGeometry args={[width, height - 0.4, depth]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      <mesh castShadow position={[0, height - 0.15, depth / 2 + 0.05]} rotation={[0, 0, 0]}>
        <boxGeometry args={[width * 0.95, 0.2, 0.9]} />
        <meshStandardMaterial color={accent} roughness={0.45} />
      </mesh>
      <mesh castShadow position={[0, height - 0.35, depth / 2 + 0.62]} rotation={[Math.PI / 18, 0, 0]}>
        <boxGeometry args={[width * 0.96, 0.08, 0.28]} />
        <meshStandardMaterial color="#f7d9c1" roughness={0.5} />
      </mesh>
      {[-1.1, 1.1].map((x) => (
        <group key={x} position={[x, 0, depth / 2 + 1.3]}>
          <mesh castShadow position={[0, 0.55, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.5, 16]} />
            <meshStandardMaterial color="#5a3d2d" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.85, 0]}>
            <cylinderGeometry args={[0.45, 0.45, 0.08, 16]} />
            <meshStandardMaterial color="#7b5c47" roughness={0.75} />
          </mesh>
        </group>
      ))}
      {[-0.9, 0.9].map((x) => (
        <mesh key={x} position={[x, 0.92, depth / 2 + 1.3]}>
          <boxGeometry args={[0.2, 0.2, 0.02]} />
          <meshStandardMaterial color="#564037" roughness={0.8} />
        </mesh>
      ))}
      <mesh position={[0, height * 0.45, depth / 2 + 0.05]}>
        <boxGeometry args={[width * 0.6, 0.2, 0.1]} />
        <meshStandardMaterial color="#fff1e0" emissive={accent} emissiveIntensity={0.6} transparent opacity={0.95} />
      </mesh>
    </group>
  );
}

/**
 * Renders one low-poly building mass with custom roofs, glowing window strips,
 * and an entrance sign. Each location is driven by `data/sections.ts`.
 */
export default function Building({ def }: BuildingProps) {
  const markerRef = useRef<THREE.Mesh>(null);
  const isNearest = useGameStore((s) => s.nearestSection === def.id);
  const isVisited = useGameStore((s) => s.visited.has(def.id));

  useFrame(({ clock }) => {
    if (markerRef.current) {
      const pulse = 0.85 + Math.sin(clock.elapsedTime * 3) * 0.15;
      markerRef.current.scale.setScalar(isNearest ? pulse : 1);
      const mat = markerRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = isNearest ? 2.2 : isVisited ? 1.1 : 0.6;
    }
  });

  const [w, h, d] = def.size;
  const bodyMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: def.color, roughness: 0.72 }),
    [def.color]
  );

  const buildingShape = () => {
    switch (def.id) {
      case "projects":
        return (
          <group>
            <ProjectsCampus width={w} accent={def.accent} />
            <BuildingWindows width={w * 0.9} height={4.2} depth={d * 0.9} accent={def.accent} />
          </group>
        );
      case "certifications":
        return (
          <group>
            <CertificationsMuseum width={w} height={h} color={def.color} accent={def.accent} />
            <BuildingWindows width={w * 0.8} height={h * 0.7} depth={d * 0.9} accent={def.accent} />
          </group>
        );
      case "achievements":
        return (
          <group>
            <AchievementsPlaza width={w} depth={d} accent={def.accent} />
          </group>
        );
      case "contact":
        return (
          <group>
            <ContactCafe width={w} height={h} depth={d} color={def.color} accent={def.accent} />
            <BuildingWindows width={w * 0.8} height={h * 0.7} depth={d * 0.85} accent={def.accent} />
          </group>
        );
      default:
        // About / Experience — plain box body with a proper gabled roof.
        return (
          <group>
            <mesh castShadow receiveShadow position={[0, h / 2, 0]}>
              <boxGeometry args={[w, h, d]} />
              <primitive object={bodyMaterial} attach="material" />
            </mesh>
            <group position={[0, h, 0]}>
              <GableRoof width={w} depth={d} height={Math.min(w, d) * 0.55} color={def.accent} />
            </group>
            <BuildingWindows width={w} height={h} depth={d} accent={def.accent} />
          </group>
        );
    }
  };

  const extraHeight =
    def.id === "about" || def.id === "experience"
      ? Math.min(w, d) * 0.55
      : def.id === "certifications"
      ? h * 0.75
      : def.id === "achievements"
      ? 2.1
      : 0;
  const labelHeight = h + extraHeight + 1.2;
  const plateWidth = Math.max(2.6, def.label.length * 0.32 + 0.45);

  return (
    <group position={def.position} rotation={[0, def.rotation ?? 0, 0]}>
      <RigidBody type="fixed" colliders="cuboid">
        {buildingShape()}
      </RigidBody>

      <Billboard position={[0, labelHeight, 0]}>
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[plateWidth, 0.95]} />
          <meshStandardMaterial color="#11131a" transparent opacity={0.75} depthTest={false} />
        </mesh>
        <Text
          position={[0, 0, 0.05]}
          anchorX="center"
          anchorY="middle"
          fontSize={0.68}
          color="#f4efe4"
          outlineWidth={0.035}
          outlineColor="#150f26"
          renderOrder={20}
        >
          {def.label}
        </Text>
      </Billboard>

      <mesh
        ref={markerRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[def.markerOffset[0], 0.04, def.markerOffset[2]]}
      >
        <ringGeometry args={[1.1, 1.5, 32]} />
        <meshStandardMaterial
          color={def.accent}
          emissive={def.accent}
          emissiveIntensity={0.6}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
