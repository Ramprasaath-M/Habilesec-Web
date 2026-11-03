'use client';

import {useEffect,useRef,useState} from 'react';
import type {CSSProperties} from 'react';
import dots from '@/data/threat-map-land.json';
import styles from './cyber-threat-map.module.css';

// Equirectangular coordinates match the Natural Earth dot map generated from
// the project's existing public/data/world.geojson. All traffic is simulated.
const locate=(lon:number,lat:number)=>[40+(lon+180)*2,52+(90-lat)*2];
const locations=[
  {label:'UNITED STATES',lon:-98,lat:38,dx:0,dy:23,anchor:'middle'},
  {label:'UNITED KINGDOM',lon:-2,lat:54,dx:-12,dy:-18,anchor:'middle'},
  {label:'QATAR',lon:51.2,lat:25.3,dx:-20,dy:-22,anchor:'end'},
  {label:'UAE',lon:54.4,lat:24.4,dx:10,dy:23,anchor:'middle'},
  {label:'INDIA',lon:78.9,lat:22.6,dx:15,dy:18,anchor:'start'},
  {label:'NIGERIA',lon:8,lat:9,dx:-12,dy:23,anchor:'end'},
  {label:'KENYA',lon:37.9,lat:0.2,dx:0,dy:28,anchor:'middle'},
  {label:'AUSTRALIA',lon:134,lat:-25,dx:0,dy:28,anchor:'middle'},
] as const;
const vectors=[
  {from:[-145,61],target:0,bend:-45,delay:0},
  {from:[92,62],target:1,bend:-38,delay:1.3},
  {from:[-38,-14],target:5,bend:-36,delay:2.6},
  {from:[130,46],target:4,bend:-32,delay:3.9},
  {from:[88,-30],target:7,bend:-42,delay:5.2},
  {from:[-8,38],target:2,bend:-35,delay:6.5},
  {from:[95,-10],target:3,bend:-24,delay:7.8},
  {from:[-8,-30],target:6,bend:-36,delay:9.1},
];
const duration=10.4;
const travel=3.8;

export function CyberThreatMap() {
  const root=useRef<HTMLDivElement>(null);
  const [running,setRunning]=useState(false);
  const [blocked,setBlocked]=useState(0);
  useEffect(()=>{
    const media=matchMedia('(prefers-reduced-motion: reduce)');
    let visible=false;
    const update=()=>setRunning(visible&&!media.matches&&!document.hidden);
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update();},{threshold:.12});
    if(root.current)observer.observe(root.current);
    media.addEventListener('change',update);document.addEventListener('visibilitychange',update);
    return ()=>{observer.disconnect();media.removeEventListener('change',update);document.removeEventListener('visibilitychange',update);};
  },[]);
  const intercept=()=>{if(running)setBlocked(n=>n+1);};
  return <div ref={root} className={styles.panel} data-threat-map data-running={running}>
    <div className={styles.top}><span><i/>CYBER THREAT MAP</span><span className={styles.counter} data-blocked-counter>{blocked} <span>Blocked</span></span></div>
    <svg className={styles.map} viewBox="0 0 800 470" fill="none" role="img" aria-label="Illustrative world map showing simulated threat paths intercepted at marked locations.">
      <defs><pattern id="hs-threat-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" className={styles.gridLine}/></pattern></defs>
      <rect width="800" height="470" fill="url(#hs-threat-grid)"/>
      <g className={styles.land}>{dots.map(([x,y],i)=><circle key={i} cx={x} cy={y} r="1.45"/>)}</g>
      {vectors.map(({from,target,bend,delay},i)=>{
        const [x,y]=locate(from[0],from[1]);const location=locations[target];const [tx,ty]=locate(location.lon,location.lat);
        const path=`M${x} ${y} Q${(x+tx)/2} ${Math.min(y,ty)+bend} ${tx} ${ty}`;
        const timing={'--vector-delay':`${delay}s`,'--pulse-delay':`${delay+travel}s`,'--cycle':`${duration}s`} as CSSProperties;
        return <g key={i} style={timing}>
          <path d={path} pathLength="1" className={styles.vector}/>
          <circle r="3.5" className={styles.threat} style={{offsetPath:`path('${path}')`}}/>
          <circle cx={tx} cy={ty} r="7" className={styles.intercept} onAnimationStart={intercept} onAnimationIteration={intercept}/>
          <circle cx={tx} cy={ty} r="6" className={styles.flash}/>
        </g>;
      })}
      <g>{locations.map(({label,lon,lat,dx,dy,anchor})=>{
        const [x,y]=locate(lon,lat);
        return <g key={label}>
          <circle cx={x} cy={y} r="8" className={styles.markerRing}/><circle cx={x} cy={y} r="3.5" className={styles.marker}/>
          <text x={x+dx} y={y+dy} textAnchor={anchor} className={styles.location}>{label}</text>
        </g>;
      })}</g>
    </svg>
    <div className={styles.footer}>
      <div className={styles.legend}><span><i/>INBOUND VECTOR</span><span><i/>INTERCEPTED</span></div>
      <p>Illustrative visualization · Not live telemetry</p>
    </div>
  </div>;
}
