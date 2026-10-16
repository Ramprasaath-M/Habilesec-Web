import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link className={`text-link ${className}`} href={href}>
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </Link>
  );
}
export function ButtonLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`e-button ${secondary ? "e-button-secondary" : ""}`}
    >
      {children}
      <ArrowRight size={18} aria-hidden="true" />
    </Link>
  );
}
export function SectionHeading({
  label,
  title,
  copy,
  children,
  id,
}: {
  label: string;
  title: string;
  copy?: string;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <div className="section-head">
      <div>
        <p className="eyebrow">{label}</p>
        <h2 id={id}>{title}</h2>
        {copy && <p className="section-intro">{copy}</p>}
      </div>
      {children}
    </div>
  );
}
export function PageHero({
  eyebrow,
  title,
  copy,
  image,
  imageAlt = "",
  children,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className={`container ${image ? "page-hero-grid" : ""}`}>
        <div>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>{eyebrow}</span>
          </nav>
          <h1>{title}</h1>
          <p className="page-lead">{copy}</p>
          {children && <div className="hero-actions">{children}</div>}
        </div>
        {image && (
          <div className="page-hero-image">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width: 1000px) 40vw, 90vw"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        )}
      </div>
    </section>
  );
}
export function Talk({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`talk-section ${compact ? "talk-compact" : ""}`}>
      <div className="container talk-grid">
        <div>
          <p className="eyebrow">Let&apos;s talk</p>
          <h2>
            A clearer path starts
            <br className="desktop-break" /> with a conversation.
          </h2>
          <p>Tell us what you are protecting, building or preparing for.</p>
        </div>
        <ButtonLink href="/contact">Start a conversation</ButtonLink>
      </div>
    </section>
  );
}
