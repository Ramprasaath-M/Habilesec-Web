'use client';

import {useEffect,useRef,useState} from 'react';
import {Plus,Minus} from 'lucide-react';
import {GearAssembly} from './gear-assembly';
import {InteractiveGridBackground} from './interactive-grid-background';
import styles from './gear-capabilities.module.css';

// Dedicated /what-we-do/[slug] pages currently redirect to /solutions.
// Keep navigation explicitly unavailable until real capability content exists.
const capabilities=[
  {slug:'security-testing',title:'Security Testing',description:"Identify vulnerabilities across applications, networks, APIs, and infrastructure to strengthen your organization's security posture.",button:'Explore Security Testing'},
  {slug:'governance-risk-compliance',title:'Governance, Risk & Compliance',description:'Strengthen governance, manage organizational risks, and align security practices with relevant standards and regulatory requirements.',button:'Explore GRC'},
  {slug:'cloud-devops',title:'Cloud & DevSecOps',description:'Build secure cloud environments and integrate security into development, deployment, and operational workflows.',button:'Explore Cloud & DevSecOps'},
  {slug:'security-operations',title:'Security Operations',description:'Improve threat visibility, strengthen monitoring, and support timely detection and response to security incidents.',button:'Explore Security Operations'},
  {slug:'security-advisory',title:'Security Advisory',description:'Make informed security decisions through strategic guidance, risk assessments, and practical security recommendations.',button:'Explore Security Advisory'},
  {slug:'software-engineering',title:'Software Engineering',description:'Design and develop reliable, scalable, and secure digital solutions aligned with your business requirements.',button:'Explore Software Engineering'},
  {slug:'ai-iot-blockchain',title:'AI, IoT & Blockchain',description:'Explore emerging technologies and develop innovative digital solutions with security and business needs in mind.',button:'Explore AI, IoT & Blockchain'},
];

export function GearCapabilities() {
  const [active,setActive]=useState<number|null>(null);
  const root=useRef<HTMLElement>(null);
  const buttons=useRef<(HTMLButtonElement|null)[]>([]);
  useEffect(()=>{
    if(active===null)return;
    const outside=(e:PointerEvent)=>{if(!(e.target as Element).closest('[data-capability-card]'))setActive(null);};
    const escape=(e:KeyboardEvent)=>{if(e.key==='Escape'){setActive(null);buttons.current[active]?.focus();}};
    document.addEventListener('pointerdown',outside);document.addEventListener('keydown',escape);
    return ()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape);};
  },[active]);
  return <section ref={root} className={styles.section} aria-labelledby="gear-capabilities-title" data-gear-capabilities>
    <InteractiveGridBackground/>
    <div className={`f-container ${styles.content}`}>
      <header className={styles.heading}>
        <p className="f-label" data-reveal data-align="center">WHAT WE DO</p>
        <h2 id="gear-capabilities-title">Explore Our End-to-End Cybersecurity Capabilities</h2>
        <p>From security testing and compliance to cloud, engineering, and advisory, HabileSec helps organizations strengthen security and advance their digital environments.</p>
      </header>
      <div className={styles.stage}>
        <GearAssembly/>
        <div className={styles.labels}>
          {capabilities.map(({slug,title,description,button},i)=><div key={title} id={`capability-${slug}`} data-capability-card data-open={active===i} className={`${styles.labelItem} ${styles[`label${i}`]}`}>
            <div className={styles.floatingCard}>
              <button ref={el=>{buttons.current[i]=el;}} type="button" className={styles.label} aria-expanded={active===i} aria-controls={`gear-popover-${i}`} id={`gear-capability-${i}`} onClick={()=>setActive(active===i?null:i)}>
                <span>{title}</span>{active===i?<Minus size={22} aria-hidden="true"/>:<Plus size={22} aria-hidden="true"/>}
              </button>
              <div className={styles.popover} id={`gear-popover-${i}`} hidden={active!==i} role="region" aria-labelledby={`gear-capability-${i}`}>
                <p>{description}</p>
                <button className={styles.explore} type="button" aria-disabled="true" title="The dedicated capability page is not yet available." aria-describedby={`gear-route-note-${i}`}>{button}</button>
                <span className="sr-only" id={`gear-route-note-${i}`}>The dedicated capability page is not yet available. Navigation is disabled rather than linking to an unrelated page.</span>
              </div>
            </div>
          </div>)}
        </div>
      </div>

    </div>
  </section>;
}
