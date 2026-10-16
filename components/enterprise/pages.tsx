import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  ArrowLink,
  ButtonLink,
  PageHero,
  SectionHeading,
  Talk,
} from "./shared";
import {
  CapabilityList,
  PerspectiveBrowser,
  ProductShowcase,
} from "./interactive";
import { company, industries, services } from "@/data/site";
import {
  serviceCategories,
  type ServiceCategory,
} from "@/data/service-categories";
import { articles, leaders, practiceDetails } from "@/data/editorial";
import {
  differentiators,
  industryAlt,
  industryMedia,
  platformProducts,
  serviceMedia,
} from "@/data/enterprise";
import { ContactForm } from "@/components/sections/contact-form";

export function ServicesLanding() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Expertise for the decisions ahead."
        copy="Cybersecurity, governance, privacy and engineering. Connected around your business priorities."
        image="/media/business-advisory.webp"
        imageAlt="Professionals reviewing business priorities"
      >
        <ButtonLink href="#capabilities">Find your expertise</ButtonLink>
      </PageHero>
      <section id="capabilities" className="section">
        <div className="container capabilities-grid">
          <div className="section-copy">
            <p className="eyebrow">Our capabilities</p>
            <h2>From understanding risk to making progress.</h2>
            <p>Explore the capabilities that support your next step.</p>
          </div>
          <CapabilityList />
        </div>
      </section>
      <section className="section alternate">
        <div className="container">
          <SectionHeading
            label="Our practices"
            title="Three practices. One connected model."
          />
          <div className="practice-cards">
            {services.map((s) => (
              <Link href={s.href} key={s.slug} className="practice-card">
                <p className="eyebrow">{s.eyebrow}</p>
                <h3>{s.title}</h3>
                <p>{s.summary}</p>
                <span className="text-link">
                  Explore the practice
                  <ArrowUpRight size={18} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Talk />
    </>
  );
}
export function ServiceDetail({ category }: { category: ServiceCategory }) {
  return (
    <>
      <PageHero
        eyebrow={`What We Do / ${category.name}`}
        title={category.headline}
        copy={category.description}
        image={serviceMedia[category.slug]}
        imageAlt={
          category.slug === "governance-compliance" ||
          category.slug === "data-privacy"
            ? "Professionals discussing business priorities"
            : "A software engineering team at work"
        }
      >
        <ButtonLink href="/contact">Discuss your requirements</ButtonLink>
      </PageHero>
      <section className="section">
        <div className="container detail-layout">
          <aside className="page-index">
            <p className="eyebrow">On this page</p>
            <a href="#overview">Overview</a>
            <a href="#services">Our services</a>
            <a href="#approach">Our approach</a>
            <Link href={`/services/${category.practice}`}>
              {category.practiceName} practice &#8599;
            </Link>
          </aside>
          <div>
            <section id="overview" className="detail-section">
              <p className="eyebrow">A practical perspective</p>
              <h2>{category.name}, connected to your business.</h2>
              <p>{category.overview}</p>
              <ul className="clean-list">
                {category.challenges.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>
            <section id="services" className="detail-section">
              <h2>How we can help</h2>
              <div className="service-detail-list">
                {category.services.map((service) => (
                  <article key={service.id} id={service.id}>
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                  </article>
                ))}
              </div>
            </section>
            <section id="approach" className="detail-section">
              <h2>Our approach</h2>
              <ol className="step-list">
                {category.approach.map((step, i) => (
                  <li key={step.title}>
                    <span>0{i + 1}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.copy}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </section>
      <Talk />
    </>
  );
}
export function PracticeDetail({
  slug,
}: {
  slug: keyof typeof practiceDetails;
}) {
  const item = services.find((s) => s.slug === slug)!;
  const detail = practiceDetails[slug];
  return (
    <>
      <PageHero
        eyebrow={`Our practices / ${item.title}`}
        title={detail.title}
        copy={detail.introduction}
        image={
          slug === "grcloop"
            ? "/media/business-advisory.webp"
            : "/media/secure-engineering.webp"
        }
        imageAlt="Professionals working together"
      >
        <ButtonLink href="/contact">Discuss {item.title}</ButtonLink>
      </PageHero>
      <section className="section">
        <div className="container">
          <SectionHeading
            label="The practice"
            title={item.shortTitle}
            copy={item.summary}
          />
          <div className="detail-grid">
            {detail.groups.map((group) => (
              <article key={group.id} id={group.id}>
                <h3>{group.title}</h3>
                <p>{group.copy}</p>
                <ul className="clean-list">
                  {group.items.map((text) => (
                    <li key={text}>{text}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section alternate">
        <div className="container">
          <SectionHeading
            label="How we work"
            title="A repeatable approach to delivery."
          />
          <ol className="process-strip">
            {detail.lifecycle.map((step, i) => (
              <li key={step.title}>
                <span className="item-number">0{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <Talk />
    </>
  );
}
export function ProductsLanding() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Make the complex manageable."
        copy="Platforms that bring structure to governance, compliance and ISO 27001 readiness."
      >
        <ButtonLink href="#platforms">Explore our platforms</ButtonLink>
      </PageHero>
      <section id="platforms" className="section">
        <div className="container">
          <ProductShowcase />
        </div>
      </section>
      <section className="section alternate">
        <div className="container split-section">
          <SectionHeading
            label="Find the right fit"
            title="Technology, supported by expertise."
            copy="Our product and advisory teams can help you understand where a platform fits in your organization."
          />
          <div className="plain-callout">
            <h3>Looking for Certanika?</h3>
            <p>
              Explore the certification and assessment offering alongside our
              software platforms.
            </p>
            <ArrowLink href="/products/certanika">About Certanika</ArrowLink>
          </div>
        </div>
      </section>
      <Talk />
    </>
  );
}
export function PlatformDetail({ slug }: { slug: string }) {
  const item = platformProducts.find((p) => p.slug === slug)!;
  return (
    <>
      <PageHero
        eyebrow={`Products / ${item.name}`}
        title={item.name}
        copy={item.summary}
      >
        <ButtonLink href="/contact">Talk to the product team</ButtonLink>
        <a
          className="text-link"
          href={item.external}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit {item.name}
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </PageHero>
      <section className="section">
        <div className="container split-section">
          <div className="section-copy">
            <p className="eyebrow">{item.category}</p>
            <h2>A connected way to work.</h2>
            <p>{item.intro}</p>
          </div>
          <ol className="feature-list">
            {item.features.map((feature, i) => (
              <li key={feature}>
                <span className="item-number">0{i + 1}</span>
                <h3>{feature}</h3>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section alternate">
        <div className="container split-section">
          <h2>Start with your requirements.</h2>
          <div className="prose">
            <p>
              Discuss your current processes, requirements and readiness
              priorities with our team. We can help you evaluate the product
              against the way your organization works.
            </p>
            <ArrowLink href="/contact">
              Arrange a product conversation
            </ArrowLink>
          </div>
        </div>
      </section>
      <Talk />
    </>
  );
}
export function CertanikaDetail() {
  return (
    <>
      <PageHero
        eyebrow="Certanika"
        title="Certification and assessment."
        copy="Explore Certanika's certification and assessment offering. For readiness, policies, controls and evidence management, discover the Certanika Lite platform."
      >
        <ButtonLink href="/contact">Discuss your requirements</ButtonLink>
      </PageHero>
      <section className="section">
        <div className="container split-section">
          <div>
            <p className="eyebrow">Related offering</p>
            <h2>Find the right support for your next step.</h2>
          </div>
          <div className="prose">
            <p>
              Certification, assessment and readiness serve different needs.
              Speak with our team to understand the appropriate scope and
              engagement for your organization.
            </p>
            <ArrowLink href="/products/certanika-lite">
              Explore Certanika Lite readiness
            </ArrowLink>
            <a
              className="text-link"
              href="https://certanika.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Certanika
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <Talk />
    </>
  );
}
export function IndustriesLanding() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Expertise in your context."
        copy="Different sectors bring different risks, responsibilities and opportunities. Explore how our capabilities support your industry."
      />
      <section className="section">
        <div className="container sector-grid">
          {industries.map((item) => (
            <Link
              href={`/industries/${item.slug}`}
              className="sector-card"
              key={item.slug}
            >
              <div className="sector-image">
                <Image
                  src={industryMedia[item.slug]}
                  alt={industryAlt[item.slug]}
                  fill
                  sizes="(min-width: 1000px) 30vw, (min-width: 640px) 45vw, 90vw"
                />
              </div>
              <h2>
                {item.name}
                <ArrowUpRight size={22} aria-hidden="true" />
              </h2>
              <p>{item.challenge}</p>
            </Link>
          ))}
        </div>
      </section>
      <Talk />
    </>
  );
}
export function IndustryDetail({ slug }: { slug: string }) {
  const item = industries.find((i) => i.slug === slug)!;
  return (
    <>
      <PageHero
        eyebrow={`Industries / ${item.name}`}
        title={item.name}
        copy={item.challenge}
        image={industryMedia[slug]}
        imageAlt={industryAlt[slug]}
      >
        <ButtonLink href="/contact">Discuss your sector</ButtonLink>
      </PageHero>
      <section className="section">
        <div className="container split-section">
          <div>
            <p className="eyebrow">The sector context</p>
            <h2>
              Understand the risk.
              <br className="desktop-break" /> Plan the response.
            </h2>
          </div>
          <div className="detail-grid single">
            <article>
              <h3>What organizations face</h3>
              <ul className="clean-list">
                {item.risk.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3>How we can help</h3>
              <ul className="clean-list">
                {item.helps.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>
      <section className="section alternate">
        <div className="container">
          <SectionHeading
            label="Connected capabilities"
            title="Bring the right expertise together."
          />
          <div className="practice-cards">
            {services.map((s) => (
              <Link className="practice-card" href={s.href} key={s.slug}>
                <p className="eyebrow">{s.eyebrow}</p>
                <h3>{s.title}</h3>
                <p>{s.summary}</p>
                <span className="text-link">
                  Explore practice
                  <ArrowUpRight size={18} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Talk />
    </>
  );
}
export function InsightsLanding({ category }: { category?: string }) {
  return (
    <>
      <PageHero
        eyebrow="The HabileSec Perspective"
        title="Clarity for the decisions that matter."
        copy="Practice notes on governance, cybersecurity, privacy and secure engineering. Useful starting points for your next conversation."
      />
      <section className="section">
        <div className="container">
          <PerspectiveBrowser initialCategory={category} />
        </div>
      </section>
      <Talk />
    </>
  );
}
export function PerspectiveDetail({ slug }: { slug: string }) {
  const item = articles.find((a) => a.slug === slug)!;
  return (
    <>
      <PageHero
        eyebrow={`${item.category} / Practice note`}
        title={item.title}
        copy={item.summary}
      />
      <section className="section">
        <div className="container article-layout">
          <aside className="page-index">
            <p className="eyebrow">In this perspective</p>
            {item.sections.map((s, i) => (
              <a href={`#part-${i + 1}`} key={s.title}>
                {s.title}
              </a>
            ))}
          </aside>
          <article className="article-prose">
            {item.sections.map((s, i) => (
              <section id={`part-${i + 1}`} key={s.title}>
                <h2>{s.title}</h2>
                <p>{s.copy}</p>
              </section>
            ))}
            <p className="article-note">
              HabileSec practice notes. General guidance based on our
              governance, engineering and response capabilities.
            </p>
            <ArrowLink href="/contact">Discuss this with our team</ArrowLink>
            <div className="article-return">
              <ArrowLink href="/insights">All perspectives</ArrowLink>
            </div>
          </article>
        </div>
      </section>
      <Talk compact />
    </>
  );
}
export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About HabileSec"
        title="Security and progress belong together."
        copy="Founded in 2020, HabileSec brings cybersecurity, governance and secure digital engineering into a connected approach to business."
        image="/media/business-advisory.webp"
        imageAlt="A team discussing business strategy"
      >
        <ButtonLink href="/contact">Meet your next partner</ButtonLink>
      </PageHero>
      <section className="section">
        <div className="container split-section">
          <div>
            <p className="eyebrow">Our purpose</p>
            <h2>Built around your business.</h2>
          </div>
          <div className="prose">
            <p>
              HabileSec was founded to help organizations move forward without
              compromising security. Our practices connect governance,
              compliance and engineering, so risk and delivery can inform each
              other.
            </p>
            <h3>Our mission</h3>
            <p>{company.mission}</p>
            <h3>Our vision</h3>
            <p>{company.vision}</p>
          </div>
        </div>
      </section>
      <section className="section alternate">
        <div className="container">
          <SectionHeading
            label="Why HabileSec"
            title="A practical approach to connected challenges."
          />
          <div className="principle-grid">
            {differentiators.map((d, i) => (
              <article key={d.title}>
                <span className="item-number">0{i + 1}</span>
                <h3>{d.title}</h3>
                <p>{d.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading
            label="Leadership"
            title="Meet our founders."
            copy="The people behind HabileSec's approach to governance and secure engineering."
          />
          <div className="founder-grid">
            {leaders.map((leader, i) => (
              <article className="founder" key={leader.name}>
                <div className="founder-image">
                  <Image
                    src={
                      i === 0
                        ? "/media/kalaivani-srinivasan.webp"
                        : "/media/srinivasan-mahalingam.webp"
                    }
                    alt={leader.name}
                    fill
                    sizes="(min-width: 768px) 40vw, 90vw"
                    style={{ objectPosition: i === 0 ? "50% 26%" : "50% 34%" }}
                  />
                </div>
                <p className="eyebrow">{leader.role}</p>
                <h3>{leader.name}</h3>
                <p>{leader.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Talk />
    </>
  );
}
export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's start a conversation."
        copy="Tell us what you are protecting, building or preparing for. We will help you find the right expertise."
      />
      <section className="section">
        <div className="container contact-grid">
          <div>
            <p className="eyebrow">Get in touch</p>
            <h2>We&apos;re ready to listen.</h2>
            <div className="contact-detail">
              <h3>Email</h3>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </div>
            <div className="contact-detail">
              <h3>Phone</h3>
              <a href="tel:+914353575243">{company.phone}</a>
            </div>
            <div className="contact-detail">
              <h3>Head office</h3>
              <address>{company.address}</address>
            </div>
            <div className="contact-detail">
              <h3>Business hours</h3>
              <p>Monday–Friday, 9:00 AM–6:00 PM IST</p>
            </div>
          </div>
          <div className="enquiry-panel">
            <h2>Your enquiry</h2>
            <p>
              This form prepares an email draft. Your mail app sends the enquiry
              to our team.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
      <section className="section alternate">
        <div className="container">
          <SectionHeading
            label="Our presence"
            title="Connected teams across India."
          />
          <div className="locations-row">
            {[
              "Kumbakonam · Head office",
              "Bangalore",
              "Ahmedabad",
              "Bhilwara",
              "Hyderabad",
            ].map((city) => (
              <span key={city}>{city}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
export function OurWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Connecting expertise with execution."
        copy="Explore how our governance, secure engineering and incident response practices approach business challenges."
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            label="Our approach"
            title="Practical work, connected across disciplines."
          />
          <div className="practice-cards">
            {services.map((s) => (
              <Link className="practice-card" key={s.slug} href={s.href}>
                <p className="eyebrow">{s.eyebrow}</p>
                <h3>{s.title}</h3>
                <p>{s.summary}</p>
                <span className="text-link">
                  Explore our approach
                  <ArrowUpRight size={18} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Talk />
    </>
  );
}
export const allServiceSlugs = serviceCategories.map((c) => c.slug);
