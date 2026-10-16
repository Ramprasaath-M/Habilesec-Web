"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { serviceCategories } from "@/data/service-categories";
import { products } from "@/data/site";
import { serviceVisuals } from "@/data/visuals";
import { TextLink } from "@/components/ui/links";
import s from "./header.module.css";

type MenuId = "services" | "products";

const plainLinks = [
  { label: "Insights", href: "/insights" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const path = usePathname();
  const root = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);
  const [openId, setOpenId] = useState<MenuId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [previewIdx, setPreviewIdx] = useState(0);
  const [everOpened, setEverOpened] = useState(false);

  function closeAll() {
    window.clearTimeout(hoverTimer.current);
    setOpenId(null);
    setMobileOpen(false);
  }
  function openMenu(id: MenuId | null) {
    setOpenId(id);
    if (id === "services") setEverOpened(true);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const outside = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) {
        setOpenId(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const hadMenu = openId !== null;
      const hadDrawer = mobileOpen;
      if (!hadMenu && !hadDrawer) return;
      const inside = root.current?.contains(document.activeElement);
      setOpenId(null);
      setMobileOpen(false);
      if (inside) {
        const target = hadMenu
          ? root.current?.querySelector<HTMLButtonElement>(
              "button[aria-expanded='true']",
            )
          : toggle.current;
        (hadDrawer ? toggle.current : target)?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openId, mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [mobileOpen]);

  const active = (href: string) => path === href || path.startsWith(href + "/");

  function trigger(id: MenuId, label: string, href: string) {
    const open = openId === id;
    return (
      <li
        className={s.item}
        onPointerEnter={(e) => {
          if (e.pointerType !== "mouse") return;
          window.clearTimeout(hoverTimer.current);
          hoverTimer.current = window.setTimeout(() => openMenu(id), 90);
        }}
        onPointerLeave={(e) => {
          if (e.pointerType !== "mouse") return;
          window.clearTimeout(hoverTimer.current);
          hoverTimer.current = window.setTimeout(() => setOpenId(null), 180);
        }}
      >
        <button
          type="button"
          className={s.trigger}
          data-active={active(href) || undefined}
          aria-expanded={open}
          aria-controls={`menu-${id}`}
          onClick={() => openMenu(open ? null : id)}
        >
          {label}
          <ChevronDown size={15} aria-hidden="true" />
        </button>
        <div
          id={`menu-${id}`}
          className={s.panel}
          data-open={open}
          role="group"
          aria-label={label}
        >
          <div className={s.panelClip}>
            <div className={`container ${s.panelInner}`}>
              {id === "services" ? (
                <>
                  <div className={s.panelIntro}>
                    <p className="eyebrow">What we do</p>
                    <p className={`serif-3 ${s.panelTitle}`}>
                      Five disciplines. Three practices. One connected model.
                    </p>
                    <TextLink href="/what-we-do">All services</TextLink>
                  </div>
                  <ul className={s.panelList}>
                    {serviceCategories.map((c, i) => (
                      <li key={c.slug}>
                        <Link
                          href={`/what-we-do/${c.slug}`}
                          onClick={closeAll}
                          onPointerEnter={() => setPreviewIdx(i)}
                          onFocus={() => setPreviewIdx(i)}
                          data-current={previewIdx === i || undefined}
                        >
                          <span className={`num ${s.panelNum}`}>{c.number}</span>
                          <span>
                            <strong>{c.name}</strong>
                            <small>{c.description}</small>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className={s.preview} aria-hidden="true">
                    {everOpened &&
                      serviceCategories.map((c, i) => (
                        <Image
                          key={c.slug}
                          src={serviceVisuals[c.slug].src}
                          alt=""
                          fill
                          sizes="320px"
                          data-on={previewIdx === i || undefined}
                          style={{ objectPosition: serviceVisuals[c.slug].pos }}
                        />
                      ))}
                  </div>
                </>
              ) : (
                <>
                  <div className={s.panelIntro}>
                    <p className="eyebrow">Products</p>
                    <p className={`serif-3 ${s.panelTitle}`}>
                      Platforms that bring structure to governance and
                      readiness.
                    </p>
                    <TextLink href="/products">All products</TextLink>
                  </div>
                  <ul className={`${s.panelList} ${s.panelListWide}`}>
                    {products.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/products/${p.slug}`} onClick={closeAll}>
                          <span>
                            <strong>{p.title}</strong>
                            <small>
                              {p.eyebrow}. {p.summary}
                            </small>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </li>
    );
  }

  return (
    <header
      ref={root}
      className={s.header}
      data-scrolled={scrolled || undefined}
      onBlur={(e) => {
        if (e.relatedTarget && !root.current?.contains(e.relatedTarget as Node))
          setOpenId(null);
      }}
    >
      <div className={`container ${s.row}`}>
        <Link
          href="/"
          className={s.brand}
          onClick={closeAll}
          aria-label="HabileSec home"
        >
          <Image
            src="/brand/habilesec-logo.png"
            width={164}
            height={45}
            alt="HabileSec — Governance Excellence"
            priority
          />
        </Link>
        <button
          ref={toggle}
          type="button"
          className={s.burger}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          aria-controls="primary-navigation"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
        <nav
          id="primary-navigation"
          className={s.nav}
          data-open={mobileOpen}
          aria-label="Primary"
        >
          <ul className={s.list}>
            {trigger("services", "What We Do", "/what-we-do")}
            {trigger("products", "Products", "/products")}
            {plainLinks.map((l) => (
              <li key={l.href} className={s.item}>
                <Link
                  href={l.href}
                  className={s.link}
                  onClick={closeAll}
                  aria-current={active(l.href) ? "page" : undefined}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className={`btn btn--sm ${s.cta}`}
            onClick={closeAll}
          >
            Let&apos;s talk
          </Link>
        </nav>
      </div>
    </header>
  );
}
