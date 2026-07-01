/** Central place to tune the feel of the world & car — change values
 *  here rather than hunting through components. */

export const WORLD = {
  boundsHalfExtent: 90,
  groundColor: "#2f5233",
  roadColor: "#2a2436",
  roadWidth: 8,
  fogColor: "#3a2b52",
  fogNear: 30,
  fogFar: 140,
};

export const CAR_TUNING = {
  maxSpeed: 22,
  maxReverseSpeed: 10,
  acceleration: 14,
  brakeForce: 26,
  reverseAcceleration: 8,
  drag: 3.2,
  steerSpeed: 2.6,
  maxSteerAtSpeed: 0.55,
  bodyMass: 180,
  tiltAmount: 0.12,
  /** Speed (m/s) + steer input above which a hard brake/turn leaves skid marks. */
  skidMinSpeed: 8,
};

export const CAMERA_TUNING = {
  followDistance: 8.5,
  followHeight: 3.6,
  lookHeight: 1.2,
  damping: 4.5,
  fov: 55,
  zoomFov: 62,
  /** Right-drag orbit tuning */
  orbitSensitivity: 0.006,
  orbitMaxPitch: 0.55, // radians up/down from level
  orbitMinPitch: -0.15,
  orbitBlendBack: 3.2, // damping speed when returning to chase cam
  /** Scroll-wheel zoom tuning */
  zoomMin: 4.5, // closest follow distance
  zoomMax: 16, // furthest follow distance
  zoomSpeed: 0.9, // distance units per wheel notch
};

export const PROXIMITY = {
  panelCloseKeys: ["Escape"],
};

export const DAY_NIGHT = {
  dusk: {
    sunPosition: [-40, 12, -60] as [number, number, number],
    fogColor: "#3a2b52",
    fogFar: 140,
    bgColor: "#150f26",
    keyColor: "#ffb374",
    keyIntensity: 2.4,
    hemiSky: "#7b6ba8",
    hemiGround: "#241a3a",
    hemiIntensity: 0.6,
    envIntensity: 0.5,
  },
  night: {
    // Softer night lighting for less contrast and better legibility.
    sunPosition: [-60, 8, -80] as [number, number, number],
    fogColor: "#1c2140",
    fogFar: 130,
    bgColor: "#0c0b1c",
    keyColor: "#7c8ce0",
    keyIntensity: 0.95,
    hemiSky: "#5b6aa7",
    hemiGround: "#1a1e33",
    hemiIntensity: 0.45,
    envIntensity: 0.2,
  },
};