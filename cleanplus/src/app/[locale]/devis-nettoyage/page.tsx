'use client';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';

// israeli-paid-ads skill: VAT-inclusive pricing, dugri tone, mobile-first
// hebrew-content-writer skill: business-casual register, benefit-focused
// israeli-whatsapp-business skill: WhatsApp CTA primary channel

export default function DevisNettoyage() {
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
      service: (form.elements.namedItem('service') as HTMLSelectElement).value,
      size: (form.elements.namedItem('size') as HTMLSelectElement).value,
      city: (form.elements.namedItem('city') as HTMLInputElement).value,
      locale,
      type: 'client',
      source: 'landing-devis',
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

      {/* ── TOP BAR ── */}
      <div className="bg-[#c9a84c] py-3 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Image src="/logo.png" alt="Clean+" width={80} height={38} className="object-contain" />
          {/* israeli-whatsapp-business: Israeli phone format */}
          <a href="tel:+972500000000"
            className="flex items-center gap-2 bg-[#0a1628] text-white text-sm font-bold px-4 py-2 rounded-full">
            📞 <span dir="ltr">050-000-0000</span>
          </a>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="bg-[#0a1628] py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(201,168,76,1) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* hebrew-content-writer: hook first, benefit-focused */}
          <div className="inline-flex items-center gap-2 bg-[#c9a84c]/15 border border-[#c9a84c]/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[#c9a84c] text-xs font-medium">זמינים היום · מגיעים תוך 24 שעות</span>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              {/* hebrew-content-writer: informal register, direct */}
              <h1 className="text-white font-bold mb-4"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.2 }}>
                בית נקי ומבריק —<br />
                <span style={{
                  background: 'linear-gradient(135deg, #c9a84c, #e8c96a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  בלי להרים אצבע
                </span>
              </h1>

              <p className="text-white/55 text-lg font-light leading-relaxed mb-8">
                צוות מקצועי, מבוטח ואמין מגיע אליכם ומבריק הכל.
                קבלו הצעת מחיר חינם תוך שעה.
              </p>

              {/* Trust signals — israeli-paid-ads: local trust signals */}
              <div className="space-y-3 mb-8">
                {[
                  { icon: '✓', text: 'מחיר כולל מע"מ — ללא הפתעות' },
                  { icon: '✓', text: 'מבוטח במלואו — שקט נפשי מלא' },
                  { icon: '✓', text: 'ערבות 100% — לא מרוצים? נחזור חינם' },
                  { icon: '✓', text: 'זמינות 7 ימים — כולל שישי בבוקר' },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-white/70 text-sm">
                    <span className="text-[#c9a84c] font-bold text-base">{icon}</span>
                    {text}
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="text-3xl font-bold" style={{
                  background: 'linear-gradient(135deg, #c9a84c, #e8c96a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>4.9</div>
                <div>
                  <div className="text-[#c9a84c] text-sm" dir="ltr">★★★★★</div>
                  <div className="text-white/40 text-xs">+500 לקוחות מרוצים</div>
                </div>
                <div className="w-px h-10 bg-white/10 mx-2" />
                <div className="text-white/40 text-xs leading-relaxed">
                  &ldquo;שירות מעולה,<br />הגיעו בדיוק בזמן&rdquo;
                </div>
              </div>
            </div>

            {/* ── FORM ── */}
            <div className="bg-white rounded-3xl p-7 shadow-2xl">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-[#0a1628] font-bold text-xl mb-2">קיבלנו!</h3>
                  <p className="text-gray-500 text-sm mb-6">נחזור אליכם תוך שעה עם הצעת מחיר.</p>
                  {/* israeli-whatsapp-business: primary CTA */}
                  <a href="https://wa.me/972500000000?text=שלום, מעוניין בהצעת מחיר לניקיון"
                    target="_blank" rel="noopener"
                    className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-full text-sm">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.128.552 4.195 1.6 6.012L.175 23.825l5.926-1.554a11.95 11.95 0 005.93 1.564h.001c6.645 0 12.03-5.385 12.03-12.031S18.676 0 12.031 0zm5.474 16.355c-.3-.15-1.774-.876-2.048-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.412-1.488-.89-.79-1.49-1.767-1.665-2.067-.175-.3-.018-.462.132-.612.135-.135.3-.3.45-.45.15-.15.2-.262.3-.438.1-.175.05-.325-.025-.475-.075-.15-.675-1.625-.925-2.225-.243-.585-.49-.505-.675-.515-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.112 3.225 5.112 4.525.712.312 1.267.5 1.7.637.712.225 1.362.188 1.875.113.575-.088 1.774-.725 2.024-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/></svg>
                    דברו איתנו בוואטסאפ
                  </a>
                </div>
              ) : (
                <>
                  <h2 className="text-[#0a1628] font-bold text-xl mb-1">קבלו הצעת מחיר חינם</h2>
                  <p className="text-gray-400 text-sm mb-6">חוזרים אליכם תוך שעה · ללא התחייבות</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">שם מלא</label>
                        <input name="name" type="text" required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 outline-none transition text-sm"
                          placeholder="ישראל ישראלי" />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">טלפון</label>
                        <input name="phone" type="tel" required dir="ltr"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 outline-none transition text-sm text-start"
                          placeholder="050-000-0000" />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">סוג שירות</label>
                        <select name="service"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#c9a84c] outline-none transition text-sm text-gray-700">
                          <option>ניקיון דירה / בית</option>
                          <option>ניקיון אחרי שיפוץ</option>
                          <option>ניקיון משרד / עסק</option>
                          <option>ניקיון לפני / אחרי אירוע</option>
                          <option>אחר</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">גודל (מ"ר)</label>
                        <select name="size"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#c9a84c] outline-none transition text-sm text-gray-700">
                          <option>עד 60 מ"ר</option>
                          <option>60-100 מ"ר</option>
                          <option>100-150 מ"ר</option>
                          <option>מעל 150 מ"ר</option>
                        </select>
                      </div>

                      <div className="col-span-2">
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">עיר</label>
                        <input name="city" type="text"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 outline-none transition text-sm"
                          placeholder="תל אביב, הרצליה, נתניה..." />
                      </div>
                    </div>

                    {/* israeli-paid-ads: VAT mention in CTA */}
                    <button type="submit" disabled={loading}
                      className="w-full py-4 rounded-xl font-bold text-[#0a1628] text-base transition disabled:opacity-60"
                      style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c96a, #b8922a)', backgroundSize: '200% auto' }}>
                      {loading ? '⏳ שולח...' : 'קבלו הצעת מחיר ← '}
                    </button>

                    <p className="text-center text-gray-400 text-xs">
                      ללא התחייבות · מחירים כוללים מע"מ · חוזרים תוך שעה
                    </p>

                    {/* WhatsApp alternative */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-100" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-white px-3 text-gray-400 text-xs">או</span>
                      </div>
                    </div>

                    <a href="https://wa.me/972500000000?text=שלום, מעוניין בהצעת מחיר לניקיון"
                      target="_blank" rel="noopener"
                      className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3.5 rounded-xl transition text-sm">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.128.552 4.195 1.6 6.012L.175 23.825l5.926-1.554a11.95 11.95 0 005.93 1.564h.001c6.645 0 12.03-5.385 12.03-12.031S18.676 0 12.031 0zm5.474 16.355c-.3-.15-1.774-.876-2.048-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.412-1.488-.89-.79-1.49-1.767-1.665-2.067-.175-.3-.018-.462.132-.612.135-.135.3-.3.45-.45.15-.15.2-.262.3-.438.1-.175.05-.325-.025-.475-.075-.15-.675-1.625-.925-2.225-.243-.585-.49-.505-.675-.515-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.112 3.225 5.112 4.525.712.312 1.267.5 1.7.637.712.225 1.362.188 1.875.113.575-.088 1.774-.725 2.024-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/></svg>
                      שלחו הודעת וואטסאפ
                    </a>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF BAR ── */}
      <section className="bg-[#c9a84c] py-4 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-2 text-[#0a1628] text-sm font-semibold">
            {['+500 לקוחות מרוצים', '⭐ 4.9 בגוגל', '3 שנות ניסיון', 'מבוטח ומורשה'].map(item => (
              <span key={item} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0a1628]/40" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[#0a1628] font-bold text-2xl mb-12">איך זה עובד?</h2>
          <div className="grid grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 start-[20%] end-[20%] border-t-2 border-dashed border-[#c9a84c]/30" />
            {[
              { num: '01', emoji: '📝', title: 'ממלאים את הטופס', sub: '60 שניות בלבד' },
              { num: '02', emoji: '📞', title: 'אנחנו מתקשרים', sub: 'תוך שעה' },
              { num: '03', emoji: '✨', title: 'מגיעים ומבריקים', sub: 'ביום שנקבע' },
            ].map(({ num, emoji, title, sub }) => (
              <div key={num} className="relative z-10">
                <div className="relative inline-block mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#faf8f3] border border-[#c9a84c]/20 flex items-center justify-center text-2xl mx-auto">
                    {emoji}
                  </div>
                  <div className="absolute -top-1 -end-1 w-6 h-6 rounded-full bg-[#0a1628] text-[#c9a84c] text-xs font-bold flex items-center justify-center">
                    {num.replace('0','')}
                  </div>
                </div>
                <div className="font-bold text-[#0a1628] text-sm mb-1">{title}</div>
                <div className="text-gray-400 text-xs">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 px-4 bg-[#faf8f3]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[#0a1628] font-bold text-2xl text-center mb-10">מה הלקוחות אומרים</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { text: 'הגיעו בדיוק בזמן, עבדו ביסודיות. הדירה נראית כמו חדשה לגמרי!', name: 'רונית לוי', city: 'תל אביב' },
              { text: 'שנה שלמה שהם מנקים את המשרד שלנו. תמיד בזמן, תמיד מושלם.', name: 'יוסי כהן', city: 'הרצליה' },
              { text: 'ניקיון אחרי שיפוץ — עבודה מדהימה. ממליצה בחום לכולם!', name: 'מיכל שרון', city: 'נתניה' },
            ].map(({ text, name, city }) => (
              <div key={name} className="bg-white rounded-2xl p-6 border border-[#c9a84c]/10 shadow-sm">
                <div className="text-[#c9a84c] text-sm mb-3" dir="ltr">★★★★★</div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">&ldquo;{text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0a1628] text-[#c9a84c] font-bold text-sm flex items-center justify-center">
                    {name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-[#0a1628] text-sm">{name}</div>
                    <div className="text-gray-400 text-xs">{city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECOND CTA ── */}
      <section className="py-14 px-4 bg-[#0a1628]">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-white font-bold text-2xl mb-3">מוכנים לבית מבריק?</h2>
          <p className="text-white/45 text-sm mb-8">מלאו את הטופס למעלה או דברו איתנו ישירות</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#top" onClick={() => window.scrollTo(0,0)}
              className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-full text-[#0a1628] text-sm"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c96a)' }}>
              קבלו הצעת מחיר ←
            </a>
            <a href="https://wa.me/972500000000"
              target="_blank" rel="noopener"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-8 py-4 rounded-full text-sm">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.128.552 4.195 1.6 6.012L.175 23.825l5.926-1.554a11.95 11.95 0 005.93 1.564h.001c6.645 0 12.03-5.385 12.03-12.031S18.676 0 12.031 0zm5.474 16.355c-.3-.15-1.774-.876-2.048-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.412-1.488-.89-.79-1.49-1.767-1.665-2.067-.175-.3-.018-.462.132-.612.135-.135.3-.3.45-.45.15-.15.2-.262.3-.438.1-.175.05-.325-.025-.475-.075-.15-.675-1.625-.925-2.225-.243-.585-.49-.505-.675-.515-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.112 3.225 5.112 4.525.712.312 1.267.5 1.7.637.712.225 1.362.188 1.875.113.575-.088 1.774-.725 2.024-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/></svg>
              וואטסאפ
            </a>
          </div>
        </div>
      </section>

      {/* ── MINIMAL FOOTER ── */}
      <footer className="bg-[#08121C] py-6 px-4 text-center text-white/25 text-xs">
        <p>© 2025 Clean+ · כל הזכויות שמורות · <span dir="ltr">info@cleanplus.co.il</span></p>
        <p className="mt-1">מחירים מצוינים כוללים מע"מ כחוק</p>
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
