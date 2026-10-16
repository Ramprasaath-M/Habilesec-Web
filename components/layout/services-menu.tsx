"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { capabilities } from "@/data/capabilities";
import { TextLink } from "@/components/ui/links";
import s from "./services-menu.module.css";

/**
 * Contents of the What We Do panel. Desktop: two columns, a numbered list with
 * a sliding active background and a cross-fading preview. Hover or focus only
 * changes the preview; clicking a name (or the preview link) navigates.
 * Mobile: the same links as plain rows, with no preview.
 */
export function ServicesMenu({ onNavigate }: { onNavigate: () => void }) {
  const [active, setActive] = useState(0);
  return (
    <div className={s.menu} style={{ "--i": active } as React.CSSProperties}>
      <div className={s.listCol}>
        <p className={s.heading}>Explore our capabilities</p>
        <div className={s.listWrap}>
          <span className={s.indicator} aria-hidden="true" />
          <ul className={s.list}>
            {capabilities.map((c, i) => (
              <li key={c.slug}>
                <Link
                  href={`/what-we-do/${c.slug}`}
                  className={s.link}
                  data-active={active === i || undefined}
                  onClick={onNavigate}
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") setActive(i);
                  }}
                  onFocus={() => setActive(i)}
                >
                  <span className={`num ${s.num}`}>{c.number}</span>
                  <span className={s.name}>{c.name}</span>
                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                    className={s.arrow}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.all}>
          <TextLink href="/what-we-do">All services</TextLink>
        </div>
      </div>
      <div className={s.previewCol} aria-live="polite">
        {capabilities.map((c, i) => (
          <div
            key={c.slug}
            className={s.preview}
            data-active={active === i || undefined}
          >
            <p className={s.previewKicker}>Capability {c.number}</p>
            <p className={`serif-3 ${s.previewName}`}>{c.name}</p>
            <p className={s.previewText}>{c.summary}</p>
            <Link
              href={`/what-we-do/${c.slug}`}
              className={`tlink ${s.previewLink}`}
              onClick={onNavigate}
              tabIndex={active === i ? 0 : -1}
            >
              Explore capability
              <ArrowRight size={17} aria-hidden="true" />
              <span className="sr-only"> — {c.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
