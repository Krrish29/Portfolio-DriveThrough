import { create } from "zustand";
import { BUILDINGS } from "../data/sections";
import type { SectionId } from "../types";

export type TimeOfDay = "dusk" | "night";

interface ToastItem {
  id: number;
  message: string;
}

interface GameState {
  hasLoaded: boolean;
  setHasLoaded: (v: boolean) => void;

  /** True once the one-time intro flythrough has finished and control
   *  has been handed to the player. */
  introDone: boolean;
  setIntroDone: (v: boolean) => void;

  speedKmh: number;
  setSpeedKmh: (v: number) => void;

  carPosition: [number, number];
  setCarPosition: (v: [number, number]) => void;
  carHeading: number;
  setCarHeading: (v: number) => void;

  nearestSection: SectionId | null;
  setNearestSection: (v: SectionId | null) => void;

  activePanel: SectionId | null;
  openPanel: (v: SectionId) => void;
  closePanel: () => void;

  visited: Set<SectionId>;
  markVisited: (v: SectionId) => void;

  audioEnabled: boolean;
  toggleAudio: () => void;

  timeOfDay: TimeOfDay;
  toggleTimeOfDay: () => void;

  toasts: ToastItem[];
  pushToast: (message: string) => void;
  dismissToast: (id: number) => void;

  showConfetti: boolean;
  dismissConfetti: () => void;

  /** True while the car is braking hard or steering sharply at speed —
   *  drives skid-mark decals on the road. */
  isSkidding: boolean;
  setIsSkidding: (v: boolean) => void;

  coinCount: number;
  collectCoin: () => void;

  sessionTimeSeconds: number;
  communityTimeSeconds: number;
  loadCommunityTime: (seconds: number) => void;
  addCommunitySeconds: (seconds: number) => void;
}

const TOTAL_LOCATIONS = 6; // about, projects, experience, certifications, achievements, contact
let toastId = 0;

export const useGameStore = create<GameState>((set, get) => ({
  hasLoaded: false,
  setHasLoaded: (v) => set({ hasLoaded: v }),

  introDone: false,
  setIntroDone: (v) => set({ introDone: v }),

  speedKmh: 0,
  setSpeedKmh: (v) => set({ speedKmh: v }),

  carPosition: [0, 0],
  setCarPosition: (v) => set({ carPosition: v }),
  carHeading: 0,
  setCarHeading: (v) => set({ carHeading: v }),

  nearestSection: null,
  setNearestSection: (v) => set({ nearestSection: v }),

  activePanel: null,
  openPanel: (v) => {
    const wasVisited = get().visited.has(v);
    get().markVisited(v);
    set({ activePanel: v });
    if (!wasVisited) {
      const building = BUILDINGS.find((b) => b.id === v);
      const label = building?.label ?? `${v.charAt(0).toUpperCase()}${v.slice(1)}`;
      if (get().visited.size >= TOTAL_LOCATIONS) {
        get().pushToast("Congrats — all locations complete!");
        set({ showConfetti: true });
      } else {
        get().pushToast(`Location unlocked: ${label}`);
      }
    }
  },
  closePanel: () => set({ activePanel: null }),

  visited: new Set(),
  markVisited: (v) =>
    set((state) => {
      const next = new Set(state.visited);
      next.add(v);
      return { visited: next };
    }),

  audioEnabled: false,
  toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),

  timeOfDay: "dusk",
  toggleTimeOfDay: () =>
    set((state) => ({ timeOfDay: state.timeOfDay === "dusk" ? "night" : "dusk" })),

  coinCount: 0,
  collectCoin: () =>
    set((state) => {
      return { coinCount: state.coinCount + 1 };
    }),

  sessionTimeSeconds: 0,
  communityTimeSeconds: 0,
  loadCommunityTime: (seconds) => set({ communityTimeSeconds: seconds }),
  addCommunitySeconds: (seconds) =>
    set((state) => {
      const next = state.communityTimeSeconds + seconds;
      if (typeof window !== "undefined") {
        window.localStorage.setItem("communityTimeSeconds", next.toString());
      }
      return {
        communityTimeSeconds: next,
        sessionTimeSeconds: state.sessionTimeSeconds + seconds,
      };
    }),

  toasts: [],
  pushToast: (message) => {
    const id = ++toastId;
    set((state) => ({ toasts: [...state.toasts, { id, message }] }));
    setTimeout(() => get().dismissToast(id), 3200);
  },
  dismissToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),

  showConfetti: false,
  dismissConfetti: () => set({ showConfetti: false }),

  isSkidding: false,
  setIsSkidding: (v) => set({ isSkidding: v }),
}));

export const TOTAL_LOCATION_COUNT = TOTAL_LOCATIONS;
