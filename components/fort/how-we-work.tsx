'use client';

import {useEffect,useRef} from 'react';
import styles from './how-we-work.module.css';

const stages=[
  {name:'DISCOVER',statement:'Every Solution Starts with Understanding.',description:'We begin by understanding your business, goals, challenges, and requirements. This helps us identify what matters most before deciding the next steps.',points:['Understand business goals','Identify challenges and needs','Define expectations']},
  {name:'ASSESS',statement:'Understand Where You Stand Today.',description:'We review your existing systems, processes, and technology environment to identify gaps, risks, and areas that need attention.',points:['Review the current environment','Identify risks and gaps','Understand technical requirements']},
  {name:'STRATEGIZE',statement:'Build a Clear Plan for What Comes Next.',description:'Based on our findings, we define the right approach, set priorities, and develop a practical plan that aligns with your business objectives.',points:['Define the right approach','Set clear priorities','Create an action plan']},
  {name:'IMPLEMENT',statement:'Turn the Plan into Action.',description:'Our teams carry out the agreed work, whether it involves cybersecurity, cloud solutions, software engineering, or compliance improvements.',points:['Execute planned activities','Deliver practical solutions','Work closely with your team']},
  {name:'VALIDATE',statement:'Make Sure Everything Works as Intended.',description:'We review and test the work against agreed requirements to confirm quality, identify remaining issues, and ensure the expected outcomes are achieved.',points:['Test and review results','Verify requirements','Address identified issues']},
  {name:'EVOLVE',statement:'Keep Improving as Your Business Grows.',description:'We share recommendations, provide knowledge transfer, and offer continued support where required to help your organization adapt to changing needs.',points:['Recommend improvements','Share knowledge and guidance','Support future requirements']},
];

export function HowWeWork() {
  const sectionRef=useRef<HTMLElement>(null);
  useEffect(()=>{
    const section=sectionRef.current;
    if(!section)return;
    const panels=Array.from(section.querySelectorAll<HTMLElement>('[data-work-stage]'));
    let frame=0;
    const update=()=>{
      frame=0;
      const threshold=window.innerHeight*.7;
      const positions=panels.map(panel=>panel.getBoundingClientRect().top);
      panels.forEach((panel,i)=>{panel.dataset.arrived=String(positions[i]<threshold)});
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
    update();
    section.dataset.motion='ready';
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule);
    return ()=>{
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll',schedule);
      window.removeEventListener('resize',schedule);
      delete section.dataset.motion;
    };
  },[]);
  return <section ref={sectionRef} className={styles.section} aria-labelledby="how-we-work-title" data-how-we-work>
    <header className={`f-container ${styles.heading}`}>
      <p className="f-label" data-reveal>HOW WE WORK</p>
      <h2 id="how-we-work-title">Six Stages. One Connected Approach.</h2>
      <p>From understanding your business needs to delivering solutions and supporting improvement, we follow a clear and practical approach.</p>
    </header>
    {/* Native sticky stacking is driven entirely by document scrolling. Each
        opaque panel covers its predecessor and reverses naturally on scroll up.
        All six articles remain in reading order. Effects decorate this flow;
        they never intercept scrolling or advance a stage on a timer. */}
    <div className={styles.sequence}>
      {stages.map(({name,statement,description,points},i)=><article className={styles.stage} key={name} aria-labelledby={`work-stage-${i+1}`} data-work-stage={i+1}>
        <div className={`f-container ${styles.cardStack}`}>
        <div className={styles.stageBody}>
          <span className={styles.stageNumber} aria-hidden="true">{String(i+1).padStart(2,'0')}</span>
          <span className={styles.sweep} aria-hidden="true"/>
          <div className={styles.copy}>
            <p className={styles.stageLabel}>STAGE {String(i+1).padStart(2,'0')} <span aria-hidden="true">—</span> {name}</p>
            <h3 id={`work-stage-${i+1}`}>{statement}</h3>
            <p className={styles.description}>{description}</p>
          </div>
          <ul className={styles.points} aria-label={`${name.charAt(0)+name.slice(1).toLowerCase()} key points`}>
            {points.map(point=><li key={point}>{point}</li>)}
          </ul>
          <div className={styles.cardFooter} aria-hidden="true"><span>HABILESEC / OUR APPROACH</span><span>{String(i+1).padStart(2,'0')} / 06</span></div>
        </div>
        </div>
      </article>)}
    </div>
  </section>;
}
