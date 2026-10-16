import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articles } from "@/data/editorial";
import { TextLink } from "@/components/ui/links";
import { ArticleLink } from "@/components/ui/article-link";
import { Reveal } from "@/components/motion/reveal";
import s from "./insights-editorial.module.css";

/** Asymmetric publication layout: one feature, two supporting pieces, an index. */
export function InsightsEditorial() {
  const [feature, ...rest] = articles;
  const side = rest.slice(0, 2);
  const more = rest.slice(2);
  return (
    <section className="sec bg-ivory" aria-labelledby="insights-title">
      <div className="container">
        <Reveal className={s.masthead}>
          <p className="eyebrow">The HabileSec perspective</p>
          <h2 id="insights-title" className={s.title}>
            Ideas to inform your next decision.
          </h2>
          <TextLink href="/insights" className={s.all}>
            All perspectives
          </TextLink>
        </Reveal>

        <div className={s.grid}>
          <ArticleLink
            article={feature}
            size="feature"
            sizes="(min-width: 1024px) 56vw, 100vw"
          />
          <div className={s.side}>
            {side.map((a, i) => (
              <ArticleLink
                key={a.slug}
                article={a}
                size="compact"
                delay={120 * (i + 1)}
                sizes="(min-width: 1024px) 34vw, (min-width: 560px) 50vw, 100vw"
              />
            ))}
          </div>
        </div>

        {more.length > 0 && (
          <Reveal as="div" kind="fade" className={s.more}>
            <p className={s.moreLabel}>More practice notes</p>
            <ul>
              {more.map((a) => (
                <li key={a.slug}>
                  <Link href={`/insights/${a.slug}`} className={s.row}>
                    <span className={s.rowCat}>{a.category}</span>
                    <span className={`serif-3 ${s.rowTitle}`}>{a.title}</span>
                    <span className={s.rowTime}>{a.readTime}</span>
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
