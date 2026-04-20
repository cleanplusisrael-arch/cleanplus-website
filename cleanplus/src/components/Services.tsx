'use client';
import { useTranslations } from 'next-intl';

const SERVICES = [
  { key: 'residential', icon: '🏠', badge: null },
  { key: 'renovation', icon: '🏗️', badge: 'הנמכר ביותר' },
  { key: 'office', icon: '🏢', badge: null },
];

export default function Services() {
  const t = useTranslations('services');

  return (
    <section id="services" className="py-24 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-navy mb-4">{t('title')}</h2>
          <div className="w-20 h-1 bg-gold mx-auto rounded-full mb-6" />
          <p className="text-gray-600 max-w-xl mx-auto text-lg">{t('subtitle')}</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map(({ key, icon, badge }) => (
            <div key={key}
              className="bg-white rounded-3xl p-8 shadow-md card-hover border border-gray-100 relative overflow-hidden group">
              {badge && (
                <div className="absolute top-0 start-0 bg-gold text-navy text-xs font-black px-3 py-1 rounded-ee-xl">
                  {badge}
                </div>
              )}
              {/* Icon */}
              <div className="w-16 h-16 bg-light-gray rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-navy transition duration-300">
                <span className="group-hover:grayscale-0">{icon}</span>
              </div>
              <h3 className="text-xl font-black text-navy mb-3">
                {t(`${key}.title`)}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                {t(`${key}.desc`)}
              </p>
              <a href="#contact"
                className="text-gold font-bold flex items-center gap-2 hover:gap-4 transition-all text-sm group/link">
                {t('more')}
                <span className="text-lg">←</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
