import { useEffect, useRef } from "react";
import { useGameStore } from "../../hooks/useGameStore";

export default function AudioManager() {
  const audioEnabled = useGameStore((s) => s.audioEnabled);
  const ctxRef = useRef<AudioContext | null>(null);
  const engineGainRef = useRef<GainNode | null>(null);
  const engineOscRef = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    if (!audioEnabled) return;
    const ctx = new AudioContext();
    ctxRef.current = ctx;

    const pad = ctx.createOscillator();
    pad.type = "sine";
    pad.frequency.value = 110;
    const padGain = ctx.createGain();
    padGain.gain.value = 0.015;
    pad.connect(padGain).connect(ctx.destination);
    pad.start();

    const engine = ctx.createOscillator();
    engine.type = "sawtooth";
    engine.frequency.value = 60;
    const engineGain = ctx.createGain();
    engineGain.gain.value = 0.0;
    engine.connect(engineGain).connect(ctx.destination);
    engine.start();
    engineOscRef.current = engine;
    engineGainRef.current = engineGain;

    const unsubSpeed = useGameStore.subscribe((state) => {
      const speedNorm = Math.min(state.speedKmh / 80, 1);
      if (engineGainRef.current) engineGainRef.current.gain.value = 0.02 + speedNorm * 0.05;
      if (engineOscRef.current) engineOscRef.current.frequency.value = 55 + speedNorm * 140;
    });

    let lastShowConfetti = useGameStore.getState().showConfetti;
    const unsubConfetti = useGameStore.subscribe((state) => {
      const currentShowConfetti = state.showConfetti;
      if (!lastShowConfetti && currentShowConfetti) {
        const click = ctx.createOscillator();
        click.type = "triangle";
        click.frequency.value = 880;
        const clickGain = ctx.createGain();
        clickGain.gain.setValueAtTime(0, ctx.currentTime);
        clickGain.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 0.008);
        clickGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
        click.connect(clickGain).connect(ctx.destination);
        click.start();
        click.stop(ctx.currentTime + 0.3);
      }
      lastShowConfetti = currentShowConfetti;
    });

    return () => {
      unsubSpeed();
      unsubConfetti();
      pad.stop();
      engine.stop();
      ctx.close();
    };
  }, [audioEnabled]);

  return null;
}

export function AudioToggle() {
  const audioEnabled = useGameStore((s) => s.audioEnabled);
  const toggleAudio = useGameStore((s) => s.toggleAudio);

  return (
    <button
      onClick={toggleAudio}
      className="glass-panel rounded-full w-11 h-11 flex items-center justify-center text-lg"
      style={{ color: "var(--color-ink)" }}
      aria-label="Toggle sound"
      title="Toggle sound"
    >
      {audioEnabled ? "🔊" : "🔇"}
    </button>
  );
}
