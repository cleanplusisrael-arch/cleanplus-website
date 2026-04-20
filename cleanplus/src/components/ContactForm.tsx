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
    <section id="contact" className="bg-navy py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-3">{t('title')}</h2>
          <p className="text-gold font-semibold text-lg">{t('subtitle')}</p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
          {submitted ? (
            <div className="text-center py-10">
              <div className="text-6xl mb-4">✅</div>
              <p className="text-navy font-black text-xl">{t('success')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">{t('name')}</label>
                  <input name="name" type="text" required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold focus:border-gold outline-none transition bg-gray-50 focus:bg-white text-sm"
                    placeholder="ישראל ישראלי" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">{t('phone')}</label>
                  <input name="phone" type="tel" required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold focus:border-gold outline-none transition bg-gray-50 focus:bg-white text-sm"
                    placeholder="050-0000000" />
                </div>
              </div>

              {/* Service */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">{t('service')}</label>
                <select name="service"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold focus:border-gold outline-none transition bg-gray-50 focus:bg-white text-sm text-gray-700">
                  <option>{t('service_residential')}</option>
                  <option>{t('service_renovation')}</option>
                  <option>{t('service_office')}</option>
                  <option>{t('service_other')}</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">{t('notes')}</label>
                <textarea name="notes" rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold focus:border-gold outline-none transition bg-gray-50 focus:bg-white resize-none text-sm"
                  placeholder="..." />
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-500 text-sm font-medium">{error}</p>
              )}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button type="submit" disabled={loading}
                  className="flex-1 bg-gold hover:bg-gold-hover text-navy font-black text-lg py-4 px-6 rounded-xl transition shadow-lg btn-gold-glow disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? '⏳' : t('submit')}
                </button>
                <a href="https://wa.me/972500000000?text=שלום, אני מעוניין בשירותי ניקיון"
                  target="_blank" rel="noopener"
                  className="flex-1 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-4 px-6 rounded-xl transition shadow-lg flex items-center justify-center gap-2 font-bold text-base">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.128.552 4.195 1.6 6.012L.175 23.825l5.926-1.554a11.95 11.95 0 005.93 1.564h.001c6.645 0 12.03-5.385 12.03-12.031S18.676 0 12.031 0zm5.474 16.355c-.3-.15-1.774-.876-2.048-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.412-1.488-.89-.79-1.49-1.767-1.665-2.067-.175-.3-.018-.462.132-.612.135-.135.3-.3.45-.45.15-.15.2-.262.3-.438.1-.175.05-.325-.025-.475-.075-.15-.675-1.625-.925-2.225-.243-.585-.49-.505-.675-.515-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.112 3.225 5.112 4.525.712.312 1.267.5 1.7.637.712.225 1.362.188 1.875.113.575-.088 1.774-.725 2.024-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/>
                  </svg>
                  {t('whatsapp')}
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
