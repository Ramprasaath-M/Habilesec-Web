import { company } from "@/data/site";
import { ButtonLink } from "@/components/ui/links";
import { Reveal } from "@/components/motion/reveal";
import s from "./closing.module.css";

type Props = {
  eyebrow?: string;
  title?: string;
  text?: string;
  label?: string;
  href?: string;
  tone?: "tint" | "ivory" | "sand";
  /** Hide the stepped brand motif on pages where it would compete with content */
  motif?: boolean;
};

/** Closing conversation. Light, typographic, contextual copy per page family. */
export function Closing({
  eyebrow = "Let’s talk",
  title = "A clearer path starts with a conversation.",
  text = "Tell us what you are protecting, building or preparing for.",
  label = "Start a conversation",
  href = "/contact",
  tone = "tint",
  motif = true,
}: Props) {
  return (
    <section className={`${s.closing} bg-${tone}`} aria-labelledby="closing-title">
      {motif && (
        <Reveal kind="fade" className={s.motif}>
          <svg viewBox="0 0 440 320" aria-hidden="true" focusable="false">
            <path
              d="M0 316 H88 V256 H176 V196 H264 V136 H352 V76 H440"
              pathLength="1"
            />
            <circle cx="396" cy="52" r="7" />
          </svg>
        </Reveal>
      )}
      <div className={`container ${s.inner}`}>
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="closing-title" className={`display ${s.title}`}>
            {title}
          </h2>
          <p className={`lead ${s.text}`}>{text}</p>
        </Reveal>
        <Reveal className={s.actions} delay={140}>
          <ButtonLink href={href}>{label}</ButtonLink>
          <p className={s.direct}>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <a href="tel:+914353575243">{company.phone}</a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
