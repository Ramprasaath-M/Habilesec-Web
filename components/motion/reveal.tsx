"use client";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Kind = "rise" | "fade" | "mask" | "line" | "grow";

type RevealProps = {
  as?: "div" | "p" | "li" | "span" | "figure" | "section" | "h2" | "h3";
  kind?: Kind;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

/**
 * Scroll reveal that keeps content visible without JS and on first paint.
 * Only elements that start below the fold are hidden, then revealed once.
 * Reduced-motion users never enter the hidden state.
 */
export function Reveal({
  as = "div",
  kind = "rise",
  delay = 0,
  className,
  style,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as ElementType;

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) return;
    el.style.transition = "none";
    el.dataset.reveal = "hidden";
    void el.offsetHeight;
    el.style.transition = "";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.reveal = "shown";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-kind={kind}
      className={className}
      style={{
        ...style,
        transitionDelay: delay ? `${delay}ms` : undefined,
      }}
    >
      {children}
    </Tag>
  );
}
