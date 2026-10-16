"use client";
import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { ShieldCheck, ClipboardCheck, Layers, Activity } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink, TextLink } from "@/components/ui/links";
import s from "./challenge-explorer.module.css";

const rows = [
  {
    title: "Strengthen our security",
    short: "Identify security gaps across applications, infrastructure and cloud.",
    detail:
      "We help identify vulnerabilities, understand exposure, and prioritize practical security improvements.",
    href: "/what-we-do/cybersecurity",
    Icon: ShieldCheck,
  },
  {
    title: "Prepare for compliance",
    short: "Understand applicable requirements and assess your readiness.",
    detail:
      "Evaluate compliance gaps, strengthen governance practices, and establish a clear path toward applicable requirements.",
    href: "/what-we-do/governance-compliance",
    Icon: ClipboardCheck,
  },
  {
    title: "Build a digital product",
    short: "Plan, engineer and deliver secure digital applications.",
    detail:
      "Turn business ideas into reliable digital products through thoughtful design, engineering, and security practices.",
    href: "/what-we-do/digital-engineering",
    Icon: Layers,
  },
  {
    title: "Respond to an incident",
    short: "Understand what happened, contain the impact and recover.",
    detail:
      "Assess the incident, support containment and investigation, and identify practical recovery and improvement actions.",
    href: "/what-we-do/incident-response",
    Icon: Activity,
  },
];

export function ChallengeExplorer() {
  const [open, setOpen] = useState<number | null>(null);
  const uid = useId();

  return (
    <section className={s.section} aria-labelledby="begin-title">
      <div className={`container ${s.grid}`}>
        <Reveal className={s.left}>
          <p className={s.eyebrow}>Where do you begin?</p>
          <h2 id="begin-title" className={s.title}>
            Start with the challenge in front of you.
          </h2>
          <p className={s.intro}>
            Every organization has a different starting point. Choose yours to
            see where we can help.
          </p>
          <ButtonLink href="/what-we-do">Explore all capabilities</ButtonLink>
        </Reveal>

        <ul className={s.rows}>
          {rows.map((r, i) => {
            const on = open === i;
            return (
              <Reveal as="li" key={r.title} delay={120 + i * 70}>
                <div className={s.row} data-open={on || undefined}>
                  <h3 className={s.head}>
                    <button
                      type="button"
                      className={s.toggle}
                      aria-expanded={on}
                      aria-controls={`${uid}-p${i}`}
                      id={`${uid}-b${i}`}
                      onClick={() => setOpen(on ? null : i)}
                    >
                      <span className={s.num} aria-hidden="true">
                        0{i + 1}
                      </span>
                      <span className={s.main}>
                        <r.Icon
                          className={s.icon}
                          size={22}
                          strokeWidth={1.7}
                          aria-hidden="true"
                        />
                        <span className={s.name}>{r.title}</span>
                        <span className={s.short}>{r.short}</span>
                      </span>
                      <ChevronDown
                        className={s.chev}
                        size={20}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  <div
                    id={`${uid}-p${i}`}
                    role="region"
                    aria-labelledby={`${uid}-b${i}`}
                    className={s.panel}
                    data-open={on || undefined}
                    inert={on ? undefined : true}
                  >
                    <div className={s.panelInner}>
                      <p>{r.detail}</p>
                      <TextLink href={r.href}>Find your next step</TextLink>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
