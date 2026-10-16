"use client";
import { useId, useState } from "react";
import Image from "next/image";
import { platformProducts } from "@/data/enterprise";
import { productVisuals, tanikkaiLogo } from "@/data/visuals";
import { ButtonLink, TextLink } from "@/components/ui/links";
import { ProductPlate } from "@/components/ui/product-plate";
import { Reveal } from "@/components/motion/reveal";
import { useTabKeys } from "@/components/ui/use-tabs";
import s from "./product-stage.module.css";

export function ProductStage() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const { onKeyDown, setRef } = useTabKeys(
    platformProducts.length,
    setActive,
    "horizontal",
  );

  return (
    <section className={`sec bg-mist ${s.section}`} aria-labelledby="products-title">
      <div className="container">
        <Reveal className={s.head}>
          <div>
            <p className="eyebrow">Our products</p>
            <h2 id="products-title" className={s.title}>
              Turn complex requirements into practical work.
            </h2>
          </div>
          <div
            className={s.tabs}
            role="tablist"
            aria-label="Products"
            aria-orientation="horizontal"
          >
            {platformProducts.map((p, i) => (
              <button
                key={p.slug}
                ref={setRef(i)}
                type="button"
                role="tab"
                id={`${uid}-tab-${i}`}
                aria-selected={active === i}
                aria-controls={`${uid}-panel-${i}`}
                tabIndex={active === i ? 0 : -1}
                className={s.tab}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                {p.name}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal className={s.stage} kind="fade" delay={100}>
          {platformProducts.map((p, i) => (
            <div
              key={p.slug}
              id={`${uid}-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`${uid}-tab-${i}`}
              className={s.panel}
              data-active={active === i || undefined}
              inert={active === i ? undefined : true}
            >
              <div className={s.info}>
                {p.slug === "tanikkai" && (
                  <Image
                    src={tanikkaiLogo.src}
                    alt={tanikkaiLogo.alt}
                    width={132}
                    height={42}
                    className={s.logo}
                  />
                )}
                <p className="eyebrow">{p.category}</p>
                <h3 className={`display ${s.name}`}>{p.name}</h3>
                <p className={`serif-3 ${s.summary}`}>{p.summary}</p>
                <p className={s.intro}>{p.intro}</p>
                <div className={s.actions}>
                  <ButtonLink href={`/products/${p.slug}`}>
                    Discover {p.name}
                  </ButtonLink>
                  <TextLink href={p.external} external>
                    Visit {p.name}
                  </TextLink>
                </div>
              </div>
              <div className={s.visual}>
                <ProductPlate
                  name={p.name}
                  features={p.features}
                  visual={productVisuals[p.slug]}
                  active={active === i}
                />
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal className={s.foot}>
          <p>Looking for certification and assessment support?</p>
          <TextLink href="/products/certanika">Explore Certanika</TextLink>
        </Reveal>
      </div>
    </section>
  );
}
