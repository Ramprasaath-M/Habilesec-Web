import Image from "next/image";
import { Crumbs } from "@/components/ui/crumbs";
import { Closing } from "@/components/ui/closing";
import { ButtonLink } from "@/components/ui/links";
import { Presence } from "@/components/ui/presence";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import { company } from "@/data/site";
import { leaders } from "@/data/editorial";
import { differentiators } from "@/data/enterprise";
import { aboutVisual, founderVisuals } from "@/data/visuals";
import s from "./company-pages.module.css";

export function AboutPage() {
  return (
    <>
      <section className={s.aboutHero}>
        <div className="container">
          <Crumbs items={[{ label: "About HabileSec" }]} />
          <div className={s.aboutGrid}>
            <div className={s.aboutText}>
              <p className="eyebrow">About HabileSec</p>
              <h1 className={s.aboutTitle}>
                Security and progress belong together.
              </h1>
              <p className="lead">
                Founded in 2020, HabileSec brings cybersecurity, governance and
                secure digital engineering into a connected approach to
                business.
              </p>
              <ButtonLink href="/contact">Meet your next partner</ButtonLink>
            </div>
            <Reveal kind="mask" className={s.aboutFrame}>
              <Image
                src={aboutVisual.src}
                alt={aboutVisual.alt}
                fill
                priority
                sizes="(min-width: 1024px) 38vw, 100vw"
                style={{ objectPosition: aboutVisual.pos }}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sec bg-ivory" aria-labelledby="purpose-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Our purpose</p>
            <h2 id="purpose-title" className={s.purpose}>
              HabileSec was founded to help organizations move forward without
              compromising security.
            </h2>
            <p className={`lead ${s.purposeLead}`}>
              Our practices connect governance, compliance and engineering, so
              risk and delivery can inform each other.
            </p>
          </Reveal>
          <div className={s.mv}>
            <Reveal className={s.mvItem}>
              <h3>Our mission</h3>
              <p className={`serif-3 ${s.mvText}`}>{company.mission}</p>
            </Reveal>
            <Reveal className={s.mvItem} delay={120}>
              <h3>Our vision</h3>
              <p className={`serif-3 ${s.mvText}`}>{company.vision}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="why-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Why HabileSec</p>
            <h2 id="why-title" className={s.sectionTitle}>
              A practical approach to connected challenges.
            </h2>
          </Reveal>
          <ol className={s.principles}>
            {differentiators.map((d, i) => (
              <Reveal as="li" key={d.title} delay={i * 120}>
                <span className={`num ${s.big}`} aria-hidden="true">
                  0{i + 1}
                </span>
                <h3>{d.title}</h3>
                <p>{d.copy}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec bg-mist" aria-labelledby="leaders-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Leadership</p>
            <h2 id="leaders-title" className={s.sectionTitle}>
              Meet our founders.
            </h2>
          </Reveal>
          <div className={s.founders}>
            {leaders.map((l, i) => (
              <article key={l.name} className={s.founder}>
                <Reveal kind="mask" delay={i * 140} className={s.portrait}>
                  <Image
                    src={founderVisuals[i].src}
                    alt={founderVisuals[i].alt}
                    fill
                    sizes="(min-width: 1024px) 28vw, 80vw"
                    style={{ objectPosition: founderVisuals[i].pos }}
                  />
                </Reveal>
                <p className={s.role}>{l.role}</p>
                <h3 className={`serif-3 ${s.fname}`}>{l.name}</h3>
                <p>{l.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec--compact" aria-label="Where we work">
        <div className="container">
          <Presence />
        </div>
      </section>

      <Closing
        eyebrow="Work with us"
        title="Let’s build something secure together."
        text="Tell us what you are protecting, building or preparing for."
        tone="tint"
      />
    </>
  );
}

export function ContactPage() {
  return (
    <>
      <section className={s.contact}>
        <div className="container">
          <Crumbs items={[{ label: "Contact" }]} />
          <div className={s.contactGrid}>
            <div className={s.contactText}>
              <p className="eyebrow">Contact</p>
              <h1>Let’s start a conversation.</h1>
              <p className="lead">
                Tell us what you are protecting, building or preparing for. We
                will help you find the right expertise.
              </p>
              <dl className={s.details}>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${company.email}`}>{company.email}</a>
                  </dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a href="tel:+914353575243">{company.phone}</a>
                  </dd>
                </div>
                <div>
                  <dt>Head office</dt>
                  <dd>
                    <address>{company.address}</address>
                  </dd>
                </div>
                <div>
                  <dt>Business hours</dt>
                  <dd>Monday–Friday, 9:00 AM–6:00 PM IST</dd>
                </div>
              </dl>
            </div>
            <div className={s.panel}>
              <h2 className={s.panelTitle}>Your enquiry</h2>
              <p className={s.panelNote}>
                This form prepares an email draft. Your mail app sends the
                enquiry to our team.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <section className="sec--compact" aria-label="Where we work">
        <div className="container">
          <Presence note="Our head office is in Kumbakonam, with teams and delivery locations across India and international regions." />
        </div>
      </section>
    </>
  );
}
