import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink, TextLink } from "@/components/ui/links";
import { services } from "@/data/site";
import { heroVisual } from "@/data/visuals";
import s from "./hero.module.css";

const descriptors: Record<string, string> = {
  grcloop: "Governance & compliance",
  forgeloop: "Secure engineering",
  hexn6: "Incident response",
};

export function Hero() {
  return (
    <section className={s.hero} aria-labelledby="home-title">
      <div className={s.stage}>
        <div className={s.media}>
          <Image
            src={heroVisual.src}
            alt={heroVisual.alt}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            style={{ objectPosition: heroVisual.pos }}
          />
        </div>
        <div className={`container ${s.copyWrap}`}>
          <div className={s.copy}>
            <p className={`eyebrow ${s.rise}`} style={{ "--d": "420ms" } as React.CSSProperties}>
              HabileSec · Connected expertise
            </p>
            <h1 id="home-title" className={`display ${s.title}`}>
              <span className={s.ln} style={{ "--i": 0 } as React.CSSProperties}>
                <span>Confidence</span>
              </span>{" "}
              <span className={s.ln} style={{ "--i": 1 } as React.CSSProperties}>
                <span>for what</span>
              </span>{" "}
              <span className={s.ln} style={{ "--i": 2 } as React.CSSProperties}>
                <span>
                  comes next<span className={s.stop}>.</span>
                </span>
              </span>
            </h1>
            <p className={`lead ${s.rise}`} style={{ "--d": "620ms" } as React.CSSProperties}>
              Cybersecurity, governance and secure engineering. Working
              together to help your business move forward.
            </p>
            <div className={`${s.actions} ${s.rise}`} style={{ "--d": "740ms" } as React.CSSProperties}>
              <ButtonLink href="/what-we-do">Explore our expertise</ButtonLink>
              <TextLink href="/contact">Talk to our team</TextLink>
            </div>
          </div>
        </div>
      </div>

      <div className={`container ${s.loopWrap}`}>
        <nav className={s.loop} aria-label="HabileSec practices">
          <p className={s.loopLabel}>One connected approach</p>
          {services.map((p) => (
            <Link key={p.slug} href={p.href} className={s.practice}>
              <span className={s.practiceTop}>
                <span className={s.practiceName}>{p.title}</span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </span>
              <span className={s.practiceDesc}>{descriptors[p.slug]}</span>
              <span className={s.practiceLoop}>{p.loop.join(" · ")}</span>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
