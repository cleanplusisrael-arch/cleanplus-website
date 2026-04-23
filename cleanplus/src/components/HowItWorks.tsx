'use client';
import { useTranslations } from 'next-intl';

const STEPS = [
  { num: '01', emoji: '📝', key: 'step1' },
  { num: '02', emoji: '📞', key: 'step2' },
  { num: '03', emoji: '✨', key: 'step3' },
];

export default function HowItWorks() {
  const t = useTranslations('how');

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <div className="section-label justify-center">{t('title')}</div>
          <h2 style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, fontFamily: "'Rubik', sans-serif" }}>
            {t('heading')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          <div className="hidden md:block absolute top-14 start-[18%] end-[18%] border-t-2 border-dashed border-[#c9a84c]/20 z-0" />
          {STEPS.map(({ num, emoji, key }) => (
            <div key={key} className="relative z-10 text-center group">
              <div className="relative inline-flex items-center justify-center w-28 h-28 mx-auto mb-7">
                <div className="absolute inset-0 rounded-full bg-[#faf8f3] border border-[#c9a84c]/15 group-hover:border-[#c9a84c]/40 group-hover:bg-[#c9a84c]/5 transition-all duration-300" />
                <span className="text-4xl relative z-10 group-hover:scale-110 transition-transform duration-300">{emoji}</span>
                <div className="absolute -top-1 -end-1 w-8 h-8 rounded-full bg-[#0a1628] border-2 border-white flex items-center justify-center">
                  <span className="text-[#c9a84c] text-xs font-bold">{num.replace('0', '')}</span>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-[#c9a84c]/10 border border-[#c9a84c]/20 text-[#c9a84c] text-xs font-semibold px-3 py-1 rounded-full mb-4">
                ⏱ {t(`${key}_time`)}
              </div>
              <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.1rem', fontFamily: "'Rubik', sans-serif", marginBottom: '0.5rem' }}>
                {t(`${key}_title`)}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '220px', margin: '0 auto' }}>
                {t(`${key}_desc`)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a href="#contact" className="btn-primary inline-flex text-sm">
            {t('cta')}
          </a>
          <p style={{ color: 'var(--text-subtle)', fontSize: '0.8rem', marginTop: '0.75rem' }}>
            {t('note')}
          </p>
        </div>
      </div>
    </section>
  );
}
