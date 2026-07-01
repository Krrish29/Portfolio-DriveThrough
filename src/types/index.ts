import type { ReactNode } from "react";

export type SectionId =
  | "home"
  | "about"
  | "projects"
  | "experience"
  | "certifications"
  | "achievements"
  | "contact";

export interface Vec3Tuple {
  0: number;
  1: number;
  2: number;
}

export interface BuildingDef {
  id: SectionId;
  label: string;
  position: [number, number, number];
  rotation?: number;
  size: [width: number, height: number, depth: number];
  color: string;
  accent: string;
  triggerRadius: number;
  markerOffset: [number, number, number];
}

export interface ProjectEntry {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
}

export interface ExperienceEntry {
  role: string;
  org: string;
  timeline: string;
  responsibilities: string[];
  tech: string[];
  projectUrl?: string;
}

export interface CertificationEntry {
  name: string;
  issuer: string;
  date: string;
}

export interface AchievementEntry {
  title: string;
  detail: string;
  url?: string;
}

export interface SectionContent {
  intro?: string;
  photoUrl?: string;
  skills?: string[];
  resumeUrl?: string;
  projects?: ProjectEntry[];
  experience?: ExperienceEntry[];
  certifications?: CertificationEntry[];
  achievements?: AchievementEntry[];
  email?: string;
  linkedin?: string;
  github?: string;
}

export interface CarControlsState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  brake: boolean;
}

export interface HudSnapshot {
  speedKmh: number;
  currentLocation: string;
  nearestSection: SectionId | null;
}

export interface PanelProps {
  children?: ReactNode;
}
