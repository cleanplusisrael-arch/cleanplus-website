import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const PIXEL_ID = process.env.META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const TEST_CODE = process.env.META_TEST_EVENT_CODE; // optional — remove in production

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    // Not configured — log and return 200 so client doesn't retry
    console.warn('[meta-capi] META_PIXEL_ID or META_ACCESS_TOKEN not set');
    return NextResponse.json({ ok: false, reason: 'not_configured' });
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    '';

  // Hash IP for privacy (Meta requires hashed PII)
  const hashedIp = ip ? crypto.createHash('sha256').update(ip).digest('hex') : undefined;

  const event = {
    event_name: body.event || 'Contact',
    event_time: Math.floor((body.timestamp || Date.now()) / 1000),
    event_source_url: body.url || req.headers.get('referer') || '',
    action_source: 'website',
    user_data: {
      ...(hashedIp ? { client_ip_address: hashedIp } : {}),
      client_user_agent: body.userAgent || req.headers.get('user-agent') || '',
    },
    custom_data: {
      content_name: body.page || '',
      content_category: body.eventSource || 'whatsapp_click',
    },
  };

  const payload: Record<string, unknown> = { data: [event] };
  if (TEST_CODE) payload.test_event_code = TEST_CODE;

  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );
    const result = await res.json();
    return NextResponse.json({ ok: true, result });
  } catch (err) {
    console.error('[meta-capi] error:', err);
    return NextResponse.json({ ok: false, error: String(err) });
  }
}
