"use client";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { serviceCategories } from "@/data/service-categories";
import { serviceVisuals } from "@/data/visuals";
import { TextLink } from "@/components/ui/links";
import { Reveal } from "@/components/motion/reveal";
import s from "./service-showcase.module.css";

const DESKTOP = "(min-width: 1024px) and (min-height: 660px)";

/**
 * Scroll-led service stage. On large screens the index and stage pin while a
 * short scroll track (about one extra screen) steps through the five service
 * categories; the index also works as buttons. Elsewhere, and without JS, the
 * services are plain stacked panels with all content visible.
 */
export function ServiceShowcase() {
  const uid = useId();
  const [active, setActive] = useState(0);
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const count = serviceCategories.length;

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP);
    let raf = 0;

    const layout = () => {
      const t = track.current;
      const st = stage.current;
      const sec = section.current;
      if (!t || !st || !sec) return;
      if (!mq.matches) {
        sec.setAttribute("data-mode", "tabs");
        t.style.height = "";
        return;
      }
      sec.setAttribute("data-mode", "stage");
      const step = Math.max(240, window.innerHeight * 0.26);
      t.style.height = `${st.offsetHeight + (count - 1) * step}px`;
    };

    const update = () => {
      raf = 0;
      const t = track.current;
      const st = stage.current;
      if (!t || !st || !mq.matches) return;
      const stickyTop = parseFloat(getComputedStyle(st).top) || 0;
      const range = t.offsetHeight - st.offsetHeight;
      if (range <= 0) return;
      const p = Math.min(
        1,
        Math.max(0, (stickyTop - t.getBoundingClientRect().top) / range),
      );
      t.style.setProperty("--p", String(p));
      setActive(Math.min(count - 1, Math.floor(p * count)));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      layout();
      update();
    };

    layout();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    if (stage.current) ro.observe(stage.current);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [count]);

  const jumpTo = useCallback(
    (i: number) => {
      const t = track.current;
      const st = stage.current;
      if (!t || !st) return;
      if (section.current?.getAttribute("data-mode") !== "stage") {
        setActive(i);
        return;
      }
      const stickyTop = parseFloat(getComputedStyle(st).top) || 0;
      const range = t.offsetHeight - st.offsetHeight;
      const trackTop = window.scrollY + t.getBoundingClientRect().top;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      window.scrollTo({
        top: trackTop - stickyTop + ((i + 0.5) / count) * range,
        behavior: reduce ? "auto" : "smooth",
      });
      setActive(i);
    },
    [count],
  );

  return (
    <section
      ref={section}
      className={`sec ${s.section}`}
      aria-labelledby="services-title"
    >
      <div className="container">
        <div ref={track} className={s.track}>
          <div ref={stage} className={s.stage}>
            <div className={s.rail}>
              <Reveal>
                <p className="eyebrow">What we do</p>
                <h2 id="services-title" className={s.title}>
                  The right expertise. A connected approach.
                </h2>
              </Reveal>
              <div className={s.index} role="group" aria-label="Services">
                <span className={s.progress} aria-hidden="true">
                  <span className={s.fill} />
                </span>
                {serviceCategories.map((c, i) => (
                  <button
                    key={c.slug}
                    type="button"
                    className={s.indexItem}
                    aria-current={active === i ? "true" : undefined}
                    onClick={() => jumpTo(i)}
                  >
                    <span className={`num ${s.indexNum}`}>{c.number}</span>
                    <span className={s.indexName}>{c.name}</span>
                  </button>
                ))}
              </div>
              <div className={s.railLink}>
                <TextLink href="/what-we-do">Explore all services</TextLink>
              </div>
            </div>

            <div className={s.panels}>
              {serviceCategories.map((c, i) => {
                const v = serviceVisuals[c.slug];
                return (
                  <article
                    key={c.slug}
                    className={s.panel}
                    data-active={active === i || undefined}
                    aria-labelledby={`${uid}-h-${i}`}
                  >
                    <div className={s.media}>
                      <Image
                        src={v.src}
                        alt={v.alt}
                        fill
                        sizes="(min-width: 1024px) 56vw, (min-width: 720px) 42vw, 100vw"
                        style={{ objectPosition: v.pos }}
                      />
                    </div>
                    <div className={s.text}>
                      <p className={s.tag}>
                        <span className="num">{c.number}</span>
                        <span>
                          {c.name} · {c.practiceName}
                        </span>
                      </p>
                      <h3 id={`${uid}-h-${i}`} className={`serif-3 ${s.panelTitle}`}>
                        {c.headline}
                      </h3>
                      <p className={s.desc}>{c.description}</p>
                      <ul className={s.list}>
                        {c.services.slice(0, 4).map((svc) => (
                          <li key={svc.id}>{svc.name}</li>
                        ))}
                      </ul>
                      <TextLink href={`/what-we-do/${c.slug}`}>
                        Explore {c.name}
                      </TextLink>
                    </div>
                  </article>
                );
              })}
              <div className={s.tabsLink}>
                <TextLink href="/what-we-do">Explore all services</TextLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
