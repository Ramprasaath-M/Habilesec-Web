import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function ButtonLink({
  href,
  children,
  variant = "solid",
  size,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  size?: "sm";
  className?: string;
}) {
  const cls = [
    "btn",
    variant === "ghost" ? "btn--ghost" : "",
    size === "sm" ? "btn--sm" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Link href={href} className={cls}>
      {children}
      <ArrowRight size={18} aria-hidden="true" />
    </Link>
  );
}

export function TextLink({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const inner = (
    <>
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </>
  );
  if (external)
    return (
      <a
        href={href}
        className={`tlink ${className}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  return (
    <Link href={href} className={`tlink ${className}`}>
      {inner}
    </Link>
  );
}
