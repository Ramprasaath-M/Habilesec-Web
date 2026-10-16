import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/ui/page-intro";
import { Closing } from "@/components/ui/closing";
import { ButtonLink, TextLink } from "@/components/ui/links";
import { capabilities, type Capability } from "@/data/capabilities";
import { services } from "@/data/site";
import s from "./capability-page.module.css";

/** Introductory page for a capability area listed in the What We Do menu. */
export function CapabilityPage({ capability }: { capability: Capability }) {
  const practice = services.find((p) => p.slug === capability.practice);
  const others = capabilities.filter((c) => c.slug !== capability.slug);
  return (
    <>
      <PageIntro
        crumbs={[
          { label: "What We Do", href: "/what-we-do" },
          { label: capability.name },
        ]}
        eyebrow={`Capability ${capability.number}`}
        title={capability.name}
        lead={capability.summary}
      >
        <ButtonLink href="/contact">Discuss your requirements</ButtonLink>
        {practice && (
          <TextLink href={practice.href}>Delivered through {practice.title}</TextLink>
        )}
      </PageIntro>

      {practice && (
        <section className="sec" aria-labelledby="practice-title">
          <div className={`container ${s.grid}`}>
            <div>
              <p className="eyebrow">How we deliver</p>
              <h2 id="practice-title" className={s.title}>
                Part of our {practice.title} practice.
              </h2>
            </div>
            <div className={s.body}>
              <p className="lead">{practice.summary}</p>
              <TextLink href={practice.href}>Explore {practice.title}</TextLink>
            </div>
          </div>
        </section>
      )}

      <section className="sec--compact bg-ivory" aria-labelledby="more-title">
        <div className="container">
          <h2 id="more-title" className={s.small}>
            Other capabilities
          </h2>
          <ul className={s.list}>
            {others.map((c) => (
              <li key={c.slug}>
                <Link href={`/what-we-do/${c.slug}`}>
                  <span className="num">{c.number}</span>
                  <span>{c.name}</span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Closing
        eyebrow={capability.name}
        title={`Talk to us about ${capability.name.toLowerCase()}.`}
        text="Share what you are working on and we will suggest a practical next step."
        label="Discuss your requirements"
      />
    </>
  );
}
