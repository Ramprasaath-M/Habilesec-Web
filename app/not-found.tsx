import { ButtonLink } from "@/components/enterprise/shared";
export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="eyebrow">Page not found</p>
        <h1>
          Let&apos;s get you
          <br />
          back on track.
        </h1>
        <p className="page-lead">
          This page is unavailable. Explore our expertise or get in touch with
          our team.
        </p>
        <div className="hero-actions">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/contact" secondary>
            Contact us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
