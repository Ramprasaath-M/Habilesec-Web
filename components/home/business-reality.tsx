"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import s from "./business-reality.module.css";

const challenges = [
  { n: "01", title: "Growing Complexity", text: "Technology environments evolve quickly, making it harder to maintain visibility across systems, processes, and dependencies." },
  { n: "02", title: "Increasing Expectations", text: "Customers, partners, and stakeholders expect organizations to demonstrate responsible practices and dependable operations." },
  { n: "03", title: "Decisions Under Pressure", text: "Business teams must balance immediate priorities with long-term resilience, changing requirements, and available resources." },
];
const sequence = (index: number) => ({ "--i": index }) as CSSProperties;

export function BusinessReality() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = ref.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!section || motion.matches || !("IntersectionObserver" in window)) return;
    // Content remains visible without JavaScript or when already in view.
    if (section.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    section.dataset.motion = "pending";
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        section.dataset.motion = "shown";
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    observer.observe(section);
    const showWithoutMotion = () => {
      if (motion.matches) {
        section.dataset.motion = "shown";
        observer.disconnect();
      }
    };
    motion.addEventListener("change", showWithoutMotion);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", showWithoutMotion);
      delete section.dataset.motion;
    };
  }, []);

  return (
    <section ref={ref} className={s.section} aria-labelledby="reality-title">
      <div className="container">
        <div className={s.upper}>
          <div className={`${s.visual} ${s.reveal}`} style={sequence(1)}>
            <Image
              src="/images/home/business-reality/business-reality-architecture.webp"
              alt="A bright modern office corridor with glass walls and clean architectural lines"
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1320px) 56vw, 680px"
              className={s.image}
            />
          </div>
          <div className={s.intro}>
            <p className={`${s.eyebrow} ${s.reveal}`} style={sequence(0)}>THE BIGGER PICTURE</p>
            <h2 id="reality-title" className={`${s.title} ${s.reveal}`} style={sequence(1)}>
              Progress Brings Opportunity.{" "}<span>Complexity Comes with It.</span>
            </h2>
            <p className={`${s.lead} ${s.reveal}`} style={sequence(2)}>
              Digital transformation creates new possibilities for businesses, but
              it also introduces challenges that require informed decisions and
              coordinated action.
            </p>
          </div>
        </div>
        <ol className={s.panels}>
          {challenges.map((challenge, index) => (
            <li key={challenge.n} className={`${s.panel} ${s.reveal}`} style={sequence(index + 3)}>
              <div className={s.panelBody}>
                <span className={s.num} aria-hidden="true">{challenge.n}</span>
                <h3 className={s.panelTitle}>{challenge.title}</h3>
                <p className={s.panelText}>{challenge.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
