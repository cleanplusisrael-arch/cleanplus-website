'use client';
import { useTranslations } from 'next-intl';

export default function Stats() {
  const t = useTranslations('stats');

  const STATS = [
    { val: t('clients'),    label: t('clients_label'),    icon: '👥' },
    { val: t('experience'), label: t('experience_label'), icon: '🏆' },
    { val: t('insured'),    label: t('insured_label'),    icon: '🛡️' },
    { val: t('available'),  label: t('available_label'),  icon: '⚡' },
  ];

  return (
    <section className="bg-[#0a1628]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5 rtl:divide-x-reverse">
          {STATS.map(({ val, label, icon }, i) => (
            <div key={label} className={`py-12 px-8 text-center ${i < 2 ? 'border-b md:border-b-0 border-white/5' : ''}`}>
              <div className="text-2xl mb-3">{icon}</div>
              <div className="text-4xl md:text-5xl font-bold gold-text mb-2 phone-ltr"
                style={{ fontFamily: "'Rubik', sans-serif" }}>{val}</div>
              <div className="text-white/40 text-xs">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
