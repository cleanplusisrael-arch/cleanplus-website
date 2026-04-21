'use client';
import { useTranslations } from 'next-intl';

const TESTIMONIALS = [
  { key: 't1', source: 'Google' },
  { key: 't2', source: 'Google' },
  { key: 't3', source: 'WhatsApp' },
];

export default function Testimonials() {
  const t = useTranslations('testimonials');

  return (
    <section id="testimonials" className="py-28 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="section-label">{t('title')}</div>
            <h2 className="font-display font-light text-navy"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              מה הלקוחות אומרים עלינו
            </h2>
          </div>
          {/* Overall rating */}
          <div className="flex items-center gap-4 bg-white border border-gold/15 rounded-2xl px-6 py-4 self-start">
            <div className="font-display text-3xl font-bold gold-text">4.9</div>
            <div>
              <div className="flex gap-0.5 text-gold text-sm">⭐⭐⭐⭐⭐</div>
              <div className="text-slate-400 text-xs mt-0.5">200+ ביקורות</div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map(({ key, source }, i) => (
            <div key={key}
              className={`card bg-white p-8 ${i === 1 ? 'md:-mt-4' : ''}`}>

              {/* Source + stars */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex gap-0.5 text-gold text-sm">⭐⭐⭐⭐⭐</div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                  source === 'Google'
                    ? 'bg-blue-50 text-blue-600'
                    : 'bg-green-50 text-green-600'
                }`}>
                  {source}
                </span>
              </div>

              {/* Quote */}
              <p className="text-slate-600 text-sm leading-relaxed mb-8 font-light italic">
                &ldquo;{t(`${key}_text`)}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-gold font-display font-bold text-sm">
                  {t(`${key}_name`).charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-navy text-sm">{t(`${key}_name`)}</div>
                  <div className="text-slate-400 text-xs">{t(`${key}_city`)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
