import { PageHero } from "@/components/enterprise/shared";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Privacy Policy",
  "Information about the HabileSec website enquiry flow and privacy contact.",
  "/privacy-policy",
);
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        copy="How this website handles your enquiry and how to contact HabileSec about privacy."
      />
      <section className="section">
        <article className="container article-prose legal-prose">
          <section>
            <h2>Information you choose to share</h2>
            <p>
              The enquiry form asks for your name, email address, company, phone
              number and message. It prepares an email draft in your browser.
              The form does not submit these details to a website server. You
              choose whether to send the draft using your email application.
            </p>
          </section>
          <section>
            <h2>How enquiries are used</h2>
            <p>
              When you send an enquiry, HabileSec receives the information in
              your email and uses it to respond to your request and discuss
              relevant services. Please avoid including passwords or sensitive
              incident evidence in an initial enquiry.
            </p>
          </section>
          <section>
            <h2>Website technology</h2>
            <p>
              This implementation uses locally hosted fonts and images. It does
              not include advertising trackers, analytics scripts, newsletter
              subscriptions or non-essential cookies. The hosting provider may
              process technical request information needed to deliver and secure
              the website.
            </p>
          </section>
          <section>
            <h2>Other websites</h2>
            <p>
              Links to product websites and social media may take you to
              services with their own privacy notices. Those services manage
              information according to their own policies.
            </p>
          </section>
          <section>
            <h2>Privacy questions</h2>
            <p>
              For questions about information shared with HabileSec, including
              access, correction or deletion requests, contact{" "}
              <a href="mailto:Privacy@habilesec.com" className="text-link">
                Privacy@habilesec.com
              </a>
              . You may also write to HabileSec India Pvt Ltd, 46/10 Sankar Iyer
              Garden, Doctor Moorthy Road, Kumbakonam, India 612001.
            </p>
          </section>
        </article>
      </section>
    </>
  );
}
