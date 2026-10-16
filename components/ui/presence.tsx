import { presence } from "@/data/visuals";
import { Reveal } from "@/components/motion/reveal";
import s from "./presence.module.css";

/** Locations drawn from company data: head office plus delivery locations. */
export function Presence({ note }: { note?: string }) {
  return (
    <div className={s.presence}>
      <Reveal as="div">
        <p className="eyebrow">Where we work</p>
        <p className={s.note}>
          {note ??
            "Our head office is in Kumbakonam, with teams and delivery locations across India and international regions."}
        </p>
      </Reveal>
      <ul className={s.cities}>
        {presence.map((p, i) => (
          <Reveal as="li" key={p.city} delay={i * 50} className={s.city}>
            <span className={`serif-3 ${s.name}`}>{p.city}</span>
            <span className={p.hq ? s.hq : s.role}>{p.role}</span>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
