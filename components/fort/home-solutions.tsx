import {ShieldCheck,ScanSearch,CloudCog,Activity,LockKeyhole,ClipboardCheck} from 'lucide-react';
import {CyberThreatMap} from './cyber-threat-map';
import {InteractiveGridBackground} from './interactive-grid-background';
import styles from './home-solutions.module.css';

const solutions = [
  {title:'Cyber Risk & Compliance',description:'Identify cyber risks, strengthen governance, and align security practices with regulatory and industry requirements.',icon:ShieldCheck},
  {title:'Application & Infrastructure Security',description:'Assess applications, APIs, networks, and infrastructure to identify vulnerabilities and improve security.',icon:ScanSearch},
  {title:'Cloud & DevSecOps Security',description:'Strengthen cloud environments and integrate security throughout development and deployment.',icon:CloudCog},
  {title:'Security Monitoring & Response',description:'Improve threat visibility, detect security incidents, and support effective incident response.',icon:Activity},
  {title:'Data Privacy & Protection',description:'Protect sensitive information and support privacy compliance through practical security controls.',icon:LockKeyhole},
  {title:'Security Advisory & Governance',description:'Strengthen security strategy, governance, and decision-making through expert advisory services.',icon:ClipboardCheck},
];

export function HomeSolutions() {
  return <section className={styles.section} aria-labelledby="habilesec-solutions-title" data-home-solutions>
    <InteractiveGridBackground/>
    <div className={`f-container ${styles.content}`}>
      <header className={styles.heading}>
        <p className="f-label" data-reveal data-align="center">HABILESEC SOLUTIONS</p>
        <h2 id="habilesec-solutions-title">Securing Your Digital Future</h2>
        <p className={styles.intro}>Practical cybersecurity, risk management, and compliance solutions to help organizations operate with confidence.</p>
      </header>
      <div className={styles.composition}>
        <CyberThreatMap/>
        <div className={styles.cards}>
          {solutions.map(({title,description,icon:Icon},i)=><article className={styles.card} key={title}>
            <div className={styles.cardTop}><Icon size={30} strokeWidth={1.4} aria-hidden="true"/><span>{String(i+1).padStart(2,'0')}</span></div>
            <div><h3>{title}</h3><p>{description}</p></div>
          </article>)}
        </div>
      </div>
    </div>
  </section>;
}
