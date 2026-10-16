"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { serviceCategories } from "@/data/service-categories";
import { platformProducts } from "@/data/enterprise";
const links = [
  { label: "What We Do", href: "/what-we-do", menu: "services" },
  { label: "Products", href: "/products", menu: "products" },
  { label: "Insights", href: "/insights" },
  { label: "Industries", href: "/industries" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
];
export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const root = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  function close() {
    setOpen(false);
    root.current
      ?.querySelectorAll("details[open]")
      .forEach((el) => el.removeAttribute("open"));
  }
  useEffect(() => {
    const outside = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  return (
    <header
      className="site-header"
      ref={root}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          const detail = (e.target as HTMLElement).closest("details");
          if (detail) {
            detail.removeAttribute("open");
            detail.querySelector("summary")?.focus();
          } else {
            close();
            toggle.current?.focus();
          }
        }
      }}
    >
      <div className="container header-row">
        <Link
          href="/"
          className="brand"
          onClick={close}
          aria-label="HabileSec home"
        >
          <Image
            src="/brand/habilesec-logo.png"
            width={180}
            height={58}
            alt="HabileSec — Governance Excellence"
            loading="eager"
            fetchPriority="high"
          />
        </Link>
        <button
          ref={toggle}
          type="button"
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
        <nav
          id="primary-navigation"
          className="primary-nav"
          data-open={open}
          aria-label="Primary navigation"
        >
          {links.map((item) =>
            item.menu ? (
              <details
                key={item.href}
                className="nav-disclosure"
                onToggle={(e) => {
                  if (e.currentTarget.open)
                    root.current
                      ?.querySelectorAll("details[open]")
                      .forEach((d) => {
                        if (d !== e.currentTarget) d.removeAttribute("open");
                      });
                }}
              >
                <summary
                  className={path.startsWith(item.href) ? "nav-active" : ""}
                >
                  {item.label}
                  <ChevronDown size={13} aria-hidden="true" />
                </summary>
                <div className="nav-dropdown">
                  <Link
                    href={item.href}
                    className="dropdown-overview"
                    onClick={close}
                  >
                    Explore {item.label.toLowerCase()}
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </Link>
                  <div className="dropdown-links">
                    {item.menu === "services"
                      ? serviceCategories.map((c) => (
                          <Link
                            key={c.slug}
                            href={`/what-we-do/${c.slug}`}
                            onClick={close}
                          >
                            <span>{c.name}</span>
                            <small>{c.description}</small>
                          </Link>
                        ))
                      : platformProducts.map((p) => (
                          <Link
                            key={p.slug}
                            href={`/products/${p.slug}`}
                            onClick={close}
                          >
                            <span>{p.name}</span>
                            <small>{p.category}</small>
                          </Link>
                        ))}
                  </div>
                </div>
              </details>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                aria-current={path.startsWith(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <Link href="/contact" className="header-contact" onClick={close}>
          Let&apos;s talk
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}
