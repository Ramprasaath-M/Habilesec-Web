import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import s from "./approach.module.css";

const base = "/images/home/habilesec-approach";
const cards = [
  {
    n: "01",
    title: "Understand the Context",
    copy: "Start with the organization’s goals, operating environment, and specific requirements.",
    src: `${base}/understand-context.webp`,
    alt: "A team around a table reviewing documents and laptops in a bright office",
    pos: "35% 45%",
  },
  {
    n: "02",
    title: "Identify What Matters",
    copy: "Bring attention to the issues, dependencies, and priorities that deserve consideration.",
    src: `${base}/identify-priorities.webp`,
    alt: "Colleagues pointing at charts on a printed report and a tablet",
    pos: "40% 40%",
  },
  {
    n: "03",
    title: "Define the Way Forward",
    copy: "Establish a clear direction based on the engagement objectives, available evidence, and agreed scope.",
    src: `${base}/define-direction.webp`,
    alt: "A bridge leading across the water toward a city skyline at dusk",
    pos: "60% 50%",
  },
  {
    n: "04",
    title: "Support Meaningful Progress",
    copy: "Help organizations move from recommendations to appropriate next steps through engagement-specific support.",
    src: `${base}/support-progress.webp`,
    alt: "Two colleagues discussing their work at a bright desk",
    pos: "50% 40%",
  },
];

export function Approach() {
  return (
    <section className={s.section} aria-labelledby="approach-title">
      <div className="container">
        <Reveal className={s.head}>
          <p className={s.eyebrow}>How we think</p>
          <h2 id="approach-title" className={s.title}>
            Turning Complexity into Clearer Decisions.
          </h2>
          <p className={s.intro}>
            We believe organizations make better progress when complex
            challenges are understood, priorities are clear, and actions are
            aligned with business objectives.
          </p>
        </Reveal>
        <ol className={s.grid}>
          {cards.map((c, i) => (
            <Reveal as="li" key={c.n} delay={i * 130} className={s.card} style={{ "--i": i } as React.CSSProperties}>
              <Image
                src={c.src}
                alt={c.alt}
                fill
                sizes="(min-width: 1100px) 25vw, (min-width: 640px) 50vw, 100vw"
                className={s.img}
                style={{ objectPosition: c.pos }}
              />
              <div className={s.shade} aria-hidden="true" />
              <div className={s.text}>
                <p className={s.num}>{c.n}</p>
                <h3 className={s.name}>{c.title}</h3>
                <p className={s.copy}>{c.copy}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <Reveal className={s.closing} delay={200}>
          <p>
            A clearer understanding leads to better-informed choices and a more
            deliberate path forward.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
