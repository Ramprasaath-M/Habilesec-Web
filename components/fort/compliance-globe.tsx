'use client';

import {useEffect, useRef, useState} from 'react';
import type {CSSProperties} from 'react';
import land from '@/data/compliance-land.json';
import styles from './compliance-globe.module.css';

const RAD = Math.PI / 180;
// Natural Earth geography from the project's existing public/data/world.geojson.
const rings = land.map(ring => ring.map(([lon, lat]) => [lon * RAD, lat * RAD]));
function continents(rotation: number) {
  const tilt = 10 * RAD;
  return rings.map(ring => {
    const points = ring.map(([lon, lat]) => {
      const angle = lon - rotation;
      const x = Math.cos(lat) * Math.sin(angle);
      const y = Math.cos(tilt) * Math.sin(lat) - Math.sin(tilt) * Math.cos(lat) * Math.cos(angle);
      const z = Math.sin(tilt) * Math.sin(lat) + Math.cos(tilt) * Math.cos(lat) * Math.cos(angle);
      return {x: 360 + x * 142, y: 224 - y * 142, z};
    });
    const visible = points.filter(p => p.z >= 0);
    if (visible.length < 3) return '';
    return visible.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join('') + 'Z';
  }).join('');
}

function Card({x,y,title,lines,icon,delay}:{x:number;y:number;title:string;lines:string[];icon:'world'|'shield'|'bank';delay:string}) {
  return <g transform={`translate(${x} ${y})`}>
    <g className={styles.card} style={{animationDelay:delay}}>
      <rect x="1" y="4" width="166" height="61" rx="10" fill="#174d9a" opacity=".09"/>
      <rect width="166" height="61" rx="10" fill="#e1f0fc" stroke="#89b6d8"/>
      <circle cx="27" cy="29" r="20" fill="#bfddf4"/>
      <g stroke="#174d9a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {icon==='world'?<><circle cx="27" cy="29" r="11"/><ellipse cx="27" cy="29" rx="5" ry="11"/><path d="M16 29h22m-19-6h16m-16 12h16"/></>:icon==='shield'?<><path d="m27 17 10 4v8c0 7-10 13-10 13s-10-6-10-13v-8z" fill="#a9d1f0"/><path d="m22 29 4 4 7-8" strokeWidth="2.5"/></>:<><path d="m15 24 12-7 12 7zm1 16h22M19 27v10m8-10v10m8-10v10"/><path d="M16 26h22M16 38h22"/></>}
      </g>
      <text x="60" y="25" fill="#153e63" fontSize="15" fontWeight="600">{title}</text>
      <text x="60" y="40" fill="#34546f" fontSize="8.5">{lines.map((line,i)=><tspan key={line} x="60" dy={i?10:0}>{line}</tspan>)}</text>
    </g>
  </g>;
}

const orbit = 'M170 224 C170 171 550 171 550 224 C550 277 170 277 170 224';
const front = 'M550 224 C550 277 170 277 170 224';
const orbits = [{angle:-20,duration:12},{angle:32,duration:16},{angle:80,duration:20}];

export function ComplianceGlobe() {
  const root = useRef<HTMLDivElement>(null);
  const map = useRef<SVGPathElement>(null);
  const [motion, setMotion] = useState(false);
  useEffect(()=>{
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = ()=>setMotion(!media.matches);
    update(); media.addEventListener('change',update);
    return ()=>media.removeEventListener('change',update);
  },[]);
  useEffect(()=>{
    if(!motion) {map.current?.setAttribute('d',continents(12*RAD));return;}
    let visible=true, frame=0, last=0, elapsed=0;
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});
    if(root.current)observer.observe(root.current);
    const tick=(now:number)=>{
      const delta=last?now-last:0; last=now;
      if(visible&&!document.hidden)elapsed+=Math.min(delta,100);
      // Twelve geography updates per second; orbits remain compositor animated.
      if(visible&&map.current&&Math.floor(elapsed/83)!==Math.floor((elapsed-delta)/83))map.current.setAttribute('d',continents(12*RAD+elapsed/140000*Math.PI*2));
      frame=requestAnimationFrame(tick);
    };
    frame=requestAnimationFrame(tick);
    return ()=>{cancelAnimationFrame(frame);observer.disconnect();};
  },[motion]);
  return <div ref={root} className={styles.dashboard} data-compliance-globe role="img" aria-label="Rotating world globe with orbiting blue nodes and floating ISO 27001, SOC 2, and GDPR compliance cards.">
    <svg viewBox="0 0 720 480" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="compliance-sphere" cx="35%" cy="25%" r="80%"><stop stopColor="#d6eafa"/><stop offset="1" stopColor="#a9d1f0"/></radialGradient>
        <linearGradient id="compliance-panel" x2="1" y2="1"><stop stopColor="#d6eafa"/><stop offset="1" stopColor="#bfddf4"/></linearGradient>
        <linearGradient id="compliance-shield" x2="1" y2="1"><stop stopColor="#60a5fa"/><stop offset="1" stopColor="#185abd"/></linearGradient>
        <clipPath id="compliance-disc"><circle cx="360" cy="224" r="142"/></clipPath>
      </defs>
      <rect x="1" y="1" width="718" height="478" rx="26" fill="url(#compliance-panel)" stroke="#89b6d8"/>
      <rect x="34" y="34" width="652" height="392" rx="18" fill="#cbe3f7"/>
      <ellipse cx="360" cy="401" rx="205" ry="23" stroke="#89b6d8" opacity=".45"/>
      <ellipse cx="360" cy="395" rx="150" ry="16" fill="#174d9a" opacity=".035"/>
      {orbits.map(({angle,duration})=><g key={angle} transform={`rotate(${angle} 360 224)`}>
        <path d={orbit} stroke="#2265d8" strokeWidth="1" opacity=".23" strokeDasharray={angle===80?'3 4':undefined}/>
        <circle className={styles.nodeBack} r="5" fill="#2265d8" style={{offsetPath:`path('${orbit}')`,animationDuration:`${duration}s`}}/>
      </g>)}
      <circle cx="360" cy="224" r="142" fill="url(#compliance-sphere)" stroke="#89b6d8"/>
      <g clipPath="url(#compliance-disc)">
        <path ref={map} d={continents(12*RAD)} fill="#174d9a" opacity=".77"/>
        <g stroke="#34546f" strokeWidth="1" opacity=".32">
          {[40,88,125].map(rx=><ellipse key={rx} cx="360" cy="224" rx={rx} ry="142"/>)}
          <path d="M218 224h284M360 82v284"/>
          {[-100,-62,62,100].map(dy=><ellipse key={dy} cx="360" cy={224+dy} rx={Math.sqrt(142*142-dy*dy)} ry="19"/>)}
        </g>
      </g>
      {orbits.map(({angle,duration})=><g key={angle} transform={`rotate(${angle} 360 224)`}>
        <path d={front} stroke="#2265d8" opacity=".45" strokeWidth="1" strokeDasharray={angle===80?'3 4':undefined}/>
        <g className={styles.nodeFront} style={{offsetPath:`path('${orbit}')`,animationDuration:`${duration}s, ${duration}s`} as CSSProperties}>
          <circle className={styles.glow} r="13" fill="#2265d8" opacity=".12"/>
          <circle r="8" fill="#60a5fa" opacity=".35"/>
          <circle r="5" fill="#2265d8"/>
          <circle cx="-1" cy="-1" r="1.7" fill="#d6eafa"/>
        </g>
      </g>)}
      <g className={styles.shield}>
        <path d="M360 142c24 12 47 21 69 27v58c0 48-33 72-69 87-36-15-69-39-69-87v-58c22-6 45-15 69-27Z" fill="url(#compliance-shield)" stroke="#a9d1f0" strokeWidth="3"/>
        <path d="m326 224 25 27 47-52" stroke="#eaf5ff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <Card x={94} y={108} title="ISO 27001" lines={['Information Security','Management']} icon="world" delay="0s"/>
      <Card x={116} y={265} title="SOC 2" lines={['Security and Privacy','Compliance']} icon="shield" delay="-2s"/>
      <Card x={474} y={294} title="GDPR" lines={['Data Protection']} icon="bank" delay="-4s"/>
    </svg>
  </div>;
}
