import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ArrowLink, ButtonLink, SectionHeading, Talk } from "./shared";
import {
  CapabilityList,
  ChallengeExplorer,
  IndustryShowcase,
  ProductShowcase,
} from "./interactive";
import { differentiators } from "@/data/enterprise";
import { articles } from "@/data/editorial";
export function EnterpriseHome() {
  return (
    <>
      <section className="home-hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">HabileSec · Connected expertise</p>
              <h1>
                Confidence for
                <br className="desktop-break" /> what comes next
                <span className="brand-stop">.</span>
              </h1>
              <p>
                Cybersecurity, governance and secure engineering. Working
                together to help your business move forward.
              </p>
              <div className="hero-actions">
                <ButtonLink href="/what-we-do">
                  Explore our expertise
                </ButtonLink>
                <ArrowLink href="/contact">Talk to our team</ArrowLink>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-photo">
                <Image
                  src="/media/business-advisory.webp"
                  fill
                  loading="eager"
                  fetchPriority="high"
                  sizes="(min-width: 1000px) 46vw, 92vw"
                  alt="Business professionals collaborating around a conference table"
                />
              </div>
              <p>Business priorities. Connected expertise.</p>
            </div>
          </div>
          <div className="hero-practices">
            <span>One connected approach</span>
            {[
              {
                name: "GRCLoop",
                desc: "Governance & compliance",
                href: "/services/grcloop",
              },
              {
                name: "ForgeLoop",
                desc: "Secure engineering",
                href: "/services/forgeloop",
              },
              {
                name: "HexN6",
                desc: "Incident response",
                href: "/services/hexn6",
              },
            ].map((p) => (
              <Link key={p.name} href={p.href}>
                <span>
                  {p.name}
                  <small>{p.desc}</small>
                </span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section alternate" aria-labelledby="begin-title">
        <div className="container split-section">
          <div className="section-copy">
            <p className="eyebrow">Where do you begin?</p>
            <h2 id="begin-title">Start with the challenge in front of you.</h2>
            <p>
              Every organization has a different starting point. Find the
              expertise that fits yours.
            </p>
          </div>
          <ChallengeExplorer />
        </div>
      </section>
      <section className="section" aria-labelledby="expertise-title">
        <div className="container">
          <SectionHeading
            id="expertise-title"
            label="What we do"
            title="The right expertise. A connected approach."
            copy="Protect what matters, meet your obligations and build what comes next."
          />
          <div className="capabilities-grid">
            <div className="capability-intro">
              <p>
                From strategy to implementation, our capabilities connect
                security, compliance and technology.
              </p>
              <ArrowLink href="/what-we-do">Explore all services</ArrowLink>
            </div>
            <div>
              <CapabilityList />
            </div>
          </div>
        </div>
      </section>
      <section className="section alternate">
        <div className="container">
          <SectionHeading
            label="Our products"
            title="Turn complex requirements into practical work."
            copy="Purpose-built platforms for governance, compliance and readiness."
          />
          <ProductShowcase />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading
            label="Industries we serve"
            title="Your sector. Its own perspective."
            copy="Security and engineering shaped around the realities of your industry."
          >
            <ArrowLink href="/industries">Explore industries</ArrowLink>
          </SectionHeading>
          <IndustryShowcase />
        </div>
      </section>
      <section className="section alternate">
        <div className="container">
          <SectionHeading
            label="The HabileSec perspective"
            title="Ideas to inform your next decision."
          >
            <ArrowLink href="/insights">All perspectives</ArrowLink>
          </SectionHeading>
          <div className="editorial-grid">
            {articles.slice(0, 3).map((a, i) => (
              <Link
                key={a.slug}
                href={`/insights/${a.slug}`}
                className="editorial-card"
              >
                <div className="editorial-image">
                  <Image
                    src={
                      i === 1
                        ? "/media/secure-engineering.webp"
                        : "/media/business-advisory.webp"
                    }
                    alt=""
                    fill
                    sizes="(min-width: 900px) 30vw, 90vw"
                  />
                </div>
                <p className="eyebrow">{a.category} · Practice note</p>
                <h3>{a.title}</h3>
                <p>{a.summary}</p>
                <span className="text-link">
                  Read perspective
                  <ArrowUpRight size={18} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container why-grid">
          <div className="why-photo">
            <Image
              src="/media/secure-engineering.webp"
              alt="Engineers collaborating in a professional workspace"
              fill
              sizes="(min-width: 1000px) 42vw, 90vw"
            />
          </div>
          <div>
            <p className="eyebrow">Why HabileSec?</p>
            <h2>
              Advice that connects
              <br className="desktop-break" /> to action.
            </h2>
            <p className="section-intro">
              A business-focused approach to security, governance and digital
              delivery.
            </p>
            <div className="differentiators">
              {differentiators.map((d, i) => (
                <div key={d.title}>
                  <span className="item-number">0{i + 1}</span>
                  <div>
                    <h3>{d.title}</h3>
                    <p>{d.copy}</p>
                  </div>
                </div>
              ))}
            </div>
            <ArrowLink href="/about">Get to know HabileSec</ArrowLink>
          </div>
        </div>
      </section>
      <Talk />
    </>
  );
}
