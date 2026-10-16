import type { ReactNode } from "react";
import { Crumbs, type Crumb } from "./crumbs";
import s from "./page-intro.module.css";

/**
 * Typographic page opening for pages that do not need a photographic hero.
 * `aside` sits in the right column on wide screens.
 */
export function PageIntro({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
  aside,
  tone = "paper",
  size = "standard",
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  aside?: ReactNode;
  tone?: "paper" | "mist" | "ivory";
  size?: "standard" | "large";
}) {
  return (
    <section className={`${s.intro} bg-${tone}`}>
      <div className="container">
        <Crumbs items={crumbs} />
        <div className={s.grid}>
          <div className={s.main}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className={size === "large" ? s.large : undefined}>{title}</h1>
            {lead && <p className={`lead ${s.lead}`}>{lead}</p>}
            {children && <div className={s.actions}>{children}</div>}
          </div>
          {aside && <div className={s.aside}>{aside}</div>}
        </div>
      </div>
    </section>
  );
}
