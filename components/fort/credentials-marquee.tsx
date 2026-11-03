import Image from 'next/image';
import styles from './credentials-marquee.module.css';

// Exact original assets and order from Habilesec EX's CREDENTIALS collection.
// These represent team/network qualifications and compliance frameworks;
// this collection does not establish company-held accreditation.
const credentials=[
  {name:'CIPP/E',file:'cipp-e.png',kind:'Professional qualification'},
  {name:'CISA',file:'cisa.png',kind:'Professional qualification'},
  {name:'CISM',file:'cism.png',kind:'Professional qualification'},
  {name:'CISSP',file:'cissp.png',kind:'Professional qualification'},
  {name:'CRISC',file:'crisc.png',kind:'Professional qualification'},
  {name:'OSCP',file:'oscp.png',kind:'Professional qualification'},
  {name:'PCI DSS',file:'pci-dss.png',kind:'Security standard'},
  {name:'HIPAA',file:'hipaa.png',kind:'Compliance framework'},
  {name:'CCPA',file:'ccpa.jpg',kind:'Privacy framework'},
  {name:'ISO',file:'iso.jpg',kind:'Standards organization'},
  {name:'CMMI',file:'cmmi.png',kind:'Capability maturity framework'},
];

function Logos({duplicate=false}:{duplicate?:boolean}) {
  return <ul className={styles.sequence} aria-hidden={duplicate||undefined}>
    {credentials.map(({name,file,kind})=><li key={name} className={styles.logo}>
      <div className={styles.image}><Image src={`/credentials/${file}`} alt={duplicate?'':`${name} — ${kind.toLowerCase()}`} fill sizes="136px"/></div>
      <span aria-hidden="true">{name}</span>
    </li>)}
  </ul>;
}

export function CredentialsMarquee() {
  return <section className={styles.section} aria-labelledby="credentials-heading" aria-describedby="credentials-context" data-credentials>
    <div className="f-container">
      <h2 id="credentials-heading">Our Certifications &amp; Accreditations</h2>
      <span id="credentials-context" className="sr-only">Professional qualifications, standards, and compliance frameworks represented across our team and partner network. These logos do not imply that every credential is held by the company.</span>
      <div className={styles.viewport} tabIndex={0} role="group" aria-label="Credential logos. Focus or hover to pause scrolling; reduced-motion users can scroll horizontally.">
        <div className={styles.track}><Logos/><Logos duplicate/></div>
      </div>
    </div>
  </section>;
}
