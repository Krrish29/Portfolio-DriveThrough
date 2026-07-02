# 🚗 Portfolio Drive

An immersive **3D interactive portfolio** built with **React**, **Three.js**, and **React Three Fiber** that lets visitors explore my work by driving through a virtual city. Instead of navigating a traditional portfolio website, users experience projects, skills, certifications, and contact information in an engaging game-like environment.

## 🌐 Live Demo

**Website:** *https://itzkrrish.vercel.app/*

---

# Features

### 🚗 Interactive Driving Experience

* Drive a 3D vehicle through a custom-built environment.
* Smooth keyboard controls for desktop users.
* Mobile-friendly touch controls.
* Real-time speedometer with animated gauge.

### 🌍 Immersive 3D Environment

* Procedurally designed roads and city layout.
* Buildings, trees, streetlights, and environmental assets.
* Animated NPC pedestrians for a more realistic world.
* Optimized scene rendering for smooth performance.

### Interactive Portfolio Sections

Drive close to different locations to explore:

* About Me
* Projects
* Skills
* Certifications
* Contact Information

Each section opens an interactive information panel inside the experience.

### Modern User Interface

* Responsive HUD
* Realistic speedometer
* Clean overlays
* Dark-themed landing screen
* Mobile-optimized layout

### Performance Optimizations

* Lightweight procedural animations
* Optimized React component structure
* Efficient rendering using React Three Fiber
* Production-ready Vite build

---

# Tech Stack

### Frontend

* React
* TypeScript
* Vite

### 3D Graphics

* Three.js
* React Three Fiber
* Drei

### Styling

* CSS
* Responsive Design

### Deployment

* GitHub
* Vercel

---

# Project Structure

```text
src/
├── components/
│   ├── Experience.tsx
│   ├── HUD.tsx
│   ├── LoadingScreen.tsx
│   ├── Pedestrians.tsx
│   ├── SectionPanel.tsx
│   ├── Speedometer.tsx
│   └── ...
├── data/
│   └── sections.ts
├── App.tsx
└── main.tsx
```

---

# Getting Started

## Clone the Repository

```bash
git clone https://github.com/Krrish29/Portfolio-DriveThrough.git
```

```bash
cd Portfolio-DriveThrough
```

## Install Dependencies

```bash
npm install
```

## Run the Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:5173
```

---

# Build for Production

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

# 🎮 Controls

## Desktop

| Action          | Key   |
| --------------- | ----- |
| Accelerate      | W / ↑ |
| Brake / Reverse | S / ↓ |
| Turn Left       | A / ← |
| Turn Right      | D / → |

## Mobile

* Use the on-screen driving controls.
* Drive near portfolio markers to open different sections.

---

# License

This project is licensed under the MIT License.

