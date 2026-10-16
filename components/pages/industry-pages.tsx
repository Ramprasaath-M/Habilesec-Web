import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Crumbs } from "@/components/ui/crumbs";
import { PageIntro } from "@/components/ui/page-intro";
import { Closing } from "@/components/ui/closing";
import { ButtonLink } from "@/components/ui/links";
import { Reveal } from "@/components/motion/reveal";
import { industries, services } from "@/data/site";
import { industryVisuals } from "@/data/visuals";
import s from "./industry-pages.module.css";

export function IndustriesLanding() {
  return (
    <>
      <PageIntro
        crumbs={[{ label: "Industries" }]}
        eyebrow="Industries"
        title="Expertise in your context."
        lead="Different sectors bring different risks, responsibilities and opportunities. Explore how our capabilities support your industry."
        aside={
          <p className={s.count} aria-hidden="true">
            <span className="num">06</span>
            <span>sectors</span>
          </p>
        }
      />
      <section className="sec" aria-label="Sectors">
        <ul className={`container ${s.mosaic}`}>
          {industries.map((item, i) => {
            const v = industryVisuals[item.slug];
            return (
              <li key={item.slug} className={s[`t${i}` as keyof typeof s]}>
                <Link href={`/industries/${item.slug}`} className={s.tile}>
                  <Reveal kind="mask" delay={(i % 2) * 120} className={s.frame}>
                    <Image
                      src={v.src}
                      alt={v.alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      style={{ objectPosition: v.pos }}
                    />
                  </Reveal>
                  <span className={s.cap}>
                    <span className={`num ${s.capNum}`}>0{i + 1}</span>
                    <span className={s.capMain}>
                      <h2 className={`serif-3 ${s.capName}`}>{item.name}</h2>
                      <span className={s.capDesc}>{item.challenge}</span>
                    </span>
                    <ArrowUpRight size={24} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
      <Closing
        eyebrow="Your sector"
        title="Let’s talk about your context."
        text="Tell us about your industry’s obligations and we will suggest where to begin."
        tone="ivory"
      />
    </>
  );
}

export function IndustryDetail({ slug }: { slug: string }) {
  const item = industries.find((i) => i.slug === slug)!;
  const v = industryVisuals[slug];
  const others = industries.filter((i) => i.slug !== slug);
  return (
    <>
      <section className={s.banner}>
        <div className="container">
          <Crumbs
            items={[
              { label: "Industries", href: "/industries" },
              { label: item.name },
            ]}
          />
        </div>
        <div className={`container ${s.bannerStage}`}>
          <Reveal kind="mask" className={s.bannerFrame}>
            <Image
              src={v.src}
              alt={v.alt}
              fill
              priority
              sizes="(min-width: 1320px) 1264px, 100vw"
              style={{ objectPosition: v.pos }}
            />
          </Reveal>
          <div className={s.bannerCard}>
            <p className="eyebrow">Industry</p>
            <h1>{item.name}</h1>
            <p className={s.bannerCopy}>{item.challenge}</p>
            <ButtonLink href="/contact">Discuss your sector</ButtonLink>
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="context-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow">The sector context</p>
            <h2 id="context-title" className={s.title}>
              Understand the risk. Plan the response.
            </h2>
          </Reveal>
          <div className={s.contrast}>
            <Reveal className={s.col}>
              <h3 className={s.colHead}>What organizations face</h3>
              <ul>
                {item.risk.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal className={`${s.col} ${s.colHelp}`} delay={120}>
              <h3 className={s.colHead}>How we can help</h3>
              <ul>
                {item.helps.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sec--compact bg-ivory" aria-labelledby="caps-title">
        <div className="container">
          <h2 id="caps-title" className={s.smallTitle}>
            Bring the right expertise together.
          </h2>
          <ul className={s.practices}>
            {services.map((p) => (
              <li key={p.slug}>
                <Link href={p.href} className={s.practice}>
                  <span className={`serif-3 ${s.practiceName}`}>{p.title}</span>
                  <span>{p.summary}</span>
                  <ArrowUpRight size={22} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec--compact" aria-label="Other sectors">
        <div className={`container ${s.others}`}>
          <p className="eyebrow">Other sectors</p>
          <ul>
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/industries/${o.slug}`}>{o.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Closing
        eyebrow={item.name}
        title={`Security that understands ${item.name.toLowerCase()}.`}
        text="Tell us what matters most in your sector and we will take it from there."
        label="Discuss your sector"
      />
    </>
  );
}
