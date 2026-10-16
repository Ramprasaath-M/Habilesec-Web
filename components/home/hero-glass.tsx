"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  Cloud,
  ScanSearch,
  FileCheck2,
  Radar,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";
import s from "./hero-glass.module.css";

type Panel = {
  id: string;
  label: string;
  text: string;
  Icon: LucideIcon;
  /** centre of the panel, as a percentage of the cluster */
  x: number;
  y: number;
  /** width as a percentage of the cluster width */
  w: number;
  /** pointer depth in px */
  depth: number;
  /** ambient float: duration and delay in seconds */
  float: [number, number];
  /** hidden on the smallest screens */
  extra?: boolean;
};

// Compact asymmetric cluster modelled on the approved reference.
// Descriptions are general statements; no metrics or statuses.
const panels: Panel[] = [
  {
    id: "cloud",
    label: "Cloud Security",
    text: "Review of cloud configurations, access and exposure.",
    Icon: Cloud,
    x: 53,
    y: 22,
    w: 23,
    depth: 6,
    float: [6.4, 0],
  },
  {
    id: "testing",
    label: "Security Testing",
    text: "Testing of applications, infrastructure and cloud for weaknesses.",
    Icon: ScanSearch,
    x: 81,
    y: 31,
    w: 25,
    depth: 9,
    float: [5.8, 1.4],
  },
  {
    id: "governance",
    label: "Governance",
    text: "Governance, risk management and compliance readiness.",
    Icon: FileCheck2,
    x: 51,
    y: 62,
    w: 26,
    depth: 4,
    float: [7.2, 0.7],
  },
  {
    id: "ops",
    label: "Security Operations",
    text: "Monitoring, detection and response processes.",
    Icon: Radar,
    x: 24,
    y: 36,
    w: 19,
    depth: 7,
    float: [6.8, 2.2],
    extra: true,
  },
  {
    id: "trust",
    label: "Digital Trust",
    text: "Privacy and governance practices that support confidence.",
    Icon: UserRoundCheck,
    x: 80,
    y: 65,
    w: 23,
    depth: 5,
    float: [7.0, 1.8],
    extra: true,
  },
];

export function HeroGlass() {
  const [active, setActive] = useState<string | null>(null);
  const pinned = useRef(false);
  const layer = useRef<HTMLDivElement>(null);

  // Very small pointer depth: mouse only, never under reduced motion
  useEffect(() => {
    const lay = layer.current;
    const el = lay?.parentElement?.parentElement;
    if (!el || !lay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        lay.style.setProperty("--px", (px * 2).toFixed(3));
        lay.style.setProperty("--py", (py * 2).toFixed(3));
      });
    };
    const leave = () => {
      lay.style.setProperty("--px", "0");
      lay.style.setProperty("--py", "0");
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Close a tapped panel on outside tap or Escape
  useEffect(() => {
    const out = (e: PointerEvent) => {
      if (!(e.target as HTMLElement).closest("[data-glass]")) {
        pinned.current = false;
        setActive(null);
      }
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        pinned.current = false;
        setActive(null);
      }
    };
    document.addEventListener("pointerdown", out);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", out);
      document.removeEventListener("keydown", esc);
    };
  }, []);

  return (
    <div className={s.cluster}>
      <div
        className={s.layer}
        ref={layer}
        role="group"
        aria-label="Security capabilities"
      >
        {panels.map((p, i) => {
          const on = active === p.id;
          return (
            <div
              key={p.id}
              data-glass
              data-id={p.id}
              className={s.slot}
              data-extra={p.extra || undefined}
              data-active={on || undefined}
              style={
                {
                  "--x": `${p.x}%`,
                  "--y": `${p.y}%`,
                  "--w": p.w,
                  "--d": p.depth,
                  "--i": i,
                  "--ft": `${p.float[0]}s`,
                  "--fd": `${p.float[1]}s`,
                } as CSSProperties
              }
            >
              <div className={s.depth}>
                <div className={s.float}>
                  <button
                    type="button"
                    className={s.panel}
                    aria-label={p.label}
                    aria-expanded={on}
                    aria-describedby={`glass-${p.id}`}
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse" && !pinned.current)
                        setActive(p.id);
                    }}
                    onPointerLeave={(e) => {
                      if (e.pointerType === "mouse" && !pinned.current)
                        setActive(null);
                    }}
                    onFocus={() => {
                      if (!pinned.current) setActive(p.id);
                    }}
                    onBlur={() => {
                      if (!pinned.current) setActive(null);
                    }}
                    onClick={() => {
                      if (pinned.current && active === p.id) {
                        pinned.current = false;
                        setActive(null);
                      } else {
                        pinned.current = true;
                        setActive(p.id);
                      }
                    }}
                  >
                    <span className={s.sheen} aria-hidden="true" />
                    <p.Icon
                      className={s.icon}
                      strokeWidth={1.35}
                      aria-hidden="true"
                    />
                  </button>
                  <p id={`glass-${p.id}`} className={s.tip}>
                    <strong>{p.label}</strong>
                    {p.text}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
