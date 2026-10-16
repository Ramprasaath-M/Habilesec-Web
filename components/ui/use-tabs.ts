"use client";
import { useCallback, useRef, type KeyboardEvent } from "react";

/**
 * Roving-tabindex keyboard support for a WAI-ARIA tablist.
 * Arrow keys move and activate, Home/End jump to the ends.
 */
export function useTabKeys(
  count: number,
  setActive: (i: number) => void,
  orientation: "horizontal" | "vertical" = "vertical",
) {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const onKeyDown = useCallback(
    (e: KeyboardEvent, i: number) => {
      const next = orientation === "vertical" ? "ArrowDown" : "ArrowRight";
      const prev = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
      let target = -1;
      if (e.key === next) target = (i + 1) % count;
      else if (e.key === prev) target = (i - 1 + count) % count;
      else if (e.key === "Home") target = 0;
      else if (e.key === "End") target = count - 1;
      if (target < 0) return;
      e.preventDefault();
      setActive(target);
      refs.current[target]?.focus();
    },
    [count, orientation, setActive],
  );
  const setRef = useCallback(
    (i: number) => (el: HTMLElement | null) => {
      refs.current[i] = el;
    },
    [],
  );
  return { onKeyDown, setRef };
}
