'use client';
import { useTranslations } from 'next-intl';

const SERVICES = [
  { key: 'residential', icon: '🏠', num: '01' },
  { key: 'renovation',  icon: '🏗️', num: '02', featured: true },
  { key: 'office',      icon: '🏢', num: '03' },
];

export default function Services() {
  const t = useTranslations('services');

  return (
    <section id="services" className="py-32 bg-cream relative overflow-hidden">
      {/* Decorative number */}
      <div className="absolute top-16 end-8 font-display text-[200px] font-bold text-navy/[0.03] select-none leading-none pointer-events-none">
        01
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-gold" />
            <span className="text-gold text-xs tracking-ultra uppercase font-medium">Services</span>
          </div>
          <h2 className="font-display font-light text-navy leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            {t('title')}
          </h2>
          <p className="mt-4 text-gray-600 max-w-lg font-light text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map(({ key, icon, num, featured }) => (
            <div key={key}
              className={`card-luxury rounded-3xl p-10 relative overflow-hidden group cursor-pointer ${
                featured ? 'bg-navy text-white' : 'bg-white'
              }`}>

              {featured && (
                <div className="absolute top-0 start-0 end-0 h-0.5 bg-gold-gradient" />
              )}

              {/* Number */}
              <div className={`font-display text-6xl font-bold mb-6 leading-none ${
                featured ? 'text-gold/20' : 'text-navy/8'
              }`}>
                {num}
              </div>

              {/* Icon */}
              <div className={`text-4xl mb-6 transition-transform duration-300 group-hover:scale-110 inline-block`}>
                {icon}
              </div>

              {/* Content */}
              <h3 className={`font-display text-2xl font-semibold mb-4 ${
                featured ? 'text-white' : 'text-navy'
              }`}>
                {t(`${key}.title`)}
              </h3>
              <p className={`text-sm leading-relaxed mb-8 font-light ${
                featured ? 'text-white/60' : 'text-gray-500'
              }`}>
                {t(`${key}.desc`)}
              </p>

              {/* CTA */}
              <a href="#contact"
                className={`inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                  featured
                    ? 'text-gold hover:gap-4'
                    : 'text-navy hover:text-gold hover:gap-4'
                }`}>
                {t('more')}
                <span className="text-lg">←</span>
              </a>

              {/* Hover accent */}
              {!featured && (
                <div className="absolute bottom-0 start-0 w-0 h-0.5 bg-gold transition-all duration-500 group-hover:w-full" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
