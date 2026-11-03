'use client';

import {useEffect, useRef, type CSSProperties} from 'react';
import styles from './interactive-grid-background.module.css';

type GridProps = {
  cellSize?: number;
  color?: string;
  intensity?: number;
  glowRadius?: number;
  interactive?: boolean;
  className?: string;
};

/** Decorative first child of a positioned section; events stay on its parent. */
export function InteractiveGridBackground({
  cellSize = 48,
  color = 'var(--cyan)',
  intensity = 1,
  glowRadius = 280,
  interactive = true,
  className,
}: GridProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const host = root?.parentElement;
    if (!root || !host || !interactive) return;
    const hover = matchMedia('(any-hover: hover) and (any-pointer: fine)');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let x = 0;
    let y = 0;
    let lastPointer: {x: number; y: number} | null = null;
    const leave = () => {
      lastPointer = null;
      root.dataset.active = 'false';
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const paint = () => {
      frame = 0;
      root.style.setProperty('--mouse-x', `${x}px`);
      root.style.setProperty('--mouse-y', `${y}px`);
      root.dataset.active = 'true';
    };
    const position = () => {
      if (!lastPointer) return;
      const rect = host.getBoundingClientRect();
      x = lastPointer.x - rect.left;
      y = lastPointer.y - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return leave();
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || !hover.matches || reduced.matches) return;
      lastPointer = {x: event.clientX, y: event.clientY};
      position();
    };
    host.addEventListener('pointerenter', move, {passive: true});
    host.addEventListener('pointermove', move, {passive: true});
    host.addEventListener('pointerleave', leave);
    host.addEventListener('pointercancel', leave);
    window.addEventListener('scroll', position, {passive: true, capture: true});
    window.addEventListener('blur', leave);
    hover.addEventListener('change', leave);
    reduced.addEventListener('change', leave);
    return () => {
      leave();
      host.removeEventListener('pointerenter', move);
      host.removeEventListener('pointermove', move);
      host.removeEventListener('pointerleave', leave);
      host.removeEventListener('pointercancel', leave);
      window.removeEventListener('scroll', position, true);
      window.removeEventListener('blur', leave);
      hover.removeEventListener('change', leave);
      reduced.removeEventListener('change', leave);
    };
  }, [interactive]);

  const vars = {
    '--cell-size': `${cellSize}px`,
    '--grid-color': color,
    '--grid-intensity': intensity,
    '--glow-radius': `${glowRadius}px`,
  } as CSSProperties;

  return <div ref={rootRef} className={`${styles.root}${className ? ` ${className}` : ''}`} style={vars} aria-hidden="true" data-interactive-grid data-active="false">
    <div className={styles.base}/>
    <div className={styles.glow}/>
    <div className={styles.illumination}/>
  </div>;
}
