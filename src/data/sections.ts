import type { BuildingDef, SectionContent, SectionId } from "../types";

/**
 * Every location in the world is defined once, here.
 * To add a new building/section later: add a `BuildingDef` below and a
 * matching `SectionContent` entry — nothing else in the codebase needs to
 * change, Building.tsx and SectionPanel.tsx render generically from this data.
 */

export const BUILDINGS: BuildingDef[] = [
  {
    id: "about",
    label: "About Me",
    position: [-22, 0, -18],
    rotation: 0.3,
    size: [6, 4, 6],
    color: "#e0a458",
    accent: "#8c5a2b",
    triggerRadius: 6,
    markerOffset: [0, 0, 6],
  },
  {
    id: "projects",
    label: "Projects",
    position: [24, 0, -20],
    rotation: -0.2,
    size: [10, 9, 8],
    color: "#5c7a8a",
    accent: "#2f4550",
    triggerRadius: 8,
    markerOffset: [0, 0, 7],
  },
  {
    id: "experience",
    label: "Experience",
    position: [26, 0, 18],
    rotation: 0.15,
    size: [8, 7, 7],
    color: "#7a6a8c",
    accent: "#4a3f5c",
    triggerRadius: 7,
    markerOffset: [0, 0, 6],
  },
  {
    id: "certifications",
    label: "Certifications",
    position: [-26, 0, 20],
    rotation: -0.35,
    size: [7, 6, 7],
    color: "#9fd8d3",
    accent: "#4a8f88",
    triggerRadius: 7,
    markerOffset: [0, 0, 6],
  },
  {
    id: "achievements",
    label: "Achievements",
    position: [0, 0, -34],
    size: [9, 2, 9],
    color: "#caa24a",
    accent: "#7a5a1e",
    triggerRadius: 8,
    markerOffset: [0, 0, 8],
  },
  {
    id: "contact",
    label: "Contact",
    position: [0, 0, 30],
    size: [7, 5, 6],
    color: "#c96a4d",
    accent: "#7a3a28",
    triggerRadius: 7,
    markerOffset: [0, 0, 6],
  },
];

export const SECTION_CONTENT: Record<SectionId, SectionContent> = {
  home: {
    intro:
      "Welcome — drive through the world to explore. Head to any building to open that part of the portfolio.",
  },
  about: {
    intro:
      "Hi, I'm Krrish Garg. I'm passionate about software development and AI/ML applications, and I enjoy building solutions that solve real-world problems. Outside of tech, I love gaming and sketching, and I tackle every new project, framework, or collaboration as a chance to learn and make an impact.",
  },
  projects: {
    projects: [
      {
        title: "ArchitectAI",
        description:
          "A multi-agent architecture generator that coordinates planning and API-design agents with FastAPI and React.",
        tech: ["FastAPI", "React", "Ollama", "Qwen2.5", "Pydantic"],
        github: "https://github.com/Krrish29/ArchitectAI",
      },
      {
        title: "Telecom Plan Recommendation System",
        description:
          "An AI-powered telecom customer intelligence platform for segmentation, churn detection, anomaly detection, and personalised plan recommendations.",
        tech: ["Python", "Scikit-learn", "Pandas"],
        github: "https://github.com/Krrish29/Telecom-Plan-Recommendation-System",
      },
      {
        title: "WeatherBot",
        description:
          "A conversational weather assistant built with LangChain4j, Groq Llama 3.1, and OpenWeatherMap APIs.",
        tech: ["Java", "LangChain4j", "Groq Llama 3.1"],
        github: "https://github.com/Krrish29/WeatherBot",
      },
      {
        title: "AI-Driven Sign Language Converter",
        description:
          "A live sign language translation system using ASR and NLP, published in IEEE Xplore.",
        tech: ["Python", "Computer Vision", "Deep Learning"],
        github: "https://github.com/Krrish29/An-AI-Driven-Sign-Language-Converter-using-ASR-and-NLP",
      },
    ],
  },
  experience: {
    experience: [
      {
        role: "Software Engineering Intern",
        org: "INCEDO",
        timeline: "Jan 2026 – Jun 2026",
        responsibilities: [
          "Built an AI-powered telecom customer intelligence platform with customer segmentation, churn prediction, anomaly detection, and personalised plan recommendations using 4 ML models (K-Means, Isolation Forest, XGBoost, KNN).",
          "Designed a microservices architecture with Spring Boot, FastAPI, and ReactJS; JWT-secured REST APIs and Eureka service discovery.",
          "Delivered Admin and User dashboards with real-time analytics, plan management, and recommendation visualisation for distinct user roles.",
        ],
        tech: ["Spring Boot", "FastAPI", "ReactJS", "JWT", "Eureka"],
        projectUrl: "https://github.com/Krrish29/Telecom-Plan-Recommendation-System",
      },
    ],
  },
  certifications: {
    certifications: [
      { name: "AWS Certified AI Practitioner (AIF-C01)", issuer: "Amazon Web Services", date: "2025" },
      { name: "Oracle Cloud Infrastructure Certification", issuer: "Oracle", date: "2025" },
    ],
  },
  achievements: {
    achievements: [
      {
        title: "IEEE Xplore Publication",
        detail: "AI-Driven Sign Language Converter — published January 2025.",
        url: "https://ieeexplore.ieee.org/document/11209154",
      },
    ],
  },
  contact: {
    email: "krrishgarg4@gmail.com",
    github: "https://github.com/Krrish29",
    linkedin: "https://www.linkedin.com/in/krrish-garg-17ba90255/",
  },
};
