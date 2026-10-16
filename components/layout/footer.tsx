import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { capabilities } from "@/data/capabilities";
import { company, products, services } from "@/data/site";
import s from "./footer.module.css";

export function SiteFooter() {
  return (
    <footer className={s.footer}>
      <div className={`container ${s.grid}`}>
        <div className={s.brand}>
          <Link href="/" aria-label="HabileSec home" className={s.logo}>
            <Image
              src="/brand/habilesec-logo.png"
              width={164}
              height={45}
              alt="HabileSec"
            />
          </Link>
          <p className={`serif-3 ${s.statement}`}>
            Security and progress belong together.
          </p>
          <div className={s.contact}>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <a href="tel:+914353575243">{company.phone}</a>
            <address>{company.address}</address>
            <a
              href="https://linkedin.com/company/habilesec"
              target="_blank"
              rel="noopener noreferrer"
              className={s.social}
            >
              LinkedIn
              <ArrowUpRight size={16} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
        <nav aria-label="Services" className={s.col}>
          <h2 className={s.heading}>What we do</h2>
          {capabilities.map((c) => (
            <Link key={c.slug} href={`/what-we-do/${c.slug}`}>
              {c.name}
            </Link>
          ))}
        </nav>
        <nav aria-label="Practices and products" className={s.col}>
          <h2 className={s.heading}>Practices &amp; products</h2>
          {services.map((p) => (
            <Link key={p.slug} href={p.href}>
              {p.title}
            </Link>
          ))}
          {products.map((p) => (
            <Link key={p.slug} href={p.href}>
              {p.title}
            </Link>
          ))}
        </nav>
        <nav aria-label="Company" className={s.col}>
          <h2 className={s.heading}>Company</h2>
          <Link href="/about">About HabileSec</Link>
          <Link href="/industries">Industries</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
      <div className="container">
        <div className={s.bottom}>
          <p>© {new Date().getFullYear()} HabileSec India Pvt Ltd</p>
          <div>
            <Link href="/privacy-policy">Privacy policy</Link>
            <Link href="/terms-conditions">Terms &amp; conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
