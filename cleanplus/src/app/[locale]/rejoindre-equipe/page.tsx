'use client';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';

// israeli-paid-ads: recruitment funnel, mobile-first 95% traffic
// hebrew-content-writer: warm tone for job seekers, gender-neutral
// israeli-social-content: HE/RU/AM audience targeting

export default function RejoindreEquipe() {
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      availability: (form.elements.namedItem('availability') as HTMLSelectElement).value,
      area: (form.elements.namedItem('area') as HTMLSelectElement).value,
      locale,
      type: 'recruitment',
      source: 'landing-recrutement',
    };
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
    } catch { /* fail silently */ }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#faf8f3] font-heebo" dir="rtl" lang="he">

      {/* TOP BAR */}
      <div className="bg-[#0a1628] py-3 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Image src="/logo.png" alt="Clean+" width={80} height={38} className="object-contain" />
          <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/40 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs font-bold">דרושים עובדים עכשיו</span>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="bg-[#0a1628] py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(201,168,76,1) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              {/* hebrew-content-writer: gender-neutral, benefit-first */}
              <h1 className="text-white font-bold mb-4"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.2 }}>
                הצטרפו ל-Clean+ —<br />
                <span style={{
                  background: 'linear-gradient(135deg, #c9a84c, #e8c96a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  עבודה יציבה, שכר טוב
                </span>
              </h1>

              <p className="text-white/55 text-lg font-light leading-relaxed mb-8">
                שעות גמישות, תשלום בזמן, סביבת עבודה נעימה.
                מחפשים אנשים אמינים ומסורים.
              </p>

              {/* Benefits */}
              <div className="space-y-3 mb-8">
                {[
                  { icon: '💰', text: 'שכר תחרותי — משולם בזמן, כל חודש' },
                  { icon: '📅', text: 'שעות גמישות — לפי הנוחות שלכם' },
                  { icon: '📍', text: 'עבודה קרוב לבית — שיבוץ לפי אזור' },
                  { icon: '✅', text: 'העסקה מסודרת — חוקית ומבוטחת' },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-white/70 text-sm">
                    <span className="text-xl">{icon}</span>
                    {text}
                  </div>
                ))}
              </div>

              {/* Recent hire notification */}
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-60" />
                </div>
                <div className="text-white/50 text-xs">
                  <span className="text-white font-medium">דנה</span> התחילה לעבוד אתנו לפני 3 ימים · <span className="text-[#c9a84c]">הרצליה</span>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="bg-white rounded-3xl p-7 shadow-2xl">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-[#0a1628] font-bold text-xl mb-2">קיבלנו את הפרטים!</h3>
                  <p className="text-gray-500 text-sm mb-6">ניצור איתכם קשר תוך 24 שעות.</p>
                  <a href="https://wa.me/972500000000?text=שלום, שלחתי טופס הצטרפות לצוות Clean+"
                    target="_blank" rel="noopener"
                    className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-full text-sm">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.128.552 4.195 1.6 6.012L.175 23.825l5.926-1.554a11.95 11.95 0 005.93 1.564h.001c6.645 0 12.03-5.385 12.03-12.031S18.676 0 12.031 0zm5.474 16.355c-.3-.15-1.774-.876-2.048-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.412-1.488-.89-.79-1.49-1.767-1.665-2.067-.175-.3-.018-.462.132-.612.135-.135.3-.3.45-.45.15-.15.2-.262.3-.438.1-.175.05-.325-.025-.475-.075-.15-.675-1.625-.925-2.225-.243-.585-.49-.505-.675-.515-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.112 3.225 5.112 4.525.712.312 1.267.5 1.7.637.712.225 1.362.188 1.875.113.575-.088 1.774-.725 2.024-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/></svg>
                    דברו איתנו בוואטסאפ
                  </a>
                </div>
              ) : (
                <>
                  <h2 className="text-[#0a1628] font-bold text-xl mb-1">שלחו את הפרטים שלכם</h2>
                  <p className="text-gray-400 text-sm mb-6">חוזרים אליכם תוך 24 שעות · ללא ניסיון קודם נדרש</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">שם מלא</label>
                      <input name="name" type="text" required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 outline-none transition text-sm"
                        placeholder="שם פרטי + משפחה" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">טלפון</label>
                      <input name="phone" type="tel" required dir="ltr"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 outline-none transition text-sm text-start"
                        placeholder="050-000-0000" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">זמינות</label>
                        <select name="availability"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#c9a84c] outline-none transition text-sm text-gray-700">
                          <option>מיידית</option>
                          <option>בעוד שבוע</option>
                          <option>בעוד חודש</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">אזור</label>
                        <select name="area"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#c9a84c] outline-none transition text-sm text-gray-700">
                          <option>תל אביב</option>
                          <option>הרצליה / רעננה</option>
                          <option>נתניה / השרון</option>
                          <option>קיסריה / חדרה</option>
                          <option>אחר</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit" disabled={loading}
                      className="w-full py-4 rounded-xl font-bold text-[#0a1628] text-base transition disabled:opacity-60"
                      style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c96a)' }}>
                      {loading ? '⏳ שולח...' : 'שלחו את הפרטים ←'}
                    </button>

                    <p className="text-center text-gray-400 text-xs">
                      ללא ניסיון קודם נדרש · כל המגזרים מוזמנים
                    </p>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-100" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-white px-3 text-gray-400 text-xs">או</span>
                      </div>
                    </div>

                    <a href="https://wa.me/972500000000?text=שלום, מעוניין להצטרף לצוות Clean+"
                      target="_blank" rel="noopener"
                      className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3.5 rounded-xl transition text-sm">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.128.552 4.195 1.6 6.012L.175 23.825l5.926-1.554a11.95 11.95 0 005.93 1.564h.001c6.645 0 12.03-5.385 12.03-12.031S18.676 0 12.031 0zm5.474 16.355c-.3-.15-1.774-.876-2.048-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.412-1.488-.89-.79-1.49-1.767-1.665-2.067-.175-.3-.018-.462.132-.612.135-.135.3-.3.45-.45.15-.15.2-.262.3-.438.1-.175.05-.325-.025-.475-.075-.15-.675-1.625-.925-2.225-.243-.585-.49-.505-.675-.515-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.112 3.225 5.112 4.525.712.312 1.267.5 1.7.637.712.225 1.362.188 1.875.113.575-.088 1.774-.725 2.024-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/></svg>
                      וואטסאפ — תגובה מהירה
                    </a>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[#0a1628] font-bold text-2xl text-center mb-10">למה להצטרף ל-Clean+?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { icon: '💰', title: 'שכר הוגן', desc: 'משולם בזמן, כל חודש ללא עיכובים' },
              { icon: '📅', title: 'שעות גמישות', desc: 'בחרו את המשמרות שמתאימות לכם' },
              { icon: '🚗', title: 'קרוב לבית', desc: 'שיבוץ לפי האזור שלכם' },
              { icon: '👥', title: 'צוות חם', desc: 'מנהלים שתמיד זמינים לעזור' },
              { icon: '📋', title: 'העסקה מסודרת', desc: 'חוקית, מבוטחת ומכבדת' },
              { icon: '🌱', title: 'אפשרויות קידום', desc: 'צמיחה בתוך הארגון' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-[#faf8f3] rounded-2xl p-5 border border-[#c9a84c]/10">
                <div className="text-2xl mb-3">{icon}</div>
                <div className="font-bold text-[#0a1628] text-sm mb-1">{title}</div>
                <div className="text-gray-500 text-xs leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 px-4 bg-[#faf8f3]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[#0a1628] font-bold text-2xl mb-10">תהליך הגיוס שלנו</h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              { num: '1', text: 'שולחים טופס', sub: '30 שניות' },
              { num: '2', text: 'שיחת היכרות', sub: 'תוך 24 שעות' },
              { num: '3', text: 'מתחילים לעבוד', sub: 'תוך שבוע' },
            ].map(({ num, text, sub }) => (
              <div key={num}>
                <div className="w-12 h-12 rounded-full bg-[#0a1628] text-[#c9a84c] font-bold text-lg flex items-center justify-center mx-auto mb-3">
                  {num}
                </div>
                <div className="font-bold text-[#0a1628] text-sm mb-1">{text}</div>
                <div className="text-[#c9a84c] text-xs font-medium">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECOND CTA */}
      <section className="py-14 px-4 bg-[#0a1628]">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-white font-bold text-2xl mb-3">מוכנים להתחיל?</h2>
          <p className="text-white/45 text-sm mb-8">מחכים לכם · כל המגזרים מוזמנים</p>
          <a href="https://wa.me/972500000000?text=שלום, מעוניין להצטרף לצוות Clean+"
            target="_blank" rel="noopener"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-8 py-4 rounded-full text-base">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.128.552 4.195 1.6 6.012L.175 23.825l5.926-1.554a11.95 11.95 0 005.93 1.564h.001c6.645 0 12.03-5.385 12.03-12.031S18.676 0 12.031 0zm5.474 16.355c-.3-.15-1.774-.876-2.048-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.412-1.488-.89-.79-1.49-1.767-1.665-2.067-.175-.3-.018-.462.132-.612.135-.135.3-.3.45-.45.15-.15.2-.262.3-.438.1-.175.05-.325-.025-.475-.075-.15-.675-1.625-.925-2.225-.243-.585-.49-.505-.675-.515-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.112 3.225 5.112 4.525.712.312 1.267.5 1.7.637.712.225 1.362.188 1.875.113.575-.088 1.774-.725 2.024-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/></svg>
            שלחו הודעה עכשיו
          </a>
        </div>
      </section>

      <footer className="bg-[#08121C] py-6 px-4 text-center text-white/25 text-xs">
        <p>© 2025 Clean+ · כל הזכויות שמורות</p>
      </footer>

      {/* Floating WhatsApp */}
      <a href="https://wa.me/972500000000" target="_blank" rel="noopener"
        className="fixed bottom-6 end-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform">
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.128.552 4.195 1.6 6.012L.175 23.825l5.926-1.554a11.95 11.95 0 005.93 1.564h.001c6.645 0 12.03-5.385 12.03-12.031S18.676 0 12.031 0zm5.474 16.355c-.3-.15-1.774-.876-2.048-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.412-1.488-.89-.79-1.49-1.767-1.665-2.067-.175-.3-.018-.462.132-.612.135-.135.3-.3.45-.45.15-.15.2-.262.3-.438.1-.175.05-.325-.025-.475-.075-.15-.675-1.625-.925-2.225-.243-.585-.49-.505-.675-.515-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.112 3.225 5.112 4.525.712.312 1.267.5 1.7.637.712.225 1.362.188 1.875.113.575-.088 1.774-.725 2.024-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/></svg>
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
      </a>
    </div>
  );
}
