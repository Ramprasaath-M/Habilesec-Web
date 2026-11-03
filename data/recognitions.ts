// Original labels/artwork recovered from Habilesec EX on 2026-10-26.
// No credential is approved yet. Pending entries never become published claims.
export type RecognitionCategory =
  | "organizational-certification"
  | "organizational-appraisal"
  | "individual-certification"
  | "compliance-standard"
  | "privacy-law"
  | "government-recognition";

export type RecognitionLogo = {
  name: string;
  category: RecognitionCategory;
  relationship: string;
  src: string;
  width: number;
  height: number;
  source: string;
};
export type ApprovedRecognition = RecognitionLogo & { status: "approved" };
export type PendingRecognition = RecognitionLogo & { status: "pending"; reason: string };
const legacyContent = "Habilesec EX/habilesec-site-new/src/lib/content.js:CREDENTIALS";

const inherited = (
  name: string, file: string, width: number, height: number,
  category: RecognitionCategory, relationship: string, reason: string,
): PendingRecognition => ({
  name, src: `/images/recognitions/${file}`, width, height, category,
  relationship, reason, source: legacyContent, status: "pending",
});
const individualReason = "Confirm the current individual holder and validity; the old site attributes credentials to the team/partner network, not HabileSec as an organization.";

export const pendingRecognitions: PendingRecognition[] = [
  inherited("ISO", "iso.jpg", 100, 82, "organizational-certification", "Organizational certification", "Verify the specific standard, certified entity, scope and current validity. Generic ISO artwork is not proof of certification."),
  inherited("CMMI", "cmmi.png", 80, 65, "organizational-appraisal", "Organizational appraisal", "Verify the appraised entity, appraisal level, scope and current validity."),
  inherited("CIPP/E", "cipp-e.png", 601, 601, "individual-certification", "Individual professional certification", individualReason),
  inherited("CISA", "cisa.png", 160, 63, "individual-certification", "Individual professional certification", individualReason),
  inherited("CISM", "cism.png", 160, 63, "individual-certification", "Individual professional certification", individualReason),
  inherited("CISSP", "cissp.png", 80, 78, "individual-certification", "Individual professional certification", individualReason),
  inherited("PCI DSS", "pci-dss.png", 80, 63, "compliance-standard", "Compliance standard", "Verify the applicable assessment or validation, assessed entity, scope and currency."),
  inherited("CCPA", "ccpa.jpg", 160, 94, "privacy-law", "Privacy law", "CCPA is a privacy law, not a certification. Confirm the supported compliance-reference context before display; no company compliance claim is established."),
  inherited("CRISC", "crisc.png", 160, 71, "individual-certification", "Individual professional certification", individualReason),
  inherited("OSCP", "oscp.png", 80, 80, "individual-certification", "Individual professional certification", individualReason),
  inherited("HIPAA", "hipaa.png", 80, 80, "privacy-law", "Healthcare privacy/security law", "HIPAA is a law, not a certification. Confirm the supported compliance-reference context before display; no company compliance claim is established."),
  {
    name: "DPIIT / Startup India", category: "government-recognition",
    relationship: "Government startup recognition", status: "pending",
    src: "/images/recognitions/dpiit-startup-india.png", width: 222, height: 82,
    source: "https://www.startupindia.gov.in/content/dam/invest-india/newhomepage/DPIIT-header.png",
    reason: "Original official branding recovered; neither project establishes HabileSec recognition. Confirm company recognition and applicable branding approval before display. No certificate number or approval date is asserted.",
  },
];

// Management-approved entries only. Pending artwork is kept ready above.
export const recognitions: ApprovedRecognition[] = [];
