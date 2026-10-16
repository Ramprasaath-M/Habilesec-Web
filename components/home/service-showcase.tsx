"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { capabilities } from "@/data/capabilities";
import { Reveal } from "@/components/motion/reveal";
import s from "./service-showcase.module.css";

// One data array drives navigation, image, card text and destination.
// Short UI descriptions; photography is local and chosen per service.
const meta: Record<string, { text: string; src: string; alt: string }> = {
  "cloud-devops": {
    text: "Modern, secure, and scalable cloud environments.",
    src: "/images/industries/technology-saas.webp",
    alt: "Rows of illuminated server racks",
  },
  "security-testing": {
    text: "Identify vulnerabilities and strengthen digital defenses.",
    src: "/images/challenges/cybersecurity.webp",
    alt: "A developer reviewing code across several monitors",
  },
  "governance-risk-compliance": {
    text: "Understand obligations, manage risk, and improve compliance readiness.",
    src: "/images/services/governance-risk-compliance.webp",
    alt: "A team reviewing documents around a meeting table",
  },
  "software-engineering": {
    text: "Build reliable, secure, and business-focused digital applications.",
    src: "/images/services/digital-engineering.webp",
    alt: "A software engineering team working in an open office",
  },
  "ai-iot-blockchain": {
    text: "Explore connected and intelligent technology solutions.",
    src: "/media/manufacturing.webp",
    alt: "Automated production equipment in a factory",
  },
  "security-operations": {
    text: "Monitor threats, investigate incidents, and strengthen response capabilities.",
    src: "/images/services/managed-security.webp",
    alt: "A security operations centre with a wall of monitors",
  },
  "security-advisory": {
    text: "Make informed security decisions with practical expert guidance.",
    src: "/images/challenges/business-resilience.webp",
    alt: "Colleagues planning with sticky notes on a whiteboard",
  },
};
const items = capabilities.map((c) => ({ ...c, ...meta[c.slug] }));

export function ServiceShowcase() {
  const [i, setI] = useState(0);
  const n = items.length;
  const go = (k: number) => setI(((k % n) + n) % n);

  return (
    <section className={s.section} aria-labelledby="services-title">
      <div className={`container ${s.grid}`}>
        <Reveal className={s.intro}>
          <div>
            <p className={s.eyebrow}>What we do</p>
            <h2 id="services-title" className={s.title}>
              The right expertise.
              <br />
              A connected approach.
            </h2>
            <p className={s.lead}>
              Seven connected capabilities to help organizations navigate
              technology, security, risk, and digital transformation.
            </p>
          </div>
          <div className={s.arrows}>
            <button
              type="button"
              className={s.circle}
              aria-label="Previous service"
              onClick={() => go(i - 1)}
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={s.circle}
              aria-label="Next service"
              onClick={() => go(i + 1)}
            >
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </Reveal>

        <div className={s.stage}>
          <div className={s.photo}>
            {items.map((c, k) => (
              <Image
                key={c.slug}
                src={c.src}
                alt={k === i ? c.alt : ""}
                aria-hidden={k === i ? undefined : true}
                fill
                loading="eager"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className={s.img}
                data-active={k === i || undefined}
              />
            ))}
          </div>
          <div className={s.card} aria-live="polite">
            {items.map((c, k) => (
              <div
                key={c.slug}
                className={s.cardBody}
                data-active={k === i || undefined}
                aria-hidden={k === i ? undefined : true}
              >
                <p className={s.index}>
                  {c.number} / 0{n}
                </p>
                <h3 className={s.cardTitle}>{c.name}</h3>
                <p className={s.cardText}>{c.text}</p>
                <Link
                  href={`/what-we-do/${c.slug}`}
                  className={s.more}
                  tabIndex={k === i ? 0 : -1}
                >
                  Learn more <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only"> about {c.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <nav className={s.nav} aria-label="Services">
          <ul>
            {items.map((c, k) => (
              <li key={c.slug}>
                <button
                  type="button"
                  className={s.navItem}
                  aria-current={k === i ? "true" : undefined}
                  onClick={() => setI(k)}
                >
                  <span className={s.navNum}>{c.number}</span>
                  <span>{c.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
