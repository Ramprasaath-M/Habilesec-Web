"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceCategories } from "@/data/service-categories";
import { serviceVisuals } from "@/data/visuals";
import s from "./service-index.module.css";

/**
 * Ruled index of the five service categories. On wide screens hovering or
 * focusing a row swaps the sticky preview image; on small screens each row
 * carries its own image.
 */
export function ServiceIndex() {
  const [current, setCurrent] = useState(0);
  return (
    <div className={s.wrap}>
      <ol className={s.list}>
        {serviceCategories.map((c, i) => {
          const v = serviceVisuals[c.slug];
          return (
            <li key={c.slug}>
              <Link
                href={`/what-we-do/${c.slug}`}
                className={s.row}
                data-current={current === i || undefined}
                onPointerEnter={() => setCurrent(i)}
                onFocus={() => setCurrent(i)}
              >
                <span className={`num ${s.num}`}>{c.number}</span>
                <span className={s.main}>
                  <span className={`serif-3 ${s.name}`}>{c.name}</span>
                  <span className={s.desc}>{c.description}</span>
                  <span className={s.thumb}>
                    <Image
                      src={v.src}
                      alt=""
                      fill
                      sizes="(min-width: 560px) 60vw, 100vw"
                      style={{ objectPosition: v.pos }}
                    />
                  </span>
                </span>
                <span className={s.tag}>{c.practiceName}</span>
                <ArrowUpRight size={24} aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ol>
      <div className={s.preview} aria-hidden="true">
        {serviceCategories.map((c, i) => (
          <Image
            key={c.slug}
            src={serviceVisuals[c.slug].src}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, 0px"
            data-on={current === i || undefined}
            style={{ objectPosition: serviceVisuals[c.slug].pos }}
          />
        ))}
      </div>
    </div>
  );
}
