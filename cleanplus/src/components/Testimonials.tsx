'use client';
import { useTranslations } from 'next-intl';

const ITEMS = [
  { key: 't1', source: 'Google' },
  { key: 't2', source: 'Google' },
  { key: 't3', source: 'WhatsApp' },
];

export default function Testimonials() {
  const t = useTranslations('testimonials');
  return (
    <section id="testimonials" className="py-24 bg-[#faf8f3]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="section-label">{t('title')}</div>
            <h2 style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, fontFamily: "'Rubik', sans-serif" }}>
              מה הלקוחות אומרים
            </h2>
          </div>
          <div className="flex items-center gap-4 bg-white border border-[#c9a84c]/15 rounded-2xl px-5 py-4 self-start shadow-sm">
            <div className="text-3xl font-bold gold-text" style={{ fontFamily: "'Rubik', sans-serif" }}>4.9</div>
            <div>
              <div className="text-[#c9a84c] text-sm phone-ltr">★★★★★</div>
              <div style={{ color: 'var(--text-subtle)', fontSize: '0.75rem', marginTop: '2px' }}>200+ ביקורות</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ITEMS.map(({ key, source }, i) => (
            <div key={key} className={`card bg-white p-8 ${i === 1 ? 'md:-mt-3' : ''}`}>
              <div className="flex items-center justify-between mb-5">
                <div className="text-[#c9a84c] text-sm phone-ltr">★★★★★</div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                  source === 'Google' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                }`}>{source}</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                &ldquo;{t(`${key}_text`)}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#0a1628] flex items-center justify-center font-bold text-sm" style={{ color: '#c9a84c' }}>
                  {t(`${key}_name`).charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{t(`${key}_name`)}</div>
                  <div style={{ color: 'var(--text-subtle)', fontSize: '0.8rem' }}>{t(`${key}_city`)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
