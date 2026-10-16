"use client";
import { useId, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { challengeEntries } from "@/data/enterprise";
import { challengeVisuals } from "@/data/visuals";
import { TextLink } from "@/components/ui/links";
import { Reveal } from "@/components/motion/reveal";
import { useTabKeys } from "@/components/ui/use-tabs";
import s from "./challenge-explorer.module.css";

export function ChallengeExplorer() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const { onKeyDown, setRef } = useTabKeys(challengeEntries.length, setActive);

  return (
    <section className={`sec bg-ivory ${s.section}`} aria-labelledby="begin-title">
      <div className={`container ${s.grid}`}>
        <div className={s.left}>
          <Reveal>
            <p className="eyebrow">Where do you begin?</p>
            <h2 id="begin-title" className={s.title}>
              Start with the challenge in front of you.
            </h2>
            <p className={`lead ${s.intro}`}>
              Every organization has a different starting point. Choose yours
              to see where we can help.
            </p>
          </Reveal>
          <div
            className={s.tabs}
            role="tablist"
            aria-label="Business challenges"
            aria-orientation="vertical"
          >
            {challengeEntries.map((c, i) => (
              <button
                key={c.title}
                ref={setRef(i)}
                type="button"
                role="tab"
                id={`${uid}-tab-${i}`}
                aria-selected={active === i}
                aria-controls={`${uid}-panel-${i}`}
                tabIndex={active === i ? 0 : -1}
                className={s.tab}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                <span className={`num ${s.tabNum}`}>0{i + 1}</span>
                <span className={s.tabTitle}>{c.title}</span>
                <ArrowRight size={20} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>

        <Reveal className={s.stage} kind="fade" delay={120}>
          {challengeEntries.map((c, i) => (
            <div
              key={c.title}
              id={`${uid}-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`${uid}-tab-${i}`}
              className={s.panel}
              data-active={active === i || undefined}
              aria-hidden={active === i ? undefined : true}
              inert={active === i ? undefined : true}
            >
              <div className={s.media}>
                <Image
                  src={challengeVisuals[i].src}
                  alt={challengeVisuals[i].alt}
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  style={{ objectPosition: challengeVisuals[i].pos }}
                />
                <span className={s.badge} aria-hidden="true">
                  <span className="num">0{i + 1}</span>
                  <span>Challenge</span>
                </span>
              </div>
              <div className={s.body}>
                <h3 className={`serif-3 ${s.panelTitle}`}>{c.copy}</h3>
                <p>{c.detail}</p>
                <TextLink href={c.href}>Find your next step</TextLink>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
