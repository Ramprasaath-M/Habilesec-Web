"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, Pause, Play } from "lucide-react";
import { Crumbs } from "@/components/ui/crumbs";
import s from "./industries-hero.module.css";

const base = "/videos/industries/";

export function IndustriesHero() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const player = video.current;
    if (!player) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Do not even request video bytes for reduced-motion or data-saving visitors.
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    function sync() {
      if (!player) return;
      if (motion.matches || connection?.saveData) {
        player.pause();
        player.removeAttribute("src");
        player.load();
        setAvailable(false);
        setReady(false);
        return;
      }
      player.src = base + (player.canPlayType('video/webm; codecs="vp9"') ? "industries-hero.webm" : "industries-hero.mp4");
      setAvailable(true);
      void player.play().catch(() => setPlaying(false));
    }
    sync();
    motion.addEventListener("change", sync);
    return () => { motion.removeEventListener("change", sync); player.pause(); };
  }, []);

  async function togglePlayback() {
    const player = video.current;
    if (!player) return;
    if (!player.paused) player.pause();
    else { try { await player.play(); } catch { setPlaying(false); } }
  }

  return (
    <section className={s.hero} aria-labelledby="industries-hero-title">
      <div className={s.media} aria-hidden="true">
        <Image src={`${base}industries-poster.webp`} alt="" fill priority sizes="100vw" className={s.poster} />
        <video
          ref={video}
          className={s.film}
          data-ready={ready}
          width="1600" height="900"
          autoPlay muted loop playsInline preload="none"
          poster={`${base}industries-poster.webp`}
          onPlaying={() => setPlaying(true)}
          onLoadedData={() => setReady(true)}
          onPause={() => setPlaying(false)}
          onError={() => { setPlaying(false); setAvailable(false); setReady(false); }}
          tabIndex={-1}
        />
      </div>
      <div className={s.wash} aria-hidden="true" />
      <div className={`container ${s.inner}`}>
        <div className={s.crumbs}><Crumbs items={[{ label: "Industries" }]} /></div>
        <div className={s.copy}>
          <p className={`eyebrow ${s.eyebrow}`}>Sector understanding. Lasting resilience.</p>
          <h1 id="industries-hero-title">Industries<br /><em>we serve.</em></h1>
          <p className={s.lead}>We help organisations across industries navigate risk, strengthen security, and build resilience.</p>
          <a className={s.cta} href="#sectors">Explore our industries <ArrowDown size={18} aria-hidden="true" /></a>
        </div>
        <div className={s.foot}>
          <p><span className={s.marker} aria-hidden="true" /> Expertise across six sectors</p>
          {available && <button type="button" className={s.control} onClick={togglePlayback} aria-label={playing ? "Pause industry film" : "Play industry film"}>
            {playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
            <span>{playing ? "Pause film" : "Play film"}</span>
          </button>}
        </div>
      </div>
    </section>
  );
}
