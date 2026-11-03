import Image from 'next/image';
import logos from '@/data/partner-network.json';
import styles from './client-partner-network.module.css';

function LogoSequence({items,duplicate=false}:{items:typeof logos;duplicate?:boolean}) {
  return <ul className={styles.sequence} aria-hidden={duplicate||undefined}>
    {items.map(logo=><li key={logo.name} className={styles.logo}>
      <div><Image src={logo.src} alt={duplicate?'':`${logo.name} logo`} fill sizes="(max-width:767px) 108px, 140px"/></div>
    </li>)}
  </ul>;
}

export function ClientPartnerNetwork() {
  const rows=[logos.slice(0,6),logos.slice(6)];
  return <section className={styles.section} aria-labelledby="client-partner-network-title" data-client-partner-network>
    <div className="f-container">
      <header className={styles.heading}>
        <p className="f-label" data-reveal data-align="center">OUR CLIENT &amp; PARTNER NETWORK</p>
        <h2 id="client-partner-network-title">Building Trusted Relationships Since 2020.</h2>
        <p>Since 2020, HabileSec has worked with organizations across industries, supporting their cybersecurity, compliance, cloud, and technology needs. Our growing client and partner network reflects our commitment to collaboration, practical solutions, and lasting relationships.</p>
      </header>
      <div className={styles.rows}>
        {rows.map((items,i)=><div key={i} className={`${styles.row} ${i===1?styles.reverse:''}`} tabIndex={0} role="group" aria-label={`Client and partner logos, row ${i+1}. Hover or focus to pause.`} data-network-row={i+1}>
          <div className={styles.track}>
            <LogoSequence items={items}/>
            {/* Three copies maintain full coverage even when one original
                sequence is narrower than the desktop viewport. */}
            <LogoSequence items={items} duplicate/>
            <LogoSequence items={items} duplicate/>
          </div>
        </div>)}
      </div>
    </div>
  </section>;
}
