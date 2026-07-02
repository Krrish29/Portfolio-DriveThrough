# 🚗 Portfolio Drive

> Most portfolios ask you to scroll. This one asks you to *drive.*

Welcome to Krrish City — a tiny open world you explore behind the wheel of a low-poly car with questionable insurance. No scrollbars, no boring "About" tab at the top of the page. Just roads, buildings, and a "Press E" prompt standing between you and my résumé.

Built because a normal portfolio felt like reading a spec sheet, and this one felt like a lot more fun to build (and hopefully to visit).

---

## 🎮 Play it

```bash
npm install
npm run dev
```

Open the local URL it prints (usually `http://localhost:5173`), hit **Start Engine**, and go make some bad driving decisions.

```bash
npm run build      # ship it
npm run preview    # take the shipped version for a spin locally
```

> Heads up: a couple of pieces (the sky, fonts, HDR lighting) grab tiny assets from a CDN on first load. Bring internet the first time — after that it's cached.

---

## 🕹️ Controls

| Key | Does what you'd expect |
|---|---|
| `W` / `↑` | Go |
| `S` / `↓` | Whoops, wrong way — reverse |
| `A` `D` / `← →` | Steer |
| `Space` | Actual brakes (novel concept) |
| `E` | Walk into a building without leaving the car |
| `Esc` | Get out of a panel, back to the road |

No tutorial needed. If you've ever played literally any driving game, you already know how this goes.

---

## What's in the city

- **Driving that actually feels like driving** — real acceleration/braking/reverse, speed-sensitive steering, body tilt in corners, spinning wheels, headlights, brake lights. It's arcade-physics, not a simulator, but it's *responsive*.
- **A camera that behaves** — smooth third-person chase cam that never fights you, with a subtle FOV zoom when you floor it for that cheap-but-effective "going fast" feeling.
- **A world with actual atmosphere** — a road loop connecting every building, sidewalks, lane markings, low-poly trees you can crash into, a lake, mountains on the horizon, streetlights, dusk sky, fog, pedestrians wandering around, and bloom/vignette post-processing so it doesn't look like a CAD render.
- **Six buildings, six sections** — About, Projects, Experience, Certifications, Achievements, and Contact are all real locations. Park near one, press `E`, and a glassmorphism panel slides open with that section's content while the world blurs behind it.
- **A HUD that looks like it belongs in a game** — circular minimap, dial-gauge speedometer with a needle, current-location readout, controls legend, a "press E" prompt when you're near something, and a sound toggle.
- **A loading screen that isn't just a spinner** — staggered title reveal, drifting ambient glow, a shimmering progress bar with a little scrolling road-dash motif underneath, because even the loading screen should feel like part of the drive.
- **Real content, not lorem ipsum** — actual internship, actual projects (ArchitectAI, a telecom recommender, WeatherBot, a sign-language converter), actual certifications, an actual IEEE paper. This is a résumé wearing a video game as a costume.


---

## Adding a new building

You don't touch any 3D code to add a new location. One file, `src/data/sections.ts`, is the single source of truth — position, size, color, how close you need to be, *and* the panel content. Add one `BuildingDef` + one `SECTION_CONTENT` entry and it just appears in the world, fully wired up.

---

## 📁 Folder structure

```
src/
├── components/
│   ├── world/       Ground, Road, Sky/Lights, Trees, Lake, Mountains,
│   │                 StreetLights, Boundaries, Pedestrians
│   ├── car/         Car (physics + visuals), CameraRig
│   ├── buildings/   Building (generic, data-driven), Buildings (renders all)
│   └── ui/          LoadingScreen, HUD, Minimap, Speedometer,
│                     LocationDisplay, ControlsHint, EnterPrompt,
│                     SectionPanel, AudioManager
├── hooks/           useKeyboardControls, useGameStore (zustand), useProximity
├── scenes/          Experience.tsx — the whole 3D world, assembled
├── data/            sections.ts — content + layout, all in one place
├── constants/       world.ts — every tuning knob for the car/camera/world
└── types/           shared TypeScript types
```

---

*Built by Krrish Garg, who apparently would rather build a driving game than write a bullet-point list.*
