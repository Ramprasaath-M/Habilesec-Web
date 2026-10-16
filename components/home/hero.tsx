import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/links";
import { HeroGlass } from "./hero-glass";
import s from "./hero.module.css";

export function Hero() {
  return (
    <section className={s.hero} aria-labelledby="home-title">
      <div className={s.stage}>
        <div className={s.media}>
          <div className={s.photo}>
            <Image
              src="/images/hero/hero-typing.webp"
              alt="Hands typing on a laptop keyboard"
              fill
              priority
              fetchPriority="high"
              sizes="(min-width: 900px) 48vw, 100vw"
            />
          </div>
        </div>
        <div className={s.glassBox}>
          <HeroGlass />
        </div>
        <div className={`container ${s.copyWrap}`}>
          <div className={s.copy}>
            <p className={`${s.eyebrow} ${s.rise}`} style={{ "--d": "250ms" } as React.CSSProperties}>
              SECURE. ADAPT. ADVANCE.
            </p>
            <h1 id="home-title" className={`${s.title} ${s.rise}`} style={{ "--d": "380ms" } as React.CSSProperties}>
              Confidence to Operate in a Digital-First World.
            </h1>
            <div className={`${s.body} ${s.rise}`} style={{ "--d": "540ms" } as React.CSSProperties}>
              <p>
                As technology evolves, businesses face growing expectations
                around security, accountability, and digital trust.
              </p>
              <p>
                HabileSec helps organizations navigate these challenges with the
                expertise, insight, and support needed to make confident
                business decisions.
              </p>
            </div>
            <div className={`${s.actions} ${s.rise}`} style={{ "--d": "700ms" } as React.CSSProperties}>
              <ButtonLink href="/contact">Start a Conversation</ButtonLink>
              <Link href="/about" className={s.ghost}>
                Discover HabileSec
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
