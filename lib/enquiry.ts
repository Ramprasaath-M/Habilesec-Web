export type Enquiry = {
    name: string;
    email: string;
    phone: string;
    company: string;
    services: string;
    comments: string;
    requestType: string;
    website: string;
};
export function validateEnquiry(input: unknown): {
    data?: Enquiry;
    error?: string;
} { if (!input || typeof input !== 'object' || Array.isArray(input))
    return { error: 'Please provide a valid enquiry.' }; const b = input as Record<string, unknown>; if (b.website_url)
    return { error: 'We could not validate this enquiry. Please contact us directly.' }; const limits: Record<string, number> = { name: 160, email: 254, phone: 40, company: 160, service: 500, message: 4000 }; for (const [key, max] of Object.entries(limits)) {
    if (b[key] !== undefined && typeof b[key] !== 'string')
        return { error: 'Please check your enquiry fields.' };
    if (String(b[key] || '').length > max)
        return { error: 'One or more fields exceed the allowed length.' };
} const str = (k: string) => String(b[k] || '').trim(); if (!str('name') || !str('message') || !str('email'))
    return { error: 'Name, email and message are required.' }; if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str('email')))
    return { error: 'Please enter a valid email address.' }; if (str('phone') && !/^[+()\d\s.-]{5,40}$/.test(str('phone')))
    return { error: 'Please enter a valid phone number.' }; if (b.consent !== 'on' && b.consent !== true)
    return { error: 'Please acknowledge the privacy policy.' }; return { data: { name: str('name'), email: str('email'), phone: str('phone'), company: str('company'), services: str('service'), comments: str('message'), requestType: 'contact', website: 'habilesec' } }; }
