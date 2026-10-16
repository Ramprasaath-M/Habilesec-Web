import Link from "next/link";
import Image from "next/image";
import { company } from "@/data/site";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" aria-label="HabileSec home">
              <Image
                src="/brand/habilesec-logo.png"
                width={180}
                height={58}
                alt="HabileSec"
              />
            </Link>
            <p>
              Cybersecurity, governance and secure digital engineering for
              modern enterprises.
            </p>
            <a
              href="https://linkedin.com/company/habilesec"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn &#8599;
            </a>
          </div>
          <nav aria-label="Footer navigation">
            <p className="eyebrow">Explore</p>
            <Link href="/what-we-do">What We Do</Link>
            <Link href="/products">Products</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/industries">Industries</Link>
            <Link href="/about">About HabileSec</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <nav aria-label="Our practices">
            <p className="eyebrow">Our practices</p>
            <Link href="/services/grcloop">GRCLoop</Link>
            <Link href="/services/forgeloop">ForgeLoop</Link>
            <Link href="/services/hexn6">HexN6</Link>
          </nav>
          <div className="footer-contact">
            <p className="eyebrow">Get in touch</p>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <a href="tel:+914353575243">{company.phone}</a>
            <address>{company.address}</address>
          </div>
        </div>
        <div className="footer-bottom">
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
