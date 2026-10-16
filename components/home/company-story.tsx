import Image from "next/image";
import { differentiators } from "@/data/enterprise";
import { leaders } from "@/data/editorial";
import { founderVisuals } from "@/data/visuals";
import { TextLink } from "@/components/ui/links";
import { Reveal } from "@/components/motion/reveal";
import { Presence } from "@/components/ui/presence";
import s from "./company-story.module.css";

/** Credibility-led story: differentiators as running editorial copy, the founders, and where the company works. */
export function CompanyStory() {
  return (
    <section className="sec" aria-labelledby="why-title">
      <div className="container">
        <div className={s.grid}>
          <div className={s.copy}>
            <Reveal>
              <p className="eyebrow">Why HabileSec?</p>
              <h2 id="why-title" className={s.title}>
                Advice that connects to action.
              </h2>
              <p className={`lead ${s.lead}`}>
                A business-focused approach to security, governance and digital
                delivery, founded in 2020.
              </p>
            </Reveal>
            <div className={s.statements}>
              {differentiators.map((d, i) => (
                <Reveal as="p" key={d.title} delay={i * 110}>
                  <strong className={`serif-3 ${s.statementHead}`}>
                    {d.title}.
                  </strong>{" "}
                  {d.copy}
                </Reveal>
              ))}
            </div>
            <Reveal>
              <TextLink href="/about">Get to know HabileSec</TextLink>
            </Reveal>
          </div>

          <div className={s.founders}>
            {leaders.map((l, i) => (
              <figure key={l.name} className={s.founder}>
                <Reveal kind="mask" delay={i * 160} className={s.portrait}>
                  <Image
                    src={founderVisuals[i].src}
                    alt={founderVisuals[i].alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, 44vw"
                    style={{ objectPosition: founderVisuals[i].pos }}
                  />
                </Reveal>
                <figcaption>
                  <span className={`serif-3 ${s.fname}`}>{l.name}</span>
                  <span className={s.frole}>{l.role}</span>
                </figcaption>
              </figure>
            ))}
            <p className={s.since} aria-hidden="true">
              <span className="num">2020</span>
              <span>Founded</span>
            </p>
          </div>
        </div>

        <div className={s.presence}>
          <Presence />
        </div>
      </div>
    </section>
  );
}
