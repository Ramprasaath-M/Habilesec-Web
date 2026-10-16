"use client";
import { useId, useState } from "react";
import Image from "next/image";
import { Plus, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { serviceCategories } from "@/data/service-categories";
import { industries } from "@/data/site";
import {
  challengeEntries,
  platformProducts,
  industryAlt,
  industryMedia,
} from "@/data/enterprise";
import { articles } from "@/data/editorial";
export function ChallengeExplorer() {
  return (
    <div className="challenge-list">
      {challengeEntries.map((item, i) => (
        <details className="challenge-item" key={item.title}>
          <summary>
            <span className="item-number">0{i + 1}</span>
            <span>{item.title}</span>
            <Plus size={22} aria-hidden="true" />
          </summary>
          <div className="challenge-answer">
            <p>{item.copy}</p>
            <p>{item.detail}</p>
            <Link className="text-link" href={item.href}>
              Find your next step
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </details>
      ))}
    </div>
  );
}
export function CapabilityList() {
  return (
    <div className="capability-list">
      {serviceCategories.map((category) => (
        <details key={category.slug} className="capability">
          <summary>
            <span className="item-number">{category.number}</span>
            <h3>{category.name}</h3>
            <Plus size={22} aria-hidden="true" />
          </summary>
          <div className="capability-body">
            <p>{category.description}</p>
            <ul>
              {category.services.slice(0, 4).map((service) => (
                <li key={service.id}>{service.name}</li>
              ))}
            </ul>
            <Link className="text-link" href={`/what-we-do/${category.slug}`}>
              Explore {category.name}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </details>
      ))}
    </div>
  );
}
export function ProductShowcase() {
  const [active, setActive] = useState(0);
  const id = useId();
  const item = platformProducts[active];
  return (
    <div className="product-showcase">
      <div>
        <div
          className="product-selector"
          role="group"
          aria-label="Choose a product"
        >
          {platformProducts.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              aria-pressed={active === i}
              aria-controls={id}
              onClick={() => setActive(i)}
            >
              {p.name}
            </button>
          ))}
        </div>
        <div id={id} className="product-copy" aria-live="polite">
          <p className="eyebrow">{item.category}</p>
          <h3>{item.name}</h3>
          <p>{item.summary}</p>
          <Link className="text-link" href={`/products/${item.slug}`}>
            Discover {item.name}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div
        className="product-workspace"
        aria-label={`${item.name} capabilities`}
      >
        <div className="workspace-top">
          <span>{item.name}</span>
          <span className="workspace-label">A connected workspace</span>
        </div>
        <p className="workspace-title">
          {active === 0
            ? "From requirements to readiness."
            : "Bring governance into focus."}
        </p>
        <ol>
          {item.features.map((f, i) => (
            <li key={f}>
              <span>0{i + 1}</span>
              {f}
              <span aria-hidden="true">&#8599;</span>
            </li>
          ))}
        </ol>
        <p className="workspace-foot">Capabilities overview</p>
      </div>
    </div>
  );
}
export function IndustryShowcase() {
  const [active, setActive] = useState(0);
  const id = useId();
  const item = industries[active];
  return (
    <div className="industry-showcase">
      <div
        className="industry-selector"
        role="group"
        aria-label="Choose an industry"
      >
        {industries.map((industry, i) => (
          <button
            type="button"
            key={industry.slug}
            aria-pressed={active === i}
            aria-controls={id}
            onClick={() => setActive(i)}
          >
            <span>0{i + 1}</span>
            {industry.name}
            <ArrowUpRight size={18} aria-hidden="true" />
          </button>
        ))}
      </div>
      <div id={id} className="industry-feature" aria-live="polite">
        <div className="industry-photo">
          <Image
            key={item.slug}
            src={industryMedia[item.slug]}
            alt={industryAlt[item.slug]}
            fill
            sizes="(min-width: 1000px) 55vw, 90vw"
          />
        </div>
        <div className="industry-feature-copy">
          <div>
            <h3>{item.name}</h3>
            <p>{item.challenge}</p>
          </div>
          <Link className="text-link" href={`/industries/${item.slug}`}>
            Explore sector
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
export function PerspectiveBrowser({
  initialCategory = "All",
}: {
  initialCategory?: string;
}) {
  const categories = ["All", ...new Set(articles.map((a) => a.category))];
  const [active, setActive] = useState(
    categories.includes(initialCategory) ? initialCategory : "All",
  );
  const selected = articles.filter(
    (a) => active === "All" || a.category === active,
  );
  return (
    <>
      <div
        className="filter-list"
        role="group"
        aria-label="Filter perspectives"
      >
        {categories.map((c) => (
          <button
            type="button"
            aria-pressed={active === c}
            key={c}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="result-count" role="status">
        {selected.length} practice notes
      </p>
      <div className="editorial-grid">
        {selected.map((a, i) => (
          <Link
            href={`/insights/${a.slug}`}
            className="editorial-card"
            key={a.slug}
          >
            <div className="editorial-image">
              <Image
                src={
                  i % 2
                    ? "/media/secure-engineering.webp"
                    : "/media/business-advisory.webp"
                }
                alt=""
                fill
                sizes="(min-width: 900px) 30vw, 90vw"
              />
            </div>
            <p className="eyebrow">{a.category} · Practice note</p>
            <h2>{a.title}</h2>
            <p>{a.summary}</p>
            <span className="text-link">
              Read perspective
              <ArrowUpRight size={18} aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
