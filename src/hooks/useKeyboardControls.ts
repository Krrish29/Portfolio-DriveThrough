import { useEffect, useRef } from "react";
import type { CarControlsState } from "../types";

const FORWARD_KEYS = ["KeyW", "ArrowUp"];
const BACKWARD_KEYS = ["KeyS", "ArrowDown"];
const LEFT_KEYS = ["KeyA", "ArrowLeft"];
const RIGHT_KEYS = ["KeyD", "ArrowRight"];
const BRAKE_KEYS = ["Space"];

export function useKeyboardControls() {
  const controls = useRef<CarControlsState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    brake: false,
  });

  useEffect(() => {
    const setKey = (code: string, value: boolean) => {
      if (FORWARD_KEYS.includes(code)) controls.current.forward = value;
      if (BACKWARD_KEYS.includes(code)) controls.current.backward = value;
      if (LEFT_KEYS.includes(code)) controls.current.left = value;
      if (RIGHT_KEYS.includes(code)) controls.current.right = value;
      if (BRAKE_KEYS.includes(code)) controls.current.brake = value;
    };

    const onKeyDown = (e: KeyboardEvent) => setKey(e.code, true);
    const onKeyUp = (e: KeyboardEvent) => setKey(e.code, false);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return controls;
}
