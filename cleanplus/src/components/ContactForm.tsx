'use client';
import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';

export default function ContactForm() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      service: (form.elements.namedItem('service') as HTMLSelectElement).value,
      notes: (form.elements.namedItem('notes') as HTMLTextAreaElement).value,
      locale,
      type: 'client',
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
    } catch {
      setError('שגיאה בשליחה, אנא נסה שוב');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-white relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-white to-white" />
      <div className="absolute top-0 start-0 end-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* Left — Info */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs tracking-ultra uppercase font-medium">Contact</span>
            </div>
            <h2 className="font-display font-light text-navy mb-6"
              style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
              {t('title')}
            </h2>
            <p className="text-gray-500 font-light text-lg mb-12">{t('subtitle')}</p>

            <div className="space-y-6">
              {[
                { icon: '📞', text: '050-0000000' },
                { icon: '✉️', text: 'info@cleanplus.co.il' },
                { icon: '📍', text: 'תל אביב והשרון' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-navy/5 border border-navy/10 flex items-center justify-center text-xl">
                    {icon}
                  </div>
                  <span className="text-navy font-medium">{text}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a href="https://wa.me/972500000000?text=שלום, אני מעוניין בשירותי ניקיון"
              target="_blank" rel="noopener"
              className="mt-12 inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-8 py-4 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.128.552 4.195 1.6 6.012L.175 23.825l5.926-1.554a11.95 11.95 0 005.93 1.564h.001c6.645 0 12.03-5.385 12.03-12.031S18.676 0 12.031 0zm5.474 16.355c-.3-.15-1.774-.876-2.048-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.412-1.488-.89-.79-1.49-1.767-1.665-2.067-.175-.3-.018-.462.132-.612.135-.135.3-.3.45-.45.15-.15.2-.262.3-.438.1-.175.05-.325-.025-.475-.075-.15-.675-1.625-.925-2.225-.243-.585-.49-.505-.675-.515-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.112 3.225 5.112 4.525.712.312 1.267.5 1.7.637.712.225 1.362.188 1.875.113.575-.088 1.774-.725 2.024-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/>
              </svg>
              {t('whatsapp')}
            </a>
          </div>

          {/* Right — Form */}
          <div className="bg-cream rounded-3xl p-10 border border-gold/10">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <p className="font-display text-2xl text-navy font-semibold">{t('success')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2 tracking-wide uppercase">{t('name')}</label>
                    <input name="name" type="text" required
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition text-sm"
                      placeholder="ישראל ישראלי" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2 tracking-wide uppercase">{t('phone')}</label>
                    <input name="phone" type="tel" required
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition text-sm"
                      placeholder="050-0000000" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2 tracking-wide uppercase">{t('service')}</label>
                  <select name="service"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition text-sm text-gray-700">
                    <option>{t('service_residential')}</option>
                    <option>{t('service_renovation')}</option>
                    <option>{t('service_office')}</option>
                    <option>{t('service_other')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2 tracking-wide uppercase">{t('notes')}</label>
                  <textarea name="notes" rows={3}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition resize-none text-sm" />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button type="submit" disabled={loading}
                  className="w-full btn-gold text-navy font-bold py-4 rounded-xl text-sm tracking-wide disabled:opacity-60">
                  {loading ? '⏳' : t('submit')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
