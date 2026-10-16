"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { capabilities } from "@/data/capabilities";
import s from "./services-menu.module.css";

/**
 * Contents of the What We Do panel. Desktop: the seven categories on the left
 * and the selected category's sub-services on the right. Hover or focus only
 * changes the right side; clicking a category navigates. Mobile: plain rows.
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
                  <span className={s.name}>{c.name}</span>
                  <ArrowRight size={16} aria-hidden="true" className={s.arrow} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/what-we-do" className={s.all} onClick={onNavigate}>
          All services
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
      <div className={s.detailCol} aria-live="polite">
        {capabilities.map((c, i) => (
          <div
            key={c.slug}
            className={s.detail}
            data-active={active === i || undefined}
          >
            <p className={s.detailHeading}>{c.name}</p>
            <ul className={s.subs}>
              {c.services.map((sub) => (
                <li key={sub}>{sub}</li>
              ))}
            </ul>
            <Link
              href={`/what-we-do/${c.slug}`}
              className={s.detailLink}
              onClick={onNavigate}
              tabIndex={active === i ? 0 : -1}
            >
              Explore {c.name}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
