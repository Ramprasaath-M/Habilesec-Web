"use client";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import s from "./trust-strip.module.css";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// PENDING CONFIRMATION: the 85+ figure is a proposed metric. `approved` stays
// false until the business records approval; only then is the number shown
// (with its one-time count-up). Do not flip this without sign-off.
const metric = { value: 85, suffix: "+", label: "Organizations Globally", approved: false };

const principles = [
  { title: "Expertise", copy: "Knowledge grounded in technical and business requirements." },
  { title: "Clarity", copy: "Clear communication to support informed decisions." },
  { title: "Accountability", copy: "Defined scope, transparent deliverables, and engagement-focused support." },
];

export function TrustStrip() {
  const ref = useRef<HTMLElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  // idle: fully visible (no JS / reduced motion) -> armed: hidden -> in: animating
  const [phase, setPhase] = useState<"idle" | "armed" | "in">("idle");

  useIsoLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // text is set imperatively so React re-renders never clobber the counter
    if (num.current) num.current.textContent = `0${metric.suffix}`;
    setPhase("armed");
  }, []);

  useEffect(() => {
    if (phase !== "armed") return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect(); // runs once per visit
        setPhase("in");
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [phase]);

  // one-time counter, started when the section enters view
  useEffect(() => {
    if (phase !== "in" || !metric.approved) return;
    const out = num.current;
    if (!out) return;
    let raf = 0;
    const timer = window.setTimeout(() => {
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1800);
        out.textContent = `${Math.round(metric.value * (1 - Math.pow(1 - p, 3)))}${metric.suffix}`;
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, 100);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [phase]);

  return (
    <section
      ref={ref}
      className={s.strip}
      data-phase={phase}
      aria-label="Why organizations work with HabileSec"
    >
      <ul className={`container ${s.row}`}>
        <li className={`${s.item} ${s.lead}`}>
          {metric.approved ? (
            <>
              <p className={s.figure}>
                {/* screen readers get the final value; the visual counter is hidden from them */}
                <span className="sr-only">
                  {metric.value}
                  {metric.suffix}
                </span>
                <span ref={num} aria-hidden="true" className={s.num}>
                  {`${metric.value}${metric.suffix}`}
                </span>
              </p>
              <p className={s.label}>{metric.label}</p>
            </>
          ) : (
            <p className={s.figureText}>{metric.label}</p>
          )}
        </li>
        {principles.map((p, i) => (
          <li
            key={p.title}
            className={s.item}
            style={{ "--i": i } as CSSProperties}
          >
            <h2 className={`${s.title} ${s.fx} ${s.fxTitle}`}>
              <span>{p.title}</span>
            </h2>
            <p className={`${s.copy} ${s.fx} ${s.fxCopy}`}>{p.copy}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
