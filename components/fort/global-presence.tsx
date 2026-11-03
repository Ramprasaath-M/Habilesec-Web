'use client';

import {memo,useEffect,useRef,useState} from 'react';
import type {CSSProperties} from 'react';
import Link from 'next/link';
import {ArrowUpRight,Mail,Phone,MapPin} from 'lucide-react';
import dots from '@/data/threat-map-land.json';
import {headquartersContact,presenceLocations,presencePoint} from '@/data/global-presence';
import {PresenceFlag} from './presence-flag';
import styles from './global-presence.module.css';

const Land=memo(function Land(){return <g className={styles.land}>{dots.map(([x,y],i)=><circle key={i} cx={x} cy={y} r="1.5"/>)}</g>;});
const hub=presencePoint(presenceLocations[0].lon,presenceLocations[0].lat);
const connections=presenceLocations.slice(1).map(location=>{
  const [x,y]=presencePoint(location.lon,location.lat);
  return `M${hub[0]} ${hub[1]} Q${(hub[0]+x)/2} ${Math.min(hub[1],y)-Math.max(22,Math.abs(hub[0]-x)*.23)} ${x} ${y}`;
});

export function GlobalPresence() {
  const [selected,setSelected]=useState(0);
  const [running,setRunning]=useState(false);
  const root=useRef<HTMLElement>(null);
  const location=presenceLocations[selected];
  const [px,py]=presencePoint(location.lon,location.lat);
  useEffect(()=>{
    let visible=false;
    const update=()=>setRunning(visible&&!document.hidden);
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update();},{threshold:.08});
    if(root.current)observer.observe(root.current);
    document.addEventListener('visibilitychange',update);
    return ()=>{observer.disconnect();document.removeEventListener('visibilitychange',update);};
  },[]);
  return <section ref={root} className={styles.section} aria-labelledby="global-presence-title" data-global-presence data-running={running}>
    <div className="f-container">
      <header className={styles.heading}>
        <p className="f-label" data-reveal>GLOBAL PRESENCE</p>
        <h2 id="global-presence-title">Our Cybersecurity Footprint Across the Globe.</h2>
        <p>From our headquarters in Kumbakonam to locations across India and international markets, HabileSec connects expertise across regions to support organizations worldwide.</p>
      </header>
      <div className={styles.layout}>
        <div className={styles.mapPanel}>
          <svg className={styles.map} viewBox="0 0 800 420" fill="none" aria-label="HabileSec regional presence map. Canada and USA markers represent countries; city markers are approximate." role="group">
            <Land/>
            {connections.map((path,i)=><g key={presenceLocations[i+1].id} data-active={selected===i+1||selected===0} className={styles.connection}>
              <path d={path}/><circle r="2.7" className={styles.particle} style={{offsetPath:`path('${path}')`,animationDuration:`${11+i*1.3}s`,animationDelay:`${-i*1.5}s`} as CSSProperties}/>
            </g>)}
            {presenceLocations.map((place,i)=>{
              const [x,y]=presencePoint(place.lon,place.lat);const [mx,my]=place.marker;
              return <g key={place.id} data-active={selected===i} className={styles.mapLocation}>
                <path d={`M${x} ${y}L${mx} ${my}`} className={styles.leader}/>
                <circle cx={x} cy={y} r={place.hq?4:2.8} className={styles.geographicDot}/>
                <foreignObject x={mx-22} y={my-22} width="44" height="44" overflow="visible">
                  <button type="button" className={styles.mapButton} aria-pressed={selected===i} aria-label={`Select ${place.hq?'Kumbakonam headquarters':place.title}`} onClick={()=>setSelected(i)} data-presence-marker={place.id}>
                    <span className={styles.markerPulse}/><span className={styles.flagCircle}><PresenceFlag country={place.flag}/></span>
                  </button>
                </foreignObject>
                <text x={mx} y={my+34} textAnchor="middle" className={styles.hubLabel}>{place.hq?'KUMBAKONAM HQ':place.label.toUpperCase()}</text>
              </g>;
            })}
          </svg>
          <p className={styles.mapNote}><MapPin size={13} aria-hidden="true"/> Regional presence · Approximate geographic positions</p>
        </div>
        <div className={styles.sidebar}>
          <div className={styles.selector} role="group" aria-label="Choose a HabileSec location">
            {presenceLocations.map((place,i)=><button key={place.id} type="button" onClick={()=>setSelected(i)} aria-pressed={selected===i} aria-controls="presence-location-card" className={styles.pill}>
              <PresenceFlag country={place.flag}/><span>{place.label}</span>{place.hq?<b>HQ</b>:null}
            </button>)}
          </div>
          <article id="presence-location-card" className={styles.card} aria-label="Selected location and headquarters contact">
            <div key={location.id} className={styles.locationArt}>
              <svg viewBox="0 0 500 165" fill="none" role="img" aria-label={`Geographic illustration of ${location.title}; not an office photograph.`}>
                <g transform={`translate(250 80) scale(${location.flag==='IN'?4:location.flag==='HK'||location.flag==='AE'?3.3:1.8}) translate(${-px} ${-py})`}><Land/><circle cx={px} cy={py} r="3" fill="var(--violet)"/><circle cx={px} cy={py} r="6" stroke="var(--violet)" strokeWidth=".7"/></g>
              </svg>
              <div className={styles.artLabel}><PresenceFlag country={location.flag}/><span>{location.region}</span>{location.hq?<b>HEADQUARTERS</b>:null}</div>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.selectedText} aria-live="polite" aria-atomic="true"><h3>{location.title}</h3><p>{location.description}</p></div>
              <div className={styles.contact}>
                <h4>Headquarters Contact — Kumbakonam</h4>
                <address>{headquartersContact.address.map(line=><span key={line}>{line}</span>)}</address>
                <a href={headquartersContact.phoneHref}><Phone size={14} aria-hidden="true"/>{headquartersContact.phone}</a>
                <a href={`mailto:${headquartersContact.email}`}><Mail size={14} aria-hidden="true"/>{headquartersContact.email}</a>
              </div>
              <Link href="/contact-us" className={styles.cta}>Contact Our Team <ArrowUpRight size={17} aria-hidden="true"/></Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>;
}
