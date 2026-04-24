'use client';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';

export default function NewClientPage() {
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      service: (form.elements.namedItem('service') as HTMLSelectElement).value,
      size: (form.elements.namedItem('size') as HTMLSelectElement).value,
      city: (form.elements.namedItem('city') as HTMLInputElement).value,
      locale, type: 'client', source: 'landing-new-client',
    };
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error('Failed to submit form');
      setSubmitted(true);
    } catch (err) {
      setError(locale === 'he' ? 'שגיאה בשליחת הטופס. אנא נסה שוב.' : 'Error sending form. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen" dir="rtl" lang="he"
      style={{ fontFamily: "'Heebo', 'Assistant', sans-serif", background: '#faf8f3' }}>

      {/* TOP BAR */}
      <div style={{ background: '#0a1628', padding: '12px 24px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo — bigger, prominent */}
          <Image src="/logo.png" alt="Clean+" width={160} height={76} className="object-contain" priority />
          <a href="tel:+972500000000"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#c9a84c', color: '#0a1628', fontWeight: 700, padding: '10px 20px', borderRadius: '9999px', fontSize: '14px', textDecoration: 'none' }}>
            📞 <span dir="ltr">050-000-0000</span>
          </a>
        </div>
      </div>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #060f1e 0%, #0a1628 60%, #0d2444 100%)', padding: '60px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '48px', alignItems: 'center' }}>

            {/* Content */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(201,168,76,0.25)', borderRadius: '9999px', padding: '6px 16px', marginBottom: '24px', background: 'rgba(201,168,76,0.06)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                <span style={{ color: '#c9a84c', fontSize: '12px', fontWeight: 600 }}>זמינים היום · מגיעים תוך 24 שעות</span>
              </div>

              {/* Hebrew punctuation: no dash at start */}
              <h1 style={{ color: 'white', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.2, fontWeight: 800, marginBottom: '16px', fontFamily: "'Rubik', sans-serif" }}>
                ניקיון מקצועי
                <br />
                <span style={{ background: 'linear-gradient(135deg, #b8922a, #e8c96a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  שמגיע אליכם
                </span>
              </h1>

              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '28px', fontWeight: 300 }}>
                צוות מנוסה עם ציוד מקצועי מגיע אליכם ומבריק הכל.
                קבלו הצעת מחיר תוך שעה.
              </p>

              {/* Service-focused trust — NO guarantee */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {[
                  'צוות מנוסה ומוסמך — ללא פשרות על איכות',
                  'ציוד וחומרי ניקיון מקצועיים כלולים',
                  'מחיר שקוף ומוסכם לפני תחילת העבודה',
                  'זמינות 7 ימים — כולל סופי שבוע',
                ].map(text => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.65)', fontSize: '14px' }}>
                    <span style={{ color: '#c9a84c', fontWeight: 700, flexShrink: 0 }}>✓</span>
                    {text}
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px' }}>
                <div style={{ fontFamily: "'Rubik', sans-serif" }}>
                  <span style={{ fontSize: '2rem', fontWeight: 700, background: 'linear-gradient(135deg, #b8922a, #e8c96a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>4.9</span>
                </div>
                <div>
                  <div style={{ color: '#c9a84c', fontSize: '14px' }} dir="ltr">★★★★★</div>
                  <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', marginTop: '2px' }}>+500 לקוחות מרוצים</div>
                </div>
                <div style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.08)' }} />
                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', lineHeight: 1.5 }}>
                  &ldquo;שירות מעולה, הגיעו בדיוק בזמן&rdquo;
                </div>
              </div>
            </div>

            {/* Form */}
            <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.3)' }}>
              {/* Form header */}
              <div style={{ padding: '20px 28px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#0a1628', fontSize: '16px', fontFamily: "'Rubik', sans-serif" }}>הצעת מחיר</div>
                  <div style={{ color: '#9ca3af', fontSize: '12px', marginTop: '2px' }}>חוזרים תוך שעה · ללא התחייבות</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                  <span style={{ color: '#16a34a', fontSize: '12px', fontWeight: 600 }}>זמינים</span>
                </div>
              </div>

              <div style={{ padding: '24px 28px' }}>
                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '32px 0' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                    <div style={{ fontWeight: 700, color: '#0a1628', fontSize: '18px', fontFamily: "'Rubik', sans-serif" }}>הפרטים נשלחו</div>
                    <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '8px', marginBottom: '24px' }}>נחזור אליכם תוך שעה</p>
                    <a href="https://wa.me/972500000000?text=שלום, שלחתי טופס הצעת מחיר"
                      target="_blank" rel="noopener"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#25D366', color: 'white', fontWeight: 700, padding: '12px 24px', borderRadius: '9999px', fontSize: '14px', textDecoration: 'none' }}>
                      <WhatsAppIcon /> וואטסאפ
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <Field label="שם מלא">
                      <input name="name" type="text" required placeholder="ישראל ישראלי" style={inputStyle} />
                    </Field>
                    <Field label="טלפון">
                      <input name="phone" type="tel" required dir="ltr" placeholder="050-000-0000" style={{ ...inputStyle, textAlign: 'start' }} />
                    </Field>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <Field label="סוג שירות">
                        <select name="service" style={inputStyle}>
                          <option>ניקיון דירה / בית</option>
                          <option>ניקיון אחרי שיפוץ</option>
                          <option>ניקיון משרד / עסק</option>
                          <option>אחר</option>
                        </select>
                      </Field>
                      <Field label='גודל (מ"ר)'>
                        <select name="size" style={inputStyle}>
                          <option>עד 60</option>
                          <option>60–100</option>
                          <option>100–150</option>
                          <option>מעל 150</option>
                        </select>
                      </Field>
                    </div>
                    <Field label="עיר">
                      <input name="city" type="text" placeholder="תל אביב, הרצליה..." style={inputStyle} />
                    </Field>

                    <button type="submit" disabled={loading} style={{
                      width: '100%', padding: '14px', borderRadius: '12px', fontWeight: 700,
                      color: '#0a1628', fontSize: '15px', border: 'none', cursor: 'pointer',
                      background: 'linear-gradient(135deg, #c9a84c, #e8c96a)',
                      opacity: loading ? 0.6 : 1
                    }}>
                      {loading ? '⏳ שולח...' : 'שליחת הפנייה ←'}
                    </button>

                    <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '11px' }}>מחירים כוללים מע"מ כחוק · ללא התחייבות</p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '4px 0' }}>
                      <div style={{ flex: 1, height: '1px', background: '#f3f4f6' }} />
                      <span style={{ color: '#d1d5db', fontSize: '12px' }}>או</span>
                      <div style={{ flex: 1, height: '1px', background: '#f3f4f6' }} />
                    </div>

                    <a href="https://wa.me/972500000000?text=שלום, מעוניין בהצעת מחיר לניקיון"
                      target="_blank" rel="noopener"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#25D366', color: 'white', fontWeight: 700, padding: '14px', borderRadius: '12px', fontSize: '14px', textDecoration: 'none' }}>
                      <WhatsAppIcon /> שלחו הודעת וואטסאפ
                    </a>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social proof bar */}
      <div style={{ background: '#c9a84c', padding: '14px 24px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px' }}>
          {['+500 לקוחות מרוצים', '⭐ 4.9 בגוגל', '3 שנות ניסיון', 'מבוטח ומורשה'].map(item => (
            <span key={item} style={{ color: '#0a1628', fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(10,22,40,0.35)', display: 'inline-block' }} />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{ background: 'white', padding: '60px 24px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ color: '#0a1628', fontWeight: 700, fontSize: '1.6rem', marginBottom: '48px', fontFamily: "'Rubik', sans-serif" }}>איך זה עובד</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {[
              { n: '1', e: '📝', t: 'ממלאים טופס', s: '60 שניות' },
              { n: '2', e: '📞', t: 'אנחנו מתקשרים', s: 'תוך שעה' },
              { n: '3', e: '✨', t: 'מגיעים ועובדים', s: 'ביום שנקבע' },
            ].map(({ n, e, t, s }) => (
              <div key={n}>
                <div style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#faf8f3', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto' }}>{e}</div>
                  <div style={{ position: 'absolute', top: '-4px', insetInlineEnd: '-4px', width: '24px', height: '24px', borderRadius: '50%', background: '#0a1628', color: '#c9a84c', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{n}</div>
                </div>
                <div style={{ fontWeight: 700, color: '#0a1628', fontSize: '14px', marginBottom: '4px' }}>{t}</div>
                <div style={{ color: '#c9a84c', fontSize: '12px', fontWeight: 600 }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ background: '#faf8f3', padding: '60px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ color: '#0a1628', fontWeight: 700, fontSize: '1.6rem', marginBottom: '32px', textAlign: 'center', fontFamily: "'Rubik', sans-serif" }}>מה הלקוחות אומרים</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {[
              { text: 'הגיעו בזמן, עבדו ביסודיות. הדירה נראית כמו חדשה!', name: 'רונית לוי', city: 'תל אביב' },
              { text: 'שנה שלמה שהם מנקים את המשרד שלנו. תמיד בזמן, תמיד מושלם.', name: 'יוסי כהן', city: 'הרצליה' },
              { text: 'ניקיון אחרי שיפוץ — עבודה מדהימה. ממליצה בחום לכולם.', name: 'מיכל שרון', city: 'נתניה' },
            ].map(({ text, name, city }) => (
              <div key={name} style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid rgba(201,168,76,0.1)', boxShadow: '0 4px 20px rgba(10,22,40,0.06)' }}>
                <div style={{ color: '#c9a84c', fontSize: '13px', marginBottom: '12px' }} dir="ltr">★★★★★</div>
                <p style={{ color: '#4b5563', fontSize: '13px', lineHeight: 1.7, marginBottom: '16px', fontStyle: 'italic' }}>&ldquo;{text}&rdquo;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '12px', borderTop: '1px solid #f3f4f6' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#0a1628', color: '#c9a84c', fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{name.charAt(0)}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0a1628', fontSize: '13px' }}>{name}</div>
                    <div style={{ color: '#9ca3af', fontSize: '12px' }}>{city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second CTA */}
      <div style={{ background: '#0a1628', padding: '56px 24px', textAlign: 'center' }}>
        <h2 style={{ color: 'white', fontWeight: 700, fontSize: '1.6rem', marginBottom: '12px', fontFamily: "'Rubik', sans-serif" }}>מוכנים לבית מבריק</h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginBottom: '28px' }}>מלאו את הטופס למעלה או דברו איתנו ישירות</p>
        <a href="https://wa.me/972500000000" target="_blank" rel="noopener"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#25D366', color: 'white', fontWeight: 700, padding: '14px 32px', borderRadius: '9999px', fontSize: '15px', textDecoration: 'none' }}>
          <WhatsAppIcon /> וואטסאפ
        </a>
      </div>

      {/* Footer */}
      <div style={{ background: '#060f1e', padding: '24px', textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '12px' }}>
        <p>© 2025 Clean+ · כל הזכויות שמורות · מחירים כוללים מע"מ כחוק</p>
      </div>

      {/* Floating WhatsApp */}
      <a href="https://wa.me/972500000000" target="_blank" rel="noopener"
        style={{ position: 'fixed', bottom: '24px', insetInlineEnd: '24px', zIndex: 50, background: '#25D366', color: 'white', padding: '16px', borderRadius: '50%', boxShadow: '0 8px 32px rgba(37,211,102,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
        <WhatsAppIcon size={24} />
      </a>
    </div>
  );
}

// Shared components
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px 16px', borderRadius: '10px',
  border: '1px solid #e5e7eb', background: '#f9fafb',
  fontSize: '14px', color: '#0a1628', outline: 'none',
  fontFamily: "'Heebo', sans-serif",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#6b7280', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</label>
      {children}
    </div>
  );
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.128.552 4.195 1.6 6.012L.175 23.825l5.926-1.554a11.95 11.95 0 005.93 1.564h.001c6.645 0 12.03-5.385 12.03-12.031S18.676 0 12.031 0zm5.474 16.355c-.3-.15-1.774-.876-2.048-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.412-1.488-.89-.79-1.49-1.767-1.665-2.067-.175-.3-.018-.462.132-.612.135-.135.3-.3.45-.45.15-.15.2-.262.3-.438.1-.175.05-.325-.025-.475-.075-.15-.675-1.625-.925-2.225-.243-.585-.49-.505-.675-.515-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.112 3.225 5.112 4.525.712.312 1.267.5 1.7.637.712.225 1.362.188 1.875.113.575-.088 1.774-.725 2.024-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/>
    </svg>
  );
}
