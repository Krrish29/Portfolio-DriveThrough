# Portfolio Drive 🚗

A driving-game portfolio — visitors drive a car through a small open world and
explore each part of the portfolio by parking at a building.

**Stack:** React + Vite + TypeScript, React Three Fiber, Drei, Rapier physics,
Tailwind CSS v4, Framer Motion, GSAP-ready.

---

## Quick start

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`). Click **Start
Engine** on the loading screen, then drive with `WASD` / arrow keys, `Space`
to brake, `E` to enter a building, `Esc` to close a panel.

```bash
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

> The Sky/Environment/Text components (`@react-three/drei`) fetch small HDR
> and font assets from a CDN at runtime, so an internet connection is needed
> the first time the page loads in a browser (they're cached after that).

---

## Recent updates

These improvements were made in the latest development pass:

- **Speedometer redesign**: switched to a true dial gauge with a needle,
  color-coded speed zones, and a cleaner overlay-free visual style.
- **HUD/mobile polish**: refined the in-game HUD layout so the speedometer and
  controls are better positioned on smaller screens.
- **Landing screen restoration**: returned the richer purple landing look and
  improved the start button styling.
- **Copy updates**: corrected contact section text and certification year
  content in `src/data/sections.ts` and `src/components/ui/SectionPanel.tsx`.
- **NPCs**: added animated pedestrian walkers in `src/components/world/Pedestrians.tsx`
  and wired them into the scene in `src/scenes/Experience.tsx`.
- **Validation**: verified the project builds successfully with
  `npm run build` after the polish work.

## What's implemented

- **Driving**: acceleration, braking, reverse, speed-sensitive steering,
  visual body tilt, wheel spin + front-wheel steer, headlights, brake lights.
- **Camera**: smooth third-person follow with frame-rate-independent damping
  and a subtle FOV "zoom" while accelerating.
- **World**: procedural road loop + sidewalks + lane markings, low-poly
  instanced trees with collision, a lake, distant mountains, streetlights,
  dusk skybox, fog, bloom + vignette post-processing.
- **Locations**: About, Projects, Experience, Certifications, Achievements,
  Contact — each a data-driven building. Get close and press `E` to open a
  glassmorphism panel with that section's content (background blurs, `Esc`
  closes it).
- **HUD**: circular minimap (car heading + building markers), speedometer,
  current-location readout, controls legend, "press E" prompt, sound toggle.
- **Content**: pre-filled from your resume/portfolio history — internship,
  projects (ArchitectAI, Telecom Recommender, WeatherBot, Sign Language
  Converter), certifications, IEEE publication, skills.

## What's intentionally left as extension points

This spec is huge — rather than half-implement 40 features, the codebase is
structured so the big-ticket remaining items are additive, not rewrites:

- **Real 3D models / GLB assets** — car, trees, and buildings are stylized
  low-poly primitives right now (looks intentionally "indie game," not
  unfinished). Swap any mesh for a loaded `.glb` via `useGLTF` without
  touching surrounding logic.
- **Real audio** — `AudioManager.tsx` has a working Web Audio engine-hum +
  ambient pad and a volume toggle wired to speed; swap the oscillators for
  real `<audio>`/sample playback when you have sound design.
- **Bonus features not built**: day/night cycle, weather, photo mode,
  collectibles, NPCs, pause menu, confetti-on-full-visit. `visited: Set` in
  `useGameStore.ts` already tracks which sections have been opened, so
  "confetti when all locations visited" is a `useEffect` watching that set's
  size away from being done.
- **Resume file** — `About` panel links to `/resume.pdf`; drop your PDF in
  `public/resume.pdf`.
- **LinkedIn URL** — placeholder empty string in `src/data/sections.ts`.

## Adding a new location

Everything about a building — position, size, colors, trigger radius, and
panel content — lives in one file: `src/data/sections.ts`. Add a `BuildingDef`
to `BUILDINGS` and a matching entry to `SECTION_CONTENT`; `Building.tsx` and
`SectionPanel.tsx` render generically from that data, so no other file needs
to change.

## Folder structure

```
src/
  components/
    world/      Ground, Road, Sky/Lights, Trees, Lake, Mountains, StreetLights, Boundaries
    car/        Car (physics + visuals), CameraRig
    buildings/  Building (generic, data-driven), Buildings (renders all)
    ui/         LoadingScreen, HUD, Minimap, Speedometer, LocationDisplay,
                ControlsHint, EnterPrompt, SectionPanel, AudioManager
  hooks/        useKeyboardControls, useGameStore (zustand), useProximity
  scenes/       Experience.tsx (assembles the whole 3D scene)
  data/         sections.ts — single source of truth for content + layout
  constants/    world.ts — car/camera/world tuning knobs
  types/        shared TypeScript types
```

## Tuning

Feel free to hand-tune the driving feel and camera in
`src/constants/world.ts` — max speed, acceleration, steering authority,
camera follow distance/damping — without touching any component logic.
