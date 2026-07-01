import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "../../hooks/useGameStore";
import { SECTION_CONTENT, BUILDINGS } from "../../data/sections";
import type { SectionId } from "../../types";

function SectionBody({ id }: { id: SectionId }) {
  const content = SECTION_CONTENT[id];

  if (id === "about") {
    return (
      <div className="space-y-5">
        <p className="text-sm leading-relaxed font-[var(--font-body)]" style={{ color: "var(--color-ink)" }}>
          {content.intro}
        </p>
      </div>
    );
  }

  if (id === "projects") {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {content.projects?.map((p) => (
          <div key={p.title} className="glass-panel rounded-xl p-4 flex flex-col gap-2">
            <h3 className="font-[var(--font-display)] text-base" style={{ color: "var(--color-glow)" }}>
              {p.title}
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
              {p.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {p.tech.map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5" style={{ color: "var(--color-ink)" }}>
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-3 mt-2">
              {p.github && (
                <a href={p.github} target="_blank" rel="noreferrer" className="text-xs underline" style={{ color: "var(--color-accent)" }}>
                  GitHub
                </a>
              )}
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noreferrer" className="text-xs underline" style={{ color: "var(--color-accent)" }}>
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (id === "experience") {
    return (
      <div className="space-y-4">
        {content.experience?.map((e) => (
          <div key={e.role} className="glass-panel rounded-xl p-4">
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <div>
                <h3 className="font-[var(--font-display)] text-base" style={{ color: "var(--color-glow)" }}>
                  {e.role} · {e.org}
                </h3>
                {e.projectUrl && (
                  <a href={e.projectUrl} target="_blank" rel="noreferrer" className="text-xs underline" style={{ color: "var(--color-accent)" }}>
                    Project Link
                  </a>
                )}
              </div>
              <span className="text-xs font-[var(--font-mono)]" style={{ color: "var(--color-muted)" }}>
                {e.timeline}
              </span>
            </div>
            <ul className="mt-2 space-y-1 list-disc pl-4">
              {e.responsibilities.map((r) => (
                <li key={r} className="text-xs leading-relaxed" style={{ color: "var(--color-ink)" }}>
                  {r}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {e.tech.map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5" style={{ color: "var(--color-ink)" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (id === "certifications") {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {content.certifications?.map((c) => (
          <div key={c.name} className="glass-panel rounded-xl p-4">
            <h3 className="text-sm font-medium" style={{ color: "var(--color-glow)" }}>
              {c.name}
            </h3>
            <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
              {c.issuer} · {c.date}
            </p>
          </div>
        ))}
      </div>
    );
  }

  if (id === "achievements") {
    return (
      <div className="space-y-3">
        {content.achievements?.map((a) => (
          <div key={a.title} className="glass-panel rounded-xl p-4 flex items-start gap-3">
            <span style={{ color: "var(--color-glow)" }}>🏆</span>
            <div>
              <h3 className="text-sm font-medium" style={{ color: "var(--color-ink)" }}>
                {a.title}
              </h3>
              <p className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>
                {a.detail}
              </p>
              {a.url && (
                <a
                  href={a.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs mt-2 inline-block underline"
                  style={{ color: "var(--color-accent)" }}
                >
                  IEEE Link
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (id === "contact") {
    return (
      <div className="space-y-4">
        <p className="text-sm" style={{ color: "var(--color-ink)" }}>
          Always happy to talk software, ML, or over-engineered portfolio websites.
        </p>
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${content.email}`}
              className="text-sm font-semibold rounded-full px-4 py-2"
              style={{ background: "rgba(114,137,245,0.12)", color: "#8da2ff" }}
            >
              Gmail
            </a>
            {content.github && (
              <a
                href={content.github}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold rounded-full px-4 py-2"
                style={{ background: "rgba(82,211,199,0.12)", color: "var(--color-accent)" }}
              >
                GitHub
              </a>
            )}
            {content.linkedin && (
              <a
                href={content.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold rounded-full px-4 py-2"
                style={{ background: "rgba(255,201,120,0.12)", color: "var(--color-sunset)" }}
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default function SectionPanel() {
  const activePanel = useGameStore((s) => s.activePanel);
  const closePanel = useGameStore((s) => s.closePanel);
  const building = BUILDINGS.find((b) => b.id === activePanel);

  return (
    <AnimatePresence>
      {activePanel && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center p-6"
          style={{ background: "rgba(10,6,20,0.45)", backdropFilter: "blur(4px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closePanel}
        >
          <motion.div
            className="glass-panel glass-panel-glow rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto panel-scroll p-6 sm:p-8"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-5">
              <h2 className="font-[var(--font-display)] text-2xl" style={{ color: "var(--color-glow)" }}>
                {building?.label}
              </h2>
              <button
                onClick={closePanel}
                className="text-xs px-3 py-1.5 rounded-full border"
                style={{ color: "var(--color-muted)", borderColor: "rgba(255,255,255,0.12)" }}
              >
                Esc · Close
              </button>
            </div>
            {activePanel && <SectionBody id={activePanel} />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
