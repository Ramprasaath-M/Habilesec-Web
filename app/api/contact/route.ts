import { validateEnquiry } from '@/lib/enquiry';
export const runtime = 'nodejs';
const attempts = new Map<string, {
    count: number;
    until: number;
}>();
const reply = (data: object, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
export async function POST(request: Request) { const origin = request.headers.get('origin'); if (origin && origin !== new URL(request.url).origin)
    return reply({ error: 'This enquiry must be sent from the HabileSec website.' }, 403); if (!request.headers.get('content-type')?.startsWith('application/json'))
    return reply({ error: 'Please submit a JSON enquiry.' }, 415); if (Number(request.headers.get('content-length') || 0) > 16000)
    return reply({ error: 'Your enquiry is too long.' }, 413); const now = Date.now(); for (const [k, v] of attempts)
    if (v.until < now)
        attempts.delete(k); const key = (request.headers.get('x-forwarded-for')?.split(',')[0] || 'local').trim(); const attempt = attempts.get(key); if (attempt && attempt.count >= 8)
    return reply({ error: 'Too many enquiries. Please wait a few minutes or contact us directly.' }, 429); if (attempts.size >= 2000 && !attempt)
    return reply({ error: 'Please try again later or contact us directly.' }, 429); let body: unknown; try {
    const reader = request.body?.getReader();
    if (!reader)
        return reply({ error: 'Please provide a valid enquiry.' }, 400);
    const chunks: Uint8Array[] = [];
    let bytes = 0;
    while (true) {
        const part = await reader.read();
        if (part.done)
            break;
        bytes += part.value.byteLength;
        if (bytes > 16000) {
            await reader.cancel();
            return reply({ error: 'Your enquiry is too long.' }, 413);
        }
        chunks.push(part.value);
    }
    const text = Buffer.concat(chunks).toString('utf8');
    body = JSON.parse(text);
}
catch {
    return reply({ error: 'Please provide a valid enquiry.' }, 400);
} const parsed = validateEnquiry(body); if (!parsed.data)
    return reply({ error: parsed.error }, 400); const configured = process.env.HABILESEC_BACKEND_ORIGIN || process.env.BACKEND_ORIGIN; if (!configured)
    return reply({ error: 'Online enquiries are temporarily unavailable. Please email enquiry@habilesec.com or call +91 435-357-5243.' }, 503); let upstream: URL; try {
    upstream = new URL('/api/contact/create', configured);
    if (!['http:', 'https:'].includes(upstream.protocol) || upstream.origin === new URL(request.url).origin)
        throw Error('Invalid backend');
}
catch {
    return reply({ error: 'Online enquiries are temporarily unavailable. Please contact us directly.' }, 503);
} attempts.set(key, { count: (attempt?.count || 0) + 1, until: attempt?.until || now + 10 * 60 * 1000 }); try {
    const response = await fetch(upstream, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(parsed.data), signal: AbortSignal.timeout(15000), cache: 'no-store', redirect: 'error' });
    const payload = await response.json().catch(() => null);
    if (!response.ok || payload?.success !== true)
        return reply({ error: 'We could not confirm receipt. Please contact us directly before submitting again.' }, 502);
    return reply({ success: true }, 201);
}
catch {
    return reply({ error: 'We could not confirm receipt. Please contact us directly before submitting again.' }, 502);
} }
