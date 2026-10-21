"use client";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import s from "./trust-strip.module.css";

// Content and approval flag live here. The 85+ figure is PENDING CONFIRMATION:
// keep `approved: false` until the business signs it off, then flip it to
// show the number (with a one-time count-up).
const metric = { value: 85, suffix: "+", label: "Organizations Globally", approved: false };

const principles = [
  { title: "Expertise", copy: "Knowledge grounded in technical and business requirements." },
  { title: "Clarity", copy: "Clear communication to support informed decisions." },
  { title: "Accountability", copy: "Defined scope, transparent deliverables, and engagement-focused support." },
];

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1100);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      setN(0);
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);
  return (
    <span ref={ref}>
      <span aria-hidden="true">{n}{suffix}</span>
      <span className="sr-only">{to}{suffix}</span>
    </span>
  );
}

export function TrustStrip() {
  return (
    <section className={s.strip} aria-label="Why organizations work with HabileSec">
      <ul className={`container ${s.row}`}>
        <Reveal as="li" className={`${s.item} ${s.lead}`}>
          {metric.approved ? (
            <>
              <p className={s.figure}>
                <CountUp to={metric.value} suffix={metric.suffix} />
              </p>
              <p className={s.label}>{metric.label}</p>
            </>
          ) : (
            <p className={s.figureText}>{metric.label}</p>
          )}
        </Reveal>
        {principles.map((p, i) => (
          <Reveal as="li" key={p.title} delay={90 * (i + 1)} className={s.item}>
            <h2 className={s.title}>
              <span>{p.title}</span>
            </h2>
            <p className={s.copy}>{p.copy}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
