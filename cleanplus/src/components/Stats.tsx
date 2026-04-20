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
    <section className="py-24 bg-navy relative overflow-hidden">
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10 rtl:divide-x-reverse">
          {items.map(({ val, label }) => (
            <div key={label} className="text-center py-8 px-6 group">
              <div className="font-display text-5xl md:text-6xl font-bold text-gold-gradient mb-3 transition-transform duration-300 group-hover:scale-105">
                {val}
              </div>
              <div className="text-white/40 text-xs tracking-wide uppercase font-medium">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
