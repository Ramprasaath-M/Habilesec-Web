"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  Cloud,
  ClipboardCheck,
  ScanSearch,
  Radar,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import s from "./hero-glass.module.css";

type Panel = {
  id: string;
  label: string;
  text: string;
  Icon: LucideIcon;
  /** position as percentages of the hero stage (centre of the panel) */
  x: number;
  y: number;
  /** pointer depth in px */
  depth: number;
  /** ambient float timing */
  float: [number, number];
  side: "left" | "right";
  /** open the description beside the panel instead of below it (wide layouts) */
  beside?: boolean;
  /** hide on narrow layouts when space is limited */
  extra?: boolean;
};

// Descriptions are general statements about each discipline; no metrics or statuses.
const panels: Panel[] = [
  {
    id: "cloud",
    label: "Cloud Security",
    text: "Review of cloud configurations, access and exposure.",
    Icon: Cloud,
    x: 57,
    y: 17,
    depth: 7,
    float: [6.2, 0],
    side: "left",
  },
  {
    id: "risk",
    label: "Risk & Compliance",
    text: "Risk management and readiness for applicable standards.",
    Icon: ClipboardCheck,
    x: 80,
    y: 13,
    depth: 4,
    float: [7.4, 1.2],
    side: "right",
  },
  {
    id: "testing",
    label: "Security Testing",
    text: "Testing of applications, infrastructure and cloud for weaknesses.",
    Icon: ScanSearch,
    x: 91,
    y: 41,
    depth: 9,
    float: [5.6, 2.1],
    side: "right",
    beside: true,
  },
  {
    id: "ops",
    label: "Security Operations",
    text: "Monitoring, detection and response processes that keep security actionable.",
    Icon: Radar,
    x: 54.5,
    y: 56,
    depth: 5,
    float: [6.8, 0.6],
    side: "left",
    extra: true,
  },
  {
    id: "trust",
    label: "Digital Trust",
    text: "Privacy and governance practices that support stakeholder confidence.",
    Icon: ShieldCheck,
    x: 87,
    y: 69,
    depth: 6,
    float: [7.0, 1.7],
    side: "right",
    beside: true,
    extra: true,
  },
];

// Connections between panel ids, drawn in stage percentage space
const links: [string, string][] = [
  ["ops", "cloud"],
  ["cloud", "risk"],
  ["risk", "testing"],
  ["testing", "trust"],
];

export function HeroGlass() {
  const [active, setActive] = useState<string | null>(null);
  const pinned = useRef(false);
  const layer = useRef<HTMLDivElement>(null);

  // Subtle pointer depth: mouse only, never under reduced motion
  useEffect(() => {
    const el = layer.current?.parentElement;
    const lay = layer.current;
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

  const byId = Object.fromEntries(panels.map((p) => [p.id, p]));

  return (
    <div className={s.layer} ref={layer} aria-label="Security capabilities" role="group">
      <svg
        className={s.lines}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        {links.map(([a, b], i) => (
          <path
            key={a + b}
            d={`M${byId[a].x} ${byId[a].y} L${byId[b].x} ${byId[b].y}`}
            pathLength={1}
            data-hot={active === a || active === b || undefined}
            data-extra={byId[a].extra || byId[b].extra || undefined}
            style={{ "--i": i } as CSSProperties}
          />
        ))}
      </svg>
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
                  <p.Icon size={26} strokeWidth={1.6} aria-hidden="true" />
                  <span className={s.label}>{p.label}</span>
                </button>
                <p
                  id={`glass-${p.id}`}
                  className={s.tip}
                  data-side={p.side}
                  data-beside={p.beside || undefined}
                >
                  <strong>{p.label}</strong>
                  {p.text}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
