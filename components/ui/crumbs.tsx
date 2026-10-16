import Link from "next/link";
import s from "./crumbs.module.css";

export type Crumb = { label: string; href?: string };

export function Crumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className={s.crumbs} aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        {items.map((c, i) => (
          <li key={c.label}>
            {c.href && i < items.length - 1 ? (
              <Link href={c.href}>{c.label}</Link>
            ) : (
              <span aria-current="page">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
