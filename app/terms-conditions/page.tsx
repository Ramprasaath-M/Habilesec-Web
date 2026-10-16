import { PageHero } from "@/components/enterprise/shared";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Terms & Conditions",
  "Terms governing use of the HabileSec website.",
  "/terms-conditions",
);
// Terms carried forward from the reference project's terms-conditions page.
const terms = [
  [
    "Use of the site",
    "You may use this website for lawful purposes only. You agree not to use it in any way that could damage, disable or impair the site, or interfere with any other party's use of it.",
  ],
  [
    "Intellectual property",
    "All content on this site, including text, graphics, logos and software, is the property of HabileSec or its licensors and is protected by applicable intellectual-property laws. You may not reproduce or distribute it without prior written consent.",
  ],
  [
    "Services",
    "Descriptions of services on this site are for general information. Specific engagements are governed by separate written agreements that take precedence over these terms in the event of any conflict.",
  ],
  [
    "Disclaimer",
    "The site is provided as is without warranties of any kind, express or implied. While we work to keep information accurate and current, we make no guarantee that it is complete, error-free or continuously available.",
  ],
  [
    "Limitation of liability",
    "To the maximum extent permitted by law, HabileSec shall not be liable for any indirect, incidental or consequential damages arising from your use of, or inability to use, this website.",
  ],
  [
    "Governing law",
    "These terms are governed by the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the courts of Tamil Nadu, India.",
  ],
];
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & conditions"
        copy="These terms govern your use of the HabileSec India Pvt Ltd website. By accessing the site, you agree to these terms. If you do not agree, please discontinue use."
      />
      <section className="section">
        <article className="container article-prose legal-prose">
          {terms.map(([title, copy]) => (
            <section key={title}>
              <h2>{title}</h2>
              <p>{copy}</p>
            </section>
          ))}
          <section>
            <h2>Contact us</h2>
            <p>
              Questions about these terms can be sent to{" "}
              <a className="text-link" href="mailto:enquiry@habilesec.com">
                enquiry@habilesec.com
              </a>
              .
            </p>
          </section>
        </article>
      </section>
    </>
  );
}
