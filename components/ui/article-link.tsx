import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { articleVisuals } from "@/data/visuals";
import s from "./article-link.module.css";

export type Article = {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
};

/**
 * Editorial article teaser. `size` changes typographic scale and image ratio;
 * the whole teaser is one link.
 */
export function ArticleLink({
  article,
  size = "standard",
  delay = 0,
  sizes,
}: {
  article: Article;
  size?: "feature" | "standard" | "compact";
  delay?: number;
  sizes: string;
}) {
  const v = articleVisuals[article.slug];
  return (
    <Link
      href={`/insights/${article.slug}`}
      className={`${s.link} ${s[size]}`}
    >
      <Reveal kind="mask" delay={delay} className={s.frame}>
        <Image
          src={v.src}
          alt=""
          fill
          sizes={sizes}
          style={{ objectPosition: v.pos }}
        />
      </Reveal>
      <p className={s.meta}>
        <span>{article.category}</span>
        <span aria-hidden="true">·</span>
        <span>{article.readTime}</span>
      </p>
      <h3 className={`serif-3 ${s.title}`}>
        <span className={s.ul}>{article.title}</span>
      </h3>
      {size !== "compact" && <p className={s.summary}>{article.summary}</p>}
      <span className={s.cue}>
        Read perspective
        <ArrowUpRight size={17} aria-hidden="true" />
      </span>
    </Link>
  );
}
