import { NextRequest, NextResponse } from 'next/server';

// Firebase Admin will be initialized when env vars are set
async function saveToFirestore(data: Record<string, unknown>, collection: string) {
  const { adminDb } = await import('@/lib/firebase-admin');
  return adminDb.collection(collection).add(data);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, service, notes, locale, type } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const collection = type === 'recruitment' ? 'leads_candidates' : 'leads_clients';

    const leadData = {
      name,
      phone,
      service: service || null,
      notes: notes || null,
      locale: locale || 'he',
      type: type || 'client',
      status: 'new',
      createdAt: new Date().toISOString(),
      source: 'website',
    };

    // Only save if Firebase is configured
    if (process.env.FIREBASE_PROJECT_ID) {
      await saveToFirestore(leadData, collection);
    } else {
      console.log('[DEV] Lead received (Firebase not configured):', leadData);
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
