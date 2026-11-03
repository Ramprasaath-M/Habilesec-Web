'use client';

import {useEffect,useRef,useState} from 'react';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {ArrowUpRight,ChevronDown,Menu,X,ShieldCheck,Layers} from 'lucide-react';
import {productLinks,footerServices} from '@/lib/fort/data';
import {capabilities} from '@/data/capabilities';
import styles from './site-header.module.css';

type MenuName='Products'|'Services';

const serviceGroups=[
  {title:'Test & Defend',slugs:['security-testing','security-operations']},
  {title:'Govern & Advise',slugs:['governance-risk-compliance','security-advisory']},
  {title:'Build & Innovate',slugs:['cloud-devops','software-engineering','ai-iot-blockchain']},
];

function GroupedServices({close}:{close:()=>void}) {
  const [selected,setSelected]=useState('security-testing');
  const summary=capabilities.find(item=>item.slug===selected)?.summary;
  return <>
    <div className={styles.quickGroups}>
      {serviceGroups.map(group=><div className={styles.quickGroup} key={group.title}>
        <h3 className={styles.groupHeading}>{group.title}</h3>
        <ul>{group.slugs.map(slug=>{
          const category=footerServices.find(item=>item.slug===slug)!;
          return <li key={slug}><Link className={styles.quickLink} href={`/#capability-${slug}`} onPointerEnter={event=>{if(event.pointerType==='mouse')setSelected(slug)}} onFocus={()=>setSelected(slug)} onClick={close}>
            <span>{category.label}</span><ArrowUpRight size={17} aria-hidden="true"/>
          </Link></li>;
        })}</ul>
      </div>)}
    </div>
    <div className={styles.contextStrip}><span className={styles.contextIcon}><ShieldCheck size={22} aria-hidden="true"/></span><p aria-live="polite" aria-atomic="true">{summary}</p></div>
  </>;
}

function DropdownContent({name,close,dismiss}:{name:MenuName;close:()=>void;dismiss:()=>void}) {
  return <>
    <div className={styles.menuHeading}>
      <div><p className={styles.kicker}>{name==='Services'?'OUR EXPERTISE':'HABILESEC PRODUCTS'}</p>
        <h2>{name==='Services'?'Find the right capability.':'Purpose-built platforms.'}</h2>
        {name==='Services'&&<p className={styles.menuIntro}>Security, engineering, and governance — connected.</p>}
      </div>
      <button type="button" className={styles.closeMenu} onClick={dismiss} aria-label={`Close ${name.toLowerCase()} menu`}><X size={19}/></button>
    </div>
    {name==='Services'?<GroupedServices close={close}/>:<div className={styles.products}>
        {productLinks.map(product=><a href={product.href} target="_blank" rel="noopener noreferrer" onClick={close} key={product.href} className={styles.product} aria-label={`Visit ${product.label} (opens in a new tab)`}>
          <span className={styles.productLogo}><Image src={`/images/products/${product.logo}`} alt={`${product.label} logo`} fill sizes="140px" className={styles.productLogoImg}/></span>
          <span className={styles.productInfo}>
            <span className={styles.productTitle}>{product.label}<ArrowUpRight size={15}/></span>
            <span className={styles.productDesc}>{product.description}</span>
          </span>
        </a>)}
      </div>}
    <div className={styles.menuFooter}>
      {name==='Services'?<Link href="/#gear-capabilities-title" onClick={close}>Explore all capabilities <ArrowUpRight size={15} aria-hidden="true"/></Link>:<span><Layers size={15} aria-hidden="true"/> Tanikkai · Certanika</span>}
      <Link href="/contact-us" onClick={close}>Talk to an expert <ArrowUpRight size={15} aria-hidden="true"/></Link>
    </div>
  </>;
}

export function SiteHeader() {
  const pathname=usePathname();
  const [open,setOpen]=useState<MenuName|null>(null);
  const [mobile,setMobile]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const root=useRef<HTMLElement>(null);
  const triggers=useRef<Partial<Record<MenuName,HTMLButtonElement|null>>>({});
  const hamburger=useRef<HTMLButtonElement>(null);
  const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
  const reason=useRef<'hover'|'click'>('hover');
  const cancelClose=()=>{if(timer.current){clearTimeout(timer.current);timer.current=null;}};
  const close=()=>{cancelClose();setOpen(null);setMobile(false);};
  const hover=(name:MenuName)=>{cancelClose();if(matchMedia('(min-width:1024px) and (hover:hover)').matches){reason.current='hover';setOpen(name);}};
  const activate=(name:MenuName)=>{cancelClose();if(open===name&&reason.current==='click'){setOpen(null);}else{reason.current='click';setOpen(name);}};
  useEffect(()=>{
    const scroll=()=>setScrolled(scrollY>80);
    const resize=()=>{if(innerWidth>=1024)setMobile(false);setOpen(null);};
    scroll();window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',resize);
    return ()=>{window.removeEventListener('scroll',scroll);window.removeEventListener('resize',resize);if(timer.current)clearTimeout(timer.current);};
  },[]);
  useEffect(()=>{
    const outside=(event:PointerEvent)=>{if(!root.current?.contains(event.target as Node)){setOpen(null);setMobile(false);}};
    const keyboard=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){
        if(open){setOpen(null);triggers.current[open]?.focus();}
        else if(mobile){setMobile(false);hamburger.current?.focus();}
      }
      if(event.key==='Tab'&&mobile){
        const focusable=[...root.current!.querySelectorAll<HTMLElement>('a,button')].filter(el=>el.getClientRects().length&&!el.closest('[hidden]'));
        const first=focusable[0],last=focusable[focusable.length-1];
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
      }
    };
    document.addEventListener('pointerdown',outside);document.addEventListener('keydown',keyboard);
    return ()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',keyboard);};
  },[open,mobile]);
  useEffect(()=>{
    if(!mobile)return;
    const previous=document.body.style.overflow;document.body.style.overflow='hidden';
    return ()=>{document.body.style.overflow=previous;};
  },[mobile]);
  return <header ref={root} className={styles.header} data-site-header data-scrolled={scrolled} onMouseEnter={cancelClose} onMouseLeave={()=>{if(!mobile)timer.current=setTimeout(()=>setOpen(null),180);}} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node))setOpen(null);}}>
    <div className={styles.inner}>
      <Link href="/" className={styles.logo} aria-label="HabileSec home" onClick={close}><Image src="/fort/habilesec-dark.png" width={190} height={53} alt="HabileSec — Governance Excellence" priority/></Link>
      <button ref={hamburger} type="button" className={styles.hamburger} onClick={()=>{setMobile(!mobile);setOpen(null);}} aria-expanded={mobile} aria-controls="site-navigation"><span className="sr-only">{mobile?'Close menu':'Open menu'}</span>{mobile?<X/>:<Menu/>}</button>
      <nav id="site-navigation" className={styles.navigation} data-mobile-open={mobile} aria-label="Main navigation">
        <Link className={styles.direct} href="/" onMouseEnter={()=>{cancelClose();setOpen(null);}} onClick={close} aria-current={pathname==='/'?'page':undefined}>Home</Link>
        {(['Products','Services'] as const).map(name=><div key={name} className={styles.item}>
          <button type="button" ref={el=>{triggers.current[name]=el;}} className={styles.trigger} aria-expanded={open===name} aria-controls={`site-menu-${name.toLowerCase()}`} data-current={name==='Products'&&productLinks.some(link=>link.href===pathname)} onMouseEnter={()=>hover(name)} onClick={()=>activate(name)} onKeyDown={event=>{if(event.key==='ArrowDown'){event.preventDefault();reason.current='click';setOpen(name);requestAnimationFrame(()=>root.current?.querySelector<HTMLElement>(`#site-menu-${name.toLowerCase()} a`)?.focus());}}}>
            {name}<ChevronDown size={13} aria-hidden="true"/>
          </button>
          <div className={styles.dropdown} id={`site-menu-${name.toLowerCase()}`} hidden={open!==name} aria-label={`${name} navigation`} onMouseEnter={cancelClose}>
            <div className={styles.panel}><DropdownContent name={name} close={close} dismiss={()=>{cancelClose();setOpen(null);triggers.current[name]?.focus();}}/></div>
          </div>
        </div>)}
        <Link className={styles.direct} href="/about-us" onMouseEnter={()=>{cancelClose();setOpen(null);}} onClick={close} aria-current={pathname==='/about-us'?'page':undefined}>About</Link>
        <Link className={styles.direct} href="/contact-us" onMouseEnter={()=>{cancelClose();setOpen(null);}} onClick={close} aria-current={pathname==='/contact-us'?'page':undefined}>Contact Us</Link>
      </nav>
    </div>
  </header>;
}
