'use client';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';

export default function RecruitmentPageClient() {
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
      availability: (form.elements.namedItem('availability') as HTMLSelectElement).value,
      area: (form.elements.namedItem('area') as HTMLSelectElement).value,
      locale, type: 'recruitment', source: 'landing-recruitment',
    };
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error('Failed to submit');
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
          <Image src="/logo.png" alt="Clean+" width={160} height={76} className="object-contain" priority />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(74,222,128,0.35)', borderRadius: '9999px', padding: '8px 16px', background: 'rgba(74,222,128,0.08)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
            <span style={{ color: '#4ade80', fontSize: '13px', fontWeight: 700 }}>דרושים עובדים עכשיו</span>
          </div>
        </div>
      </div>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #060f1e 0%, #0a1628 60%, #0d2444 100%)', padding: '60px 24px' }}>
        <style>{`@media (max-width: 768px) { .recruitment-grid { grid-template-columns: 1fr !important; } }`}</style>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="recruitment-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '48px', alignItems: 'center' }}>

            {/* Content */}
            <div>
              <h1 style={{ color: 'white', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.2, fontWeight: 800, marginBottom: '16px', fontFamily: "'Rubik', sans-serif" }}>
                הצטרפו ל-Clean+
                <br />
                <span style={{ background: 'linear-gradient(135deg, #b8922a, #e8c96a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  עבודה יציבה, שכר טוב
                </span>
              </h1>

              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '28px', fontWeight: 300 }}>
                שעות גמישות, תשלום בזמן, סביבת עבודה נעימה.
                מחפשים אנשים אמינים ומסורים.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                {[
                  { icon: '💰', text: 'שכר תחרותי — משולם בזמן, כל חודש' },
                  { icon: '📅', text: 'שעות גמישות — לפי הנוחות שלכם' },
                  { icon: '📍', text: 'עבודה קרוב לבית — שיבוץ לפי אזור' },
                  { icon: '✅', text: 'העסקה מסודרת — חוקית ומבוטחת' },
                ].map(({ icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.65)', fontSize: '14px' }}>
                    <span style={{ fontSize: '18px' }}>{icon}</span>{text}
                  </div>
                ))}
              </div>

              {/* Recent hire */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px 16px' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4ade80' }} />
                </div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                  <span style={{ color: 'white', fontWeight: 600 }}>דנה</span> התחילה לעבוד לפני 3 ימים · <span style={{ color: '#c9a84c' }}>הרצליה</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.3)' }}>
              <div style={{ padding: '20px 28px', borderBottom: '1px solid #f3f4f6' }}>
                <div style={{ fontWeight: 700, color: '#0a1628', fontSize: '16px', fontFamily: "'Rubik', sans-serif" }}>שלחו את הפרטים שלכם</div>
                <div style={{ color: '#9ca3af', fontSize: '12px', marginTop: '2px' }}>חוזרים תוך 24 שעות · ללא ניסיון נדרש</div>
              </div>

              <div style={{ padding: '24px 28px' }}>
                {error && (
                  <div style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', color: '#dc2626', fontSize: '13px' }}>
                    ⚠️ {error}
                  </div>
                )}
                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '32px 0' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
                    <div style={{ fontWeight: 700, color: '#0a1628', fontSize: '18px' }}>קיבלנו את הפרטים</div>
                    <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '8px', marginBottom: '24px' }}>ניצור איתכם קשר תוך 24 שעות</p>
                    <a href="https://wa.me/972500000000?text=שלום, שלחתי טופס הצטרפות"
                      target="_blank" rel="noopener"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#25D366', color: 'white', fontWeight: 700, padding: '12px 24px', borderRadius: '9999px', fontSize: '14px', textDecoration: 'none' }}>
                      <WhatsAppIcon /> וואטסאפ
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <Field label="שם מלא">
                      <input name="name" type="text" required placeholder="שם פרטי ומשפחה" style={inputStyle} />
                    </Field>
                    <Field label="טלפון">
                      <input name="phone" type="tel" required dir="ltr" placeholder="050-000-0000" style={{ ...inputStyle, textAlign: 'start' }} />
                    </Field>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <Field label="זמינות">
                        <select name="availability" style={inputStyle}>
                          <option>מיידית</option>
                          <option>בעוד שבוע</option>
                          <option>בעוד חודש</option>
                        </select>
                      </Field>
                      <Field label="אזור">
                        <select name="area" style={inputStyle}>
                          <option>תל אביב</option>
                          <option>הרצליה / רעננה</option>
                          <option>נתניה / השרון</option>
                          <option>קיסריה / חדרה</option>
                          <option>אחר</option>
                        </select>
                      </Field>
                    </div>

                    <button type="submit" disabled={loading} style={{
                      width: '100%', padding: '14px', borderRadius: '12px', fontWeight: 700,
                      color: '#0a1628', fontSize: '15px', border: 'none', cursor: 'pointer',
                      background: 'linear-gradient(135deg, #c9a84c, #e8c96a)',
                      opacity: loading ? 0.6 : 1
                    }}>
                      {loading ? '⏳ שולח...' : 'שלחו את הפרטים ←'}
                    </button>

                    <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '11px' }}>ללא ניסיון קודם נדרש · כל המגזרים מוזמנים</p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ flex: 1, height: '1px', background: '#f3f4f6' }} />
                      <span style={{ color: '#d1d5db', fontSize: '12px' }}>או</span>
                      <div style={{ flex: 1, height: '1px', background: '#f3f4f6' }} />
                    </div>

                    <a href="https://wa.me/972500000000?text=שלום, מעוניין להצטרף לצוות Clean+"
                      target="_blank" rel="noopener"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#25D366', color: 'white', fontWeight: 700, padding: '14px', borderRadius: '12px', fontSize: '14px', textDecoration: 'none' }}>
                      <WhatsAppIcon /> וואטסאפ — תגובה מהירה
                    </a>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why join */}
      <div style={{ background: 'white', padding: '60px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ color: '#0a1628', fontWeight: 700, fontSize: '1.6rem', textAlign: 'center', marginBottom: '36px', fontFamily: "'Rubik', sans-serif" }}>למה להצטרף ל-Clean+</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {[
              { icon: '💰', t: 'שכר הוגן', d: 'משולם בזמן, כל חודש' },
              { icon: '📅', t: 'שעות גמישות', d: 'בחרו את המשמרות שמתאימות לכם' },
              { icon: '🚗', t: 'קרוב לבית', d: 'שיבוץ לפי האזור שלכם' },
              { icon: '👥', t: 'צוות חם', d: 'מנהלים שתמיד זמינים' },
              { icon: '📋', t: 'העסקה מסודרת', d: 'חוקית, מבוטחת ומכבדת' },
              { icon: '🌱', t: 'אפשרויות קידום', d: 'צמיחה בתוך הארגון' },
            ].map(({ icon, t, d }) => (
              <div key={t} style={{ background: '#faf8f3', borderRadius: '16px', padding: '20px', border: '1px solid rgba(201,168,76,0.1)' }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>{icon}</div>
                <div style={{ fontWeight: 700, color: '#0a1628', fontSize: '14px', marginBottom: '4px' }}>{t}</div>
                <div style={{ color: '#6b7280', fontSize: '12px', lineHeight: 1.6 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second CTA */}
      <div style={{ background: '#0a1628', padding: '56px 24px', textAlign: 'center' }}>
        <h2 style={{ color: 'white', fontWeight: 700, fontSize: '1.6rem', marginBottom: '12px', fontFamily: "'Rubik', sans-serif" }}>מוכנים להתחיל</h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginBottom: '28px' }}>מחכים לכם · כל המגזרים מוזמנים</p>
        <a href="https://wa.me/972500000000?text=שלום, מעוניין להצטרף לצוות Clean+"
          target="_blank" rel="noopener"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#25D366', color: 'white', fontWeight: 700, padding: '14px 32px', borderRadius: '9999px', fontSize: '15px', textDecoration: 'none' }}>
          <WhatsAppIcon /> שלחו הודעה עכשיו
        </a>
      </div>

      <div style={{ background: '#060f1e', padding: '24px', textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '12px' }}>
        <p>© 2025 Clean+ · כל הזכויות שמורות</p>
      </div>

      <a href="https://wa.me/972500000000" target="_blank" rel="noopener"
        style={{ position: 'fixed', bottom: '24px', insetInlineEnd: '24px', zIndex: 50, background: '#25D366', color: 'white', padding: '16px', borderRadius: '50%', boxShadow: '0 8px 32px rgba(37,211,102,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
        <WhatsAppIcon size={24} />
      </a>
    </div>
  );
}

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
