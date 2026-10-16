import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink, TextLink } from "@/components/ui/links";
import { Crumbs } from "@/components/ui/crumbs";
import { PageIntro } from "@/components/ui/page-intro";
import { Closing } from "@/components/ui/closing";
import { Reveal } from "@/components/motion/reveal";
import { ServiceIndex } from "./service-index";
import { services } from "@/data/site";
import {
  serviceCategories,
  type ServiceCategory,
} from "@/data/service-categories";
import { practiceDetails } from "@/data/editorial";
import { practiceVisuals, serviceVisuals } from "@/data/visuals";
import s from "./service-pages.module.css";

/* ---------------------------------------------------------------- landing */

function PracticeLoopBand() {
  return (
    <section className="sec bg-ivory" aria-labelledby="practices-title">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Our practices</p>
          <h2 id="practices-title" className={s.bandTitle}>
            Three practices. One connected model.
          </h2>
        </Reveal>
        <ol className={s.loopRow}>
          {services.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 120} className={s.loopItem}>
              <span className={s.node} aria-hidden="true" />
              <p className={s.loopEyebrow}>{p.eyebrow}</p>
              <h3 className={`serif-3 ${s.loopName}`}>{p.title}</h3>
              <p className={s.loopSummary}>{p.summary}</p>
              <p className={s.chips} aria-label={`${p.title} cycle`}>
                {p.loop.map((w, k) => (
                  <span key={w}>
                    {w}
                    {k < p.loop.length - 1 && (
                      <i aria-hidden="true">→</i>
                    )}
                  </span>
                ))}
              </p>
              <TextLink href={p.href}>Explore {p.title}</TextLink>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ServicesLanding() {
  return (
    <>
      <PageIntro
        crumbs={[{ label: "What We Do" }]}
        eyebrow="What we do"
        title="Expertise for the decisions ahead."
        lead="Cybersecurity, governance, privacy and engineering. Connected around your business priorities."
        aside={
          <p className={s.asideFig} aria-hidden="true">
            <span className="num">05</span>
            <span>disciplines</span>
          </p>
        }
      />
      <section className="sec" aria-label="Service categories">
        <div className="container">
          <ServiceIndex />
        </div>
      </section>
      <PracticeLoopBand />
      <Closing
        eyebrow="Not sure where to start?"
        title="Tell us the decision in front of you."
        text="We will help you find the right expertise and the right first step."
        label="Talk to our team"
        tone="sand"
      />
    </>
  );
}

/* ----------------------------------------------------------- service page */

export function ServiceDetail({ category }: { category: ServiceCategory }) {
  const visual = serviceVisuals[category.slug];
  const idx = serviceCategories.findIndex((c) => c.slug === category.slug);
  const next = serviceCategories[(idx + 1) % serviceCategories.length];
  const crumbs = [
    { label: "What We Do", href: "/what-we-do" },
    { label: category.name },
  ];
  return (
    <>
      <section className={s.hero}>
        <div className={`container ${s.heroInner}`}>
          <div className={s.heroText}>
            <Crumbs items={crumbs} />
            <p className={s.heroTag}>
              <span className="num">{category.number}</span>
              <span>
                {category.name} · {category.practiceName}
              </span>
            </p>
            <h1>{category.headline}</h1>
            <p className="lead">{category.description}</p>
            <div className={s.heroActions}>
              <ButtonLink href="/contact">Discuss your requirements</ButtonLink>
              <TextLink href="#services">See how we can help</TextLink>
            </div>
          </div>
        </div>
        <div className={s.heroMedia}>
          <Reveal kind="mask" className={s.heroMediaInner}>
            <Image
              src={visual.src}
              alt={visual.alt}
              fill
              priority
              sizes="(min-width: 900px) 44vw, 100vw"
              style={{ objectPosition: visual.pos }}
            />
          </Reveal>
        </div>
      </section>

      <section className="sec" id="overview" aria-labelledby="overview-title">
        <div className={`container ${s.detailGrid}`}>
          <nav className={s.pageNav} aria-label="On this page">
            <p className={s.navLabel}>On this page</p>
            <a href="#overview">Overview</a>
            <a href="#services">How we can help</a>
            <a href="#approach">Our approach</a>
            <Link href={`/services/${category.practice}`}>
              {category.practiceName} practice
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </nav>
          <div>
            <Reveal>
              <p className="eyebrow">A practical perspective</p>
              <h2 id="overview-title" className={s.sectionTitle}>
                {category.name}, connected to your business.
              </h2>
              <p className={s.overview}>{category.overview}</p>
            </Reveal>
            <Reveal className={s.challenges} delay={100}>
              <p className={s.challengesLabel}>Where organizations get held back</p>
              <ul>
                {category.challenges.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sec bg-ivory" id="services" aria-labelledby="help-title">
        <div className="container">
          <Reveal>
            <h2 id="help-title" className={s.sectionTitle}>
              How we can help
            </h2>
          </Reveal>
          <ul className={s.helpGrid}>
            {category.services.map((svc, i) => (
              <Reveal
                as="li"
                key={svc.id}
                delay={(i % 2) * 100}
                className={s.help}
              >
                <span id={svc.id} className={`num ${s.helpNum}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{svc.name}</h3>
                <p>{svc.description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec" id="approach" aria-labelledby="approach-title">
        <div className="container">
          <Reveal>
            <h2 id="approach-title" className={s.sectionTitle}>
              Our approach
            </h2>
          </Reveal>
          <div className={s.steps}>
            <Reveal kind="line" className={s.stepLine} />
            <ol>
              {category.approach.map((step, i) => (
                <Reveal as="li" key={step.title} delay={i * 140}>
                  <span className={s.stepDot} aria-hidden="true" />
                  <span className={`num ${s.stepNum}`}>0{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="sec--compact bg-mist" aria-label="Related">
        <div className={`container ${s.related}`}>
          <Link href={`/services/${category.practice}`} className={s.relatedLink}>
            <span className={s.relatedLabel}>Delivered through</span>
            <span className={`serif-3 ${s.relatedName}`}>
              {category.practiceName}
            </span>
            <span className={s.relatedCopy}>{category.practiceCopy}</span>
            <span className={s.relatedCue}>
              Explore the practice <ArrowUpRight size={18} aria-hidden="true" />
            </span>
          </Link>
          <Link href={`/what-we-do/${next.slug}`} className={s.relatedLink}>
            <span className={s.relatedLabel}>Next service</span>
            <span className={`serif-3 ${s.relatedName}`}>{next.name}</span>
            <span className={s.relatedCopy}>{next.description}</span>
            <span className={s.relatedCue}>
              Continue exploring <ArrowUpRight size={18} aria-hidden="true" />
            </span>
          </Link>
        </div>
      </section>

      <Closing
        eyebrow={category.name}
        title={`Talk to us about ${category.name.toLowerCase()}.`}
        text="Share what you are working on and we will suggest a practical next step."
        label="Discuss your requirements"
        tone="tint"
      />
    </>
  );
}

/* ---------------------------------------------------------- practice page */

export function PracticeDetail({
  slug,
}: {
  slug: keyof typeof practiceDetails;
}) {
  const item = services.find((x) => x.slug === slug)!;
  const detail = practiceDetails[slug];
  const visual = practiceVisuals[slug];
  const words = detail.method.split(/(?<=\.)\s+/);
  const others = services.filter((x) => x.slug !== slug);
  return (
    <>
      <section className={s.practiceHero}>
        <div className="container">
          <Crumbs
            items={[
              { label: "What We Do", href: "/what-we-do" },
              { label: item.title },
            ]}
          />
          <div className={s.practiceGrid}>
            <div>
              <p className="eyebrow">{item.eyebrow}</p>
              <h1 className={s.practiceTitle}>
                <span className={s.wordmark}>{item.title}</span>
                <span className="sr-only">: </span>
                <span className={s.tagline}>{detail.title}</span>
              </h1>
            </div>
            <div className={s.practiceSide}>
              <p className={s.method} aria-hidden="true">
                {words.map((w, i) => (
                  <span key={w} style={{ "--i": i } as React.CSSProperties}>
                    {w}
                  </span>
                ))}
              </p>
              <p className="lead">{detail.introduction}</p>
              <ButtonLink href="/contact">Discuss {item.title}</ButtonLink>
            </div>
          </div>
        </div>
        <div className={`container ${s.practiceBand}`}>
          <Reveal kind="mask" className={s.bandFrame}>
            <Image
              src={visual.src}
              alt={visual.alt}
              fill
              priority
              sizes="(min-width: 1320px) 1264px, 100vw"
              style={{ objectPosition: visual.pos }}
            />
          </Reveal>
        </div>
      </section>

      <section className="sec bg-ivory" aria-labelledby="covers-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow">The practice</p>
            <h2 id="covers-title" className={s.sectionTitle}>
              {item.shortTitle}.
            </h2>
            <p className={`lead ${s.coversLead}`}>{item.summary}</p>
          </Reveal>
          <div className={s.groups}>
            {detail.groups.map((g) => (
              <Reveal key={g.id} className={s.group}>
                <div id={g.id}>
                  <h3 className={`serif-3 ${s.groupTitle}`}>{g.title}</h3>
                  <p>{g.copy}</p>
                </div>
                <ul>
                  {g.items.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec bg-tint" aria-labelledby="how-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow">How we work</p>
            <h2 id="how-title" className={s.sectionTitle}>
              A repeatable approach to delivery.
            </h2>
          </Reveal>
          <div className={s.steps}>
            <Reveal kind="line" className={s.stepLine} />
            <ol className={s.lifecycle}>
              {detail.lifecycle.map((step, i) => (
                <Reveal as="li" key={step.title} delay={i * 110}>
                  <span className={s.stepDot} aria-hidden="true" />
                  <span className={`num ${s.stepNum}`}>0{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="sec--compact" aria-label="Connected practices">
        <div className={`container ${s.connected}`}>
          <p className="eyebrow">Connected practices</p>
          <ul>
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={o.href} className={s.connectedRow}>
                  <span className={`serif-3 ${s.connectedName}`}>{o.title}</span>
                  <span>{o.eyebrow}</span>
                  <ArrowUpRight size={22} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Closing
        eyebrow={item.title}
        title={`Bring ${item.title} into your plans.`}
        text="Tell us where you are today and we will outline a practical way forward."
        label={`Discuss ${item.title}`}
      />
    </>
  );
}

/* --------------------------------------------------------------- our work */

export function OurWorkPage() {
  return (
    <>
      <PageIntro
        crumbs={[{ label: "Our work" }]}
        eyebrow="Our work"
        title="Connecting expertise with execution."
        lead="Explore how our governance, secure engineering and incident response practices approach business challenges."
      />
      <section className="sec" aria-label="Practices">
        <div className={`container ${s.workList}`}>
          {services.map((p, i) => {
            const v = practiceVisuals[p.slug];
            return (
              <article key={p.slug} className={s.workRow}>
                <Reveal kind="mask" className={s.workMedia}>
                  <Image
                    src={v.src}
                    alt={v.alt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    style={{ objectPosition: v.pos }}
                  />
                </Reveal>
                <Reveal className={s.workText} delay={100}>
                  <p className="eyebrow">{p.eyebrow}</p>
                  <h2 className={s.workTitle}>{p.title}</h2>
                  <p className="lead">{p.summary}</p>
                  <p className={s.chips} aria-label={`${p.title} cycle`}>
                    {p.loop.map((w, k) => (
                      <span key={w}>
                        {w}
                        {k < p.loop.length - 1 && <i aria-hidden="true">→</i>}
                      </span>
                    ))}
                  </p>
                  <TextLink href={p.href}>Explore {p.title}</TextLink>
                  <span className="sr-only">Practice {i + 1} of {services.length}</span>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>
      <Closing
        eyebrow="Work with us"
        title="Let’s plan your next step together."
        text="Tell us what you are protecting, building or preparing for."
        tone="ivory"
      />
    </>
  );
}
