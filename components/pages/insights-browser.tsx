"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articles } from "@/data/editorial";
import { articleVisuals } from "@/data/visuals";
import { ArticleLink } from "@/components/ui/article-link";
import s from "./insights-pages.module.css";

export function InsightsBrowser({
  initialCategory = "All",
}: {
  initialCategory?: string;
}) {
  const categories = ["All", ...new Set(articles.map((a) => a.category))];
  const [active, setActive] = useState(
    categories.includes(initialCategory) ? initialCategory : "All",
  );
  const selected = articles.filter(
    (a) => active === "All" || a.category === active,
  );
  const [feature, ...rest] = selected;
  const fv = feature ? articleVisuals[feature.slug] : null;

  return (
    <>
      <div className={s.filters}>
        <div role="group" aria-label="Filter perspectives" className={s.chips}>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={active === c}
              onClick={() => setActive(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <p className={s.count} role="status">
          {selected.length} practice {selected.length === 1 ? "note" : "notes"}
        </p>
      </div>

      {feature && fv && (
        <Link
          href={`/insights/${feature.slug}`}
          className={s.feature}
          key={feature.slug}
        >
          <span className={s.featureFrame}>
            <Image
              src={fv.src}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              style={{ objectPosition: fv.pos }}
            />
          </span>
          <span className={s.featureText}>
            <span className={s.meta}>
              {feature.category} · {feature.readTime}
            </span>
            <span className={`serif-3 ${s.featureTitle}`}>
              <span className={s.ul}>{feature.title}</span>
            </span>
            <span className={s.featureSummary}>{feature.summary}</span>
            <span className={s.cue}>
              Read perspective <ArrowUpRight size={17} aria-hidden="true" />
            </span>
          </span>
        </Link>
      )}

      {rest.length > 0 && (
        <div className={s.grid}>
          {rest.map((a) => (
            <ArticleLink
              key={a.slug}
              article={a}
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          ))}
        </div>
      )}
    </>
  );
}
