import type { NextConfig } from "next";
const csp = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self' mailto:";
const nextConfig: NextConfig = {
    poweredByHeader: false,
    images: { formats: ["image/avif", "image/webp"] },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "X-Frame-Options", value: "DENY" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=()",
                    },
                    ...(process.env.NODE_ENV === "production"
                        ? [{ key: "Content-Security-Policy", value: csp }]
                        : []),
                ],
            },
        ];
    },
    async redirects() {
        return [
            { source: "/cyber-security-light", destination: "/", permanent: true },
            { source: "/vpn-hosting", destination: "/", permanent: true },
            { source: "/about", destination: "/about-us", permanent: true },
            { source: "/contact", destination: "/contact-us", permanent: true },
            { "source": "/our-work/ipcs-workfinity", "destination": "/our-work/ipcs-workfinity-soc-2-readiness", "permanent": true },
            { "source": "/our-work/busofttech", "destination": "/our-work/busofttech-integrated-compliance-at-scale", "permanent": true },
            { "source": "/our-work/isix-ai", "destination": "/our-work/isix-ai-iso-for-ai-innovation", "permanent": true },
            { "source": "/our-work/pro17analytics", "destination": "/our-work/pro17analytics-multi-regulatory-assurance", "permanent": true },
            { "source": "/our-work/technorucs", "destination": "/our-work/technorucs-soc-2-control-maturity", "permanent": true },
            { "source": "/our-work/goswift", "destination": "/our-work/goswift-dual-soc-assurance", "permanent": true },
            { "source": "/what-we-do/cybersecurity", "destination": "/what-we-do/security-testing", "permanent": true },
            { "source": "/industries/banking-financial-services", "destination": "/industries/bfsi", "permanent": true },
            { "source": "/industries/healthcare-life-sciences", "destination": "/industries/healthcare", "permanent": true },
            { "source": "/industries/information-technology-saas", "destination": "/industries/technology", "permanent": true },
            { "source": "/industries/manufacturing-industrial", "destination": "/industries/manufacturing", "permanent": true },
            { "source": "/industries/retail-ecommerce", "destination": "/industries/retail", "permanent": true },
            { "source": "/industries/government-public-sector", "destination": "/industries/government", "permanent": true },
            { "source": "/industries/education-edtech", "destination": "/industries", "permanent": true },
            { "source": "/industries/telecommunications", "destination": "/industries", "permanent": true },
            { "source": "/industries/energy-utilities", "destination": "/industries", "permanent": true },
            { "source": "/industries/logistics-transportation", "destination": "/industries", "permanent": true },
            { "source": "/industries/professional-business-services", "destination": "/industries", "permanent": true },
            { "source": "/industries/media-digital-platforms", "destination": "/industries", "permanent": true },
            { "source": "/insights/continuous-assurance", "destination": "/insights/cyber-resilience-through-iso-27001-why-certification-still-matters-in-2025", "permanent": true },
            { "source": "/insights/secure-product-engineering", "destination": "/what-we-do/digital-engineering", "permanent": true },
            { "source": "/insights/incident-response-evidence", "destination": "/services/hexn6", "permanent": true },
            { "source": "/insights/privacy-governance", "destination": "/what-we-do/data-privacy", "permanent": true },
            { "source": "/insights/ai-governance", "destination": "/what-we-do/ai-compliance", "permanent": true },
            { "source": "/resources/blog/p-mqphck4odd7n", "destination": "/insights/strengthening-the-backbone-assessing-cloud-and-network-security-in-central-hosti", "permanent": true },
            { "source": "/resources/blog/p-mqphaq3y2ved", "destination": "/insights/cybercriminals-are-using-ai-is-your-business-ready-to-fight-back", "permanent": true },
            { "source": "/resources/blog/p-mqph5vfur042", "destination": "/insights/fortifying-healthcare-security-managed-vapt-for-pii-and-phi-protection", "permanent": true },
            { "source": "/resources/blog/p-mqpgii3q33k0", "destination": "/insights/why-smbs-are-the-new-target-for-cybercriminals", "permanent": true },
            { "source": "/resources/blog/p-mqpglhw9bn4i", "destination": "/insights/cloud-security-misconfigurations-the-silent-killer-of-compliance", "permanent": true },
            { "source": "/resources/blog/p-mqpgn92j3x9q", "destination": "/insights/social-engineering-in-2025-modern-tactics-old-tricks", "permanent": true },
            { "source": "/resources/blog/p-mqpgqimwz8mn", "destination": "/insights/cyber-resilience-through-iso-27001-why-certification-still-matters-in-2025", "permanent": true },
            { "source": "/resources/blog/p-mqpgstog2inm", "destination": "/insights/zero-trust-architecture-beyond-the-buzzword", "permanent": true },
            { "source": "/resources/blog/p-mqpguztpk59a", "destination": "/insights/building-a-security-first-culture-why-awareness-beats-technology", "permanent": true },
            { "source": "/resources/blog/p-mqpgwyb4nhvq", "destination": "/insights/the-rise-of-ai-in-cybersecurity-friend-or-foe", "permanent": true },
            { "source": "/resources/blog/p-mqpgyzvbjw00", "destination": "/insights/how-to-spot-phishing-attempts-before-clicking-reply", "permanent": true },
            { "source": "/resources/blog/p-mqph0pjd0mff", "destination": "/insights/social-engineering-lessons-from-real-world-corporate-hacks", "permanent": true },
            { "source": "/resources/blog/p-mqph97d3k8iw", "destination": "/insights/the-rise-of-adaptive-security-why-static-defenses-no-longer-work", "permanent": true },
            { "source": "/resources/blog/p-mqph4bn8wl7j", "destination": "/insights/your-data-is-for-sale-how-to-protect-yourself-from-data-brokers", "permanent": true },
            { "source": "/resources/blog/p-mqph7o5e3pju", "destination": "/insights/securing-financial-and-card-data-vapt-management-for-a-leading-insurance-company", "permanent": true },
            { source: "/grcloop", destination: "/services/grcloop", permanent: true },
            {
                source: "/forgeloop",
                destination: "/services/forgeloop",
                permanent: true,
            },
            { source: "/hexn6", destination: "/services/hexn6", permanent: true },
            { source: "/resources/blog", destination: "/insights", permanent: true },
            {
                source: "/resources/success-stories",
                destination: "/our-work",
                permanent: true,
            },
        ];
    },
};
export default nextConfig;
