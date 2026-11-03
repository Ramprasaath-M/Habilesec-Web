import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import styles from './security-hero.module.css';
import {ComplianceGlobe} from './compliance-globe';
import {InteractiveGridBackground} from './interactive-grid-background';

export function SecurityHero() {
  return <section className={styles.hero} aria-labelledby="security-hero-heading">
    <InteractiveGridBackground/>
    <div className={`f-container ${styles.layout}`}>
      <div className={styles.content}>
        <p className={styles.eyebrow} data-reveal>CYBERSECURITY &amp; RISK ASSURANCE</p>
        <h1 id="security-hero-heading" className={styles.heading}>Strengthening Security.<br/><span>Building Digital Trust.</span></h1>
        <p className={styles.description}>HabileSec helps organizations identify security vulnerabilities, manage cyber risks, and strengthen their security posture through comprehensive security testing, compliance, and advisory services.</p>
        <div className={styles.actions}>
          <Link className="f-button" href="/solutions">Explore Security Testing <ArrowUpRight size={18}/></Link>
          <Link className={`f-button ${styles.secondary}`} href="/contact-us">Talk to Our Experts</Link>
        </div>
      </div>
      <ComplianceGlobe/>
    </div>
  </section>;
}
