import Image from "next/image";
import type { Visual } from "@/data/visuals";
import s from "./product-plate.module.css";

/**
 * Marketing overview of a product: a photograph with a capability sheet laid
 * over it. The sheet lists only capabilities named in the product data; it is
 * not a screenshot or a representation of the product interface.
 */
export function ProductPlate({
  name,
  features,
  visual,
  active = true,
  sizes = "(min-width: 1024px) 56vw, 100vw",
}: {
  name: string;
  features: readonly string[];
  visual: Visual;
  active?: boolean;
  sizes?: string;
}) {
  return (
    <div className={s.plate} data-active={active || undefined}>
      <div className={s.photo}>
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          sizes={sizes}
          style={{ objectPosition: visual.pos }}
        />
      </div>
      <div className={s.sheet}>
        <div className={s.head}>
          <span>{name}</span>
          <span>Capabilities</span>
        </div>
        <ol className={s.rows}>
          {features.map((f, i) => (
            <li key={f} style={{ "--i": i } as React.CSSProperties}>
              <span className={`num ${s.n}`}>0{i + 1}</span>
              <span>{f}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
