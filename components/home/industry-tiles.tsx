"use client";
import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { industries } from "@/data/site";
import { industryVisuals } from "@/data/visuals";
import { TextLink } from "@/components/ui/links";
import { Reveal } from "@/components/motion/reveal";
import s from "./industry-tiles.module.css";

/**
 * Horizontally expanding sector tiles on desktop. Below 960px the same markup
 * becomes a stacked grid with every description visible.
 */
export function IndustryTiles() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <section className="sec" aria-labelledby="industries-title">
      <div className="container">
        <Reveal className={s.head}>
          <div>
            <p className="eyebrow">Industries we serve</p>
            <h2 id="industries-title" className={s.title}>
              Your sector. Its own perspective.
            </h2>
          </div>
          <div className={s.headSide}>
            <p>
              Security and engineering shaped around the realities of your
              industry.
            </p>
            <TextLink href="/industries">Explore industries</TextLink>
          </div>
        </Reveal>

        <Reveal as="div" kind="fade" delay={100}>
          <ul className={s.tiles}>
            {industries.map((ind, i) => {
              const v = industryVisuals[ind.slug];
              return (
                <li
                  key={ind.slug}
                  className={s.tile}
                  data-active={active === i || undefined}
                  onPointerEnter={(e) => {
                    if (e.pointerType !== "mouse") return;
                    window.clearTimeout(timer.current);
                    timer.current = window.setTimeout(() => setActive(i), 70);
                  }}
                  onPointerLeave={() => window.clearTimeout(timer.current)}
                >
                  <div className={s.photo}>
                    <div className={s.photoInner}>
                      <Image
                        src={v.src}
                        alt={v.alt}
                        fill
                        sizes="(min-width: 960px) 720px, (min-width: 560px) 50vw, 100vw"
                        style={{ objectPosition: v.pos }}
                      />
                    </div>
                  </div>
                  <span className={s.vlabel} aria-hidden="true">
                    <span className="num">0{i + 1}</span>
                    <span>{ind.name}</span>
                  </span>
                  <button
                    type="button"
                    className={s.hit}
                    aria-expanded={active === i}
                    aria-controls={`${uid}-c-${i}`}
                    onClick={() => setActive(i)}
                    onFocus={() => setActive(i)}
                  >
                    <span className="sr-only">{ind.name}</span>
                  </button>
                  <div id={`${uid}-c-${i}`} className={s.caption}>
                    <p className={`num ${s.cnum}`}>0{i + 1}</p>
                    <h3 className={`serif-3 ${s.cname}`}>{ind.name}</h3>
                    <p className={s.cdesc}>{ind.challenge}</p>
                    <TextLink href={`/industries/${ind.slug}`}>
                      Explore {ind.name}
                    </TextLink>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
