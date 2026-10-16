import Image from "next/image";
import { ButtonLink, TextLink } from "@/components/ui/links";
import { Crumbs } from "@/components/ui/crumbs";
import { PageIntro } from "@/components/ui/page-intro";
import { Closing } from "@/components/ui/closing";
import { ProductPlate } from "@/components/ui/product-plate";
import { Reveal } from "@/components/motion/reveal";
import { platformProducts } from "@/data/enterprise";
import { products } from "@/data/site";
import { productVisuals, tanikkaiLogo } from "@/data/visuals";
import s from "./product-pages.module.css";

function Identity({ slug, name }: { slug: string; name: string }) {
  if (slug === "tanikkai")
    return (
      <Image
        src={tanikkaiLogo.src}
        alt={`${name} logo`}
        width={132}
        height={42}
        className={s.logo}
      />
    );
  return null;
}

export function ProductsLanding() {
  const certanika = products.find((p) => p.slug === "certanika");
  return (
    <>
      <PageIntro
        crumbs={[{ label: "Products" }]}
        eyebrow="Products"
        title="Make the complex manageable."
        lead="Platforms that bring structure to governance, compliance and ISO 27001 readiness."
        tone="mist"
        aside={
          <p className={s.count} aria-hidden="true">
            <span className="num">02</span>
            <span>platforms</span>
          </p>
        }
      />

      {platformProducts.map((p, i) => (
        <section
          key={p.slug}
          className={`sec ${i % 2 ? "bg-ivory" : ""}`}
          aria-labelledby={`${p.slug}-title`}
        >
          <div className={`container ${s.feature}`}>
            <Reveal className={s.featureText}>
              <Identity slug={p.slug} name={p.name} />
              <p className="eyebrow">{p.category}</p>
              <h2 id={`${p.slug}-title`} className={`display ${s.featureName}`}>
                {p.name}
              </h2>
              <p className={`serif-3 ${s.featureSummary}`}>{p.summary}</p>
              <p className={s.featureIntro}>{p.intro}</p>
              <div className={s.actions}>
                <ButtonLink href={`/products/${p.slug}`}>
                  Discover {p.name}
                </ButtonLink>
                <TextLink href={p.external} external>
                  Visit {p.name}
                </TextLink>
              </div>
            </Reveal>
            <Reveal kind="fade" delay={120} className={s.featureVisual}>
              <ProductPlate
                name={p.name}
                features={p.features}
                visual={productVisuals[p.slug]}
              />
            </Reveal>
          </div>
        </section>
      ))}

      {certanika && (
        <section className="sec bg-mist" aria-labelledby="certanika-title">
          <div className={`container ${s.cert}`}>
            <Reveal>
              <p className="eyebrow">{certanika.eyebrow}</p>
              <h2 id="certanika-title" className={s.certTitle}>
                Looking for Certanika?
              </h2>
              <p className={`lead ${s.certLead}`}>{certanika.summary}</p>
              <TextLink href="/products/certanika">About Certanika</TextLink>
            </Reveal>
            <Reveal delay={120}>
              <ul className={s.certList}>
                {certanika.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      <Closing
        eyebrow="Find the right fit"
        title="Technology, supported by expertise."
        text="Our product and advisory teams can help you understand where a platform fits in your organization."
        label="Talk to the product team"
        tone="tint"
      />
    </>
  );
}

export function PlatformDetail({ slug }: { slug: string }) {
  const item = platformProducts.find((p) => p.slug === slug)!;
  return (
    <>
      <section className={`bg-mist ${s.hero}`}>
        <div className="container">
          <Crumbs
            items={[
              { label: "Products", href: "/products" },
              { label: item.name },
            ]}
          />
          <div className={s.heroGrid}>
            <div className={s.heroText}>
              <Identity slug={item.slug} name={item.name} />
              <p className="eyebrow">{item.category}</p>
              <h1 className={s.heroTitle}>{item.name}</h1>
              <p className={`lead ${s.heroLead}`}>{item.summary}</p>
              <div className={s.actions}>
                <ButtonLink href="/contact">Talk to the product team</ButtonLink>
                <TextLink href={item.external} external>
                  Visit {item.name}
                </TextLink>
              </div>
            </div>
            <div className={s.heroVisual}>
              <ProductPlate
                name={item.name}
                features={item.features}
                visual={productVisuals[item.slug]}
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="cap-title">
        <div className={`container ${s.capGrid}`}>
          <Reveal className={s.capIntro}>
            <p className="eyebrow">Capabilities</p>
            <h2 id="cap-title" className={s.capTitle}>
              A connected way to work.
            </h2>
            <p className={s.capCopy}>{item.intro}</p>
          </Reveal>
          <ol className={s.capList}>
            {item.features.map((f, i) => (
              <Reveal as="li" key={f} delay={i * 80}>
                <span className={`num ${s.capNum}`}>0{i + 1}</span>
                <span className={`serif-3 ${s.capName}`}>{f}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec--compact bg-ivory" aria-label="Start with your requirements">
        <div className={`container ${s.begin}`}>
          <Reveal>
            <h2 className={s.beginTitle}>Start with your requirements.</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="lead">
              Discuss your current processes, requirements and readiness
              priorities with our team. We can help you evaluate the product
              against the way your organization works.
            </p>
            <div className={s.beginLink}>
              <TextLink href="/contact">Arrange a product conversation</TextLink>
            </div>
          </Reveal>
        </div>
      </section>

      <Closing
        eyebrow={item.name}
        title={`See where ${item.name} fits.`}
        text="Tell us how your team works today and we will talk through the options."
        label="Talk to the product team"
      />
    </>
  );
}

export function CertanikaDetail() {
  const c = products.find((p) => p.slug === "certanika")!;
  return (
    <>
      <PageIntro
        crumbs={[{ label: "Products", href: "/products" }, { label: "Certanika" }]}
        eyebrow={c.eyebrow}
        title="Certification and assessment."
        lead="Explore Certanika’s certification and assessment offering. For readiness, policies, controls and evidence management, discover the Certanika Lite platform."
        tone="mist"
      >
        <ButtonLink href="/contact">Discuss your requirements</ButtonLink>
        <TextLink href="https://certanika.com" external>
          Visit Certanika
        </TextLink>
      </PageIntro>

      <section className="sec" aria-labelledby="covers-title">
        <div className={`container ${s.cert}`}>
          <Reveal>
            <p className="eyebrow">What it covers</p>
            <h2 id="covers-title" className={s.certTitle}>
              Find the right support for your next step.
            </h2>
            <p className={`lead ${s.certLead}`}>
              Certification, assessment and readiness serve different needs.
              Speak with our team to understand the appropriate scope and
              engagement for your organization.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ul className={s.certList}>
              {c.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="sec--compact bg-ivory" aria-label="Related platform">
        <div className={`container ${s.begin}`}>
          <Reveal>
            <p className="eyebrow">Related offering</p>
            <h2 className={s.beginTitle}>Preparing for ISO 27001?</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="lead">
              Certanika Lite brings policies, controls, risks and audit-ready
              evidence into a guided workspace.
            </p>
            <div className={s.beginLink}>
              <TextLink href="/products/certanika-lite">
                Explore Certanika Lite readiness
              </TextLink>
            </div>
          </Reveal>
        </div>
      </section>

      <Closing
        eyebrow="Certanika"
        title="Let’s scope your certification path."
        text="Share your target standard and timeline and we will outline the next step."
        label="Discuss your requirements"
      />
    </>
  );
}
