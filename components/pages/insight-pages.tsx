import Image from "next/image";
import { Crumbs } from "@/components/ui/crumbs";
import { PageIntro } from "@/components/ui/page-intro";
import { Closing } from "@/components/ui/closing";
import { TextLink } from "@/components/ui/links";
import { ArticleLink } from "@/components/ui/article-link";
import { Reveal } from "@/components/motion/reveal";
import { InsightsBrowser } from "./insights-browser";
import { articles } from "@/data/editorial";
import { articleVisuals } from "@/data/visuals";
import s from "./insights-pages.module.css";

export function InsightsLanding({ category }: { category?: string }) {
  return (
    <>
      <PageIntro
        crumbs={[{ label: "Insights" }]}
        eyebrow="The HabileSec perspective"
        title="Clarity for the decisions that matter."
        lead="Practice notes on governance, cybersecurity, privacy and secure engineering. Useful starting points for your next conversation."
        tone="ivory"
        size="large"
      />
      <section className="sec bg-ivory" aria-label="Practice notes">
        <div className="container">
          <InsightsBrowser initialCategory={category} />
        </div>
      </section>
      <Closing
        eyebrow="Start the conversation"
        title="Found a useful starting point?"
        text="Bring the question to our team and we will take it further with you."
        tone="tint"
      />
    </>
  );
}

export function PerspectiveDetail({ slug }: { slug: string }) {
  const item = articles.find((a) => a.slug === slug)!;
  const v = articleVisuals[slug];
  const more = articles.filter((a) => a.slug !== slug).slice(0, 2);
  return (
    <>
      <header className={s.articleHead}>
        <div className="container">
          <Crumbs
            items={[
              { label: "Insights", href: "/insights" },
              { label: item.category },
            ]}
          />
          <div className={s.articleTitleWrap}>
            <p className={s.meta}>
              {item.category} · {item.readTime}
            </p>
            <h1 className={s.articleTitle}>{item.title}</h1>
            <p className={`lead ${s.articleLead}`}>{item.summary}</p>
          </div>
        </div>
        <div className="container">
          <Reveal kind="mask" className={s.articleFrame}>
            <Image
              src={v.src}
              alt={v.alt}
              fill
              priority
              sizes="(min-width: 1320px) 1264px, 100vw"
              style={{ objectPosition: v.pos }}
            />
          </Reveal>
        </div>
      </header>

      <section className="sec">
        <div className={`container ${s.articleGrid}`}>
          <nav className={s.index} aria-label="In this perspective">
            <p className={s.indexLabel}>In this perspective</p>
            {item.sections.map((sec, i) => (
              <a href={`#part-${i + 1}`} key={sec.title}>
                {sec.title}
              </a>
            ))}
          </nav>
          <article className={s.prose}>
            {item.sections.map((sec, i) => (
              <Reveal as="section" key={sec.title}>
                <div id={`part-${i + 1}`}>
                  <h2>{sec.title}</h2>
                  <p>{sec.copy}</p>
                </div>
              </Reveal>
            ))}
            <p className={s.note}>
              HabileSec practice notes. General guidance based on our
              governance, engineering and response capabilities.
            </p>
            <div className={s.proseLinks}>
              <TextLink href="/contact">Discuss this with our team</TextLink>
              <TextLink href="/insights">All perspectives</TextLink>
            </div>
          </article>
        </div>
      </section>

      <section className="sec--compact bg-ivory" aria-labelledby="more-title">
        <div className="container">
          <h2 id="more-title" className={s.moreTitle}>
            Continue reading
          </h2>
          <div className={s.moreGrid}>
            {more.map((a) => (
              <ArticleLink
                key={a.slug}
                article={a}
                size="compact"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            ))}
          </div>
        </div>
      </section>

      <Closing
        eyebrow="Let’s talk"
        title="Bring this to your next conversation."
        text="Tell us what you are working on and we will help you take the next step."
        tone="sand"
        motif={false}
      />
    </>
  );
}
