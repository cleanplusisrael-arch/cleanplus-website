'use client';
import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';

export default function ContactForm() {
  const t = useTranslations('contact');
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
      notes: (form.elements.namedItem('notes') as HTMLTextAreaElement).value,
      locale, type: 'client',
    };
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch { /* fail silently */ }
    finally { setLoading(false); }
  };

  return (
    <section id="contact" className="py-24 bg-[#faf8f3] relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)' }} />

      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-5 gap-16 items-start">

          {/* Form — 3/5 — comes first in DOM → rightmost in RTL grid */}
          <div className="lg:col-span-3 order-1">
            <div className="bg-white rounded-2xl border border-[#c9a84c]/12 shadow-[0_8px_48px_rgba(10,22,40,0.07)] overflow-hidden">
              <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#0a1628] text-base" style={{ fontFamily: "'Rubik', sans-serif" }}>{t('form_title')}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{t('form_badge')}</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <span className="text-green-600 text-xs font-medium">{t('online')}</span>
                </div>
              </div>

              <div className="p-8">
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-3xl mx-auto mb-5">✅</div>
                    <p className="font-bold text-[#0a1628] text-xl mb-2" style={{ fontFamily: "'Rubik', sans-serif" }}>{t('success_title')}</p>
                    <p className="text-slate-400 text-sm">{t('success_sub')}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-2">{t('name')}</label>
                        <input name="name" type="text" required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/15 outline-none transition-all text-sm text-[#0a1628] placeholder:text-slate-300"
                          placeholder={t('placeholder_name')} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-2">{t('phone')}</label>
                        <input name="phone" type="tel" required dir="ltr"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/15 outline-none transition-all text-sm text-[#0a1628] placeholder:text-slate-300 text-start"
                          placeholder="050-000-0000" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-2">{t('service')}</label>
                      <div className="relative">
                        <select name="service"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/15 outline-none transition-all text-sm text-[#0a1628] appearance-none">
                          <option>{t('service_residential')}</option>
                          <option>{t('service_renovation')}</option>
                          <option>{t('service_office')}</option>
                          <option>{t('service_other')}</option>
                        </select>
                        <div className="absolute inset-y-0 end-4 flex items-center pointer-events-none text-slate-400 text-xs">▾</div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-2">{t('notes')}</label>
                      <textarea name="notes" rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/15 outline-none transition-all resize-none text-sm text-[#0a1628] placeholder:text-slate-300"
                        placeholder={t('placeholder_size')} />
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input type="checkbox" required
                        className="mt-0.5 w-4 h-4 accent-[#c9a84c] shrink-0" />
                      <span className="text-xs text-slate-400 leading-relaxed">
                        {t('consent_pre')}{' '}
                        <a href="/privacy" className="text-[#c9a84c] hover:underline">{t('privacy_link')}</a>
                        {' '}{t('consent_mid')}{' '}
                        <a href="/terms" className="text-[#c9a84c] hover:underline">{t('terms_link')}</a>
                        {' '}{t('consent_post')}
                      </span>
                    </label>

                    <button type="submit" disabled={loading}
                      className="w-full btn-primary justify-center py-4 rounded-xl text-base disabled:opacity-60">
                      {loading ? `⏳ ${t('loading')}` : t('submit')}
                    </button>

                    <p className="text-center text-slate-400 text-xs pt-1">
                      {t('vat_note')}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Contact info — 2/5 */}
          <div className="lg:col-span-2 order-2">
            <div className="section-label">{t('title')}</div>
            <h2 className="text-[#0a1628] mb-5"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, fontFamily: "'Rubik', sans-serif", lineHeight: 1.2 }}>
              {t('heading')}
            </h2>
            <p className="text-slate-500 mb-10" style={{ fontWeight: 300 }}>{t('subtitle')}</p>

            <div className="space-y-5 mb-10">
              {[
                { icon: '📞', labelKey: 'phone_label', value: '050-000-0000', href: 'tel:+972500000000', ltr: true },
                { icon: '✉️', labelKey: 'email_label', value: 'info@cleanplus.co.il', href: 'mailto:info@cleanplus.co.il', ltr: true },
                { icon: '📍', labelKey: 'area_label', valueKey: 'area_value', ltr: false },
              ].map(({ icon, labelKey, value, valueKey, href, ltr }) => (
                <div key={labelKey} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white border border-[#c9a84c]/15 flex items-center justify-center text-lg shrink-0">
                    {icon}
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs mb-0.5">{t(labelKey)}</div>
                    {href
                      ? <a href={href} className={`text-[#0a1628] font-medium text-sm hover:text-[#c9a84c] transition-colors ${ltr ? 'phone-ltr' : ''}`}>{value}</a>
                      : <span className="text-[#0a1628] font-medium text-sm">{valueKey ? t(valueKey) : value}</span>
                    }
                  </div>
                </div>
              ))}
            </div>

            <a href="https://wa.me/972500000000?text=שלום, מעוניין בשירותי ניקיון"
              target="_blank" rel="noopener"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold px-7 py-3.5 rounded-full text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.128.552 4.195 1.6 6.012L.175 23.825l5.926-1.554a11.95 11.95 0 005.93 1.564h.001c6.645 0 12.03-5.385 12.03-12.031S18.676 0 12.031 0zm5.474 16.355c-.3-.15-1.774-.876-2.048-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.412-1.488-.89-.79-1.49-1.767-1.665-2.067-.175-.3-.018-.462.132-.612.135-.135.3-.3.45-.45.15-.15.2-.262.3-.438.1-.175.05-.325-.025-.475-.075-.15-.675-1.625-.925-2.225-.243-.585-.49-.505-.675-.515-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.112 3.225 5.112 4.525.712.312 1.267.5 1.7.637.712.225 1.362.188 1.875.113.575-.088 1.774-.725 2.024-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/></svg>
              {t('whatsapp')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
