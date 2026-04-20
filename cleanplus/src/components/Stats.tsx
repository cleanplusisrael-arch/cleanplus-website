'use client';
import { useTranslations } from 'next-intl';

export default function Stats() {
  const t = useTranslations('stats');
  const items = [
    { val: t('clients'), label: t('clients_label') },
    { val: t('experience'), label: t('experience_label') },
    { val: t('insured'), label: t('insured_label') },
    { val: t('available'), label: t('available_label') },
  ];

  return (
    <section className="bg-gold py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {items.map(({ val, label }) => (
            <div key={label} className="group">
              <div className="text-4xl md:text-6xl font-black text-navy mb-2">{val}</div>
              <div className="text-navy/70 font-semibold text-sm md:text-base">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
