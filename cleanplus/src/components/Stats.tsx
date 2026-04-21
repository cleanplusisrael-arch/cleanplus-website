'use client';
import { useTranslations } from 'next-intl';

export default function Stats() {
  const t = useTranslations('stats');

  const items = [
    { val: '+500',  label: t('clients_label'),    icon: '👥' },
    { val: '+3',    label: t('experience_label'),  icon: '🏆' },
    { val: '100%',  label: t('insured_label'),     icon: '🛡️' },
    { val: '7/7',   label: t('available_label'),   icon: '⚡' },
  ];

  return (
    <section className="py-0 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {items.map(({ val, label, icon }, i) => (
            <div key={label}
              className={`py-14 px-8 text-center border-white/5 ${
                i < 3 ? 'md:border-e rtl:md:border-e-0 rtl:md:border-s' : ''
              } ${i < 2 ? 'border-b md:border-b-0' : ''}`}>
              <div className="text-3xl mb-3">{icon}</div>
              <div className="font-display font-bold gold-text mb-2"
                style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
                {val}
              </div>
              <div className="text-white/35 text-xs uppercase tracking-widest font-medium">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
