'use client';
import {useEffect,useRef} from 'react';

export function InteractiveGridBackground({size=44,color='60,225,241'}:{size?:number;color?:string}){
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const wrap=ref.current;
    const host=wrap?.parentElement;
    if(!wrap||!host)return;
    if(matchMedia('(hover:none),(prefers-reduced-motion:reduce)').matches)return;
    let raf=0,nx=0,ny=0;
    const apply=()=>{
      wrap.style.setProperty('--mx',nx+'px');
      wrap.style.setProperty('--my',ny+'px');
      raf=0;
    };
    const move=(e:PointerEvent)=>{
      const r=host.getBoundingClientRect();
      nx=e.clientX-r.left;ny=e.clientY-r.top;
      if(!raf)raf=requestAnimationFrame(apply);
      wrap.style.setProperty('--igrid-o','1');
    };
    const leave=()=>{wrap.style.setProperty('--igrid-o','0');};
    host.addEventListener('pointermove',move);
    host.addEventListener('pointerleave',leave);
    return ()=>{
      host.removeEventListener('pointermove',move);
      host.removeEventListener('pointerleave',leave);
      if(raf)cancelAnimationFrame(raf);
    };
  },[]);
  return <div ref={ref} className="igrid-wrap" aria-hidden="true" style={{['--igrid-size' as string]:size+'px',['--igrid-color' as string]:color}}>
    <div className="igrid-base"/>
    <div className="igrid-illum"/>
    <div className="igrid-spot"/>
  </div>;
}
