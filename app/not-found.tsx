import { PageIntro } from "@/components/ui/page-intro";
import { ButtonLink } from "@/components/ui/links";

export default function NotFound() {
  return (
    <PageIntro
      crumbs={[{ label: "Page not found" }]}
      eyebrow="Page not found"
      title="Let’s get you back on track."
      lead="This page is unavailable. Explore our expertise or get in touch with our team."
    >
      <ButtonLink href="/">Back to home</ButtonLink>
      <ButtonLink href="/contact" variant="ghost">
        Contact us
      </ButtonLink>
    </PageIntro>
  );
}
