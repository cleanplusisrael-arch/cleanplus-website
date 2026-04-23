'use client';
import { useTranslations } from 'next-intl';

export default function WhyUs() {
  const t = useTranslations('whyus');

  const FEATURES = [
    { icon: '👷', titleKey: 'f1_title', descKey: 'f1_desc' },
    { icon: '🧴', titleKey: 'f2_title', descKey: 'f2_desc' },
    { icon: '📅', titleKey: 'f3_title', descKey: 'f3_desc' },
    { icon: '💰', titleKey: 'f4_title', descKey: 'f4_desc' },
    { icon: '🔄', titleKey: 'f5_title', descKey: 'f5_desc' },
    { icon: '📍', titleKey: 'f6_title', descKey: 'f6_desc' },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="text-center mb-16">
          <div className="section-label justify-center">{t('label')}</div>
          <h2 className="text-[#0a1628]"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 700, fontFamily: "'Rubik', sans-serif" }}>
            {t('heading')}
          </h2>
          <p className="text-slate-500 text-lg mt-4 max-w-xl mx-auto" style={{ fontWeight: 300 }}>
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon, titleKey, descKey }) => (
            <div key={titleKey}
              className="bg-[#faf8f3] rounded-2xl p-7 border border-[#c9a84c]/10 group hover:border-[#c9a84c]/30 hover:bg-white transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#c9a84c]/15 flex items-center justify-center text-2xl mb-5 group-hover:border-[#c9a84c]/40 transition-colors duration-300">
                {icon}
              </div>
              <h3 className="font-bold text-[#0a1628] mb-2 text-base" style={{ fontFamily: "'Rubik', sans-serif" }}>
                {t(titleKey)}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                {t(descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
