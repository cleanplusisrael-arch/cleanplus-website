'use client';
import { useTranslations } from 'next-intl';

const SERVICES = [
  { key: 'residential', icon: '🏠', num: '01', popular: false },
  { key: 'renovation',  icon: '🏗️', num: '02', popular: true  },
  { key: 'office',      icon: '🏢', num: '03', popular: false },
];

export default function Services() {
  const t = useTranslations('services');

  return (
    <section id="services" className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="section-label">{t('title')}</div>
            <h2 className="font-display font-light text-navy"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.15 }}>
              {t('subtitle')}
            </h2>
          </div>
          <a href="#contact" className="btn-primary self-start md:self-auto text-sm shrink-0">
            קבל הצעת מחיר ←
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SERVICES.map(({ key, icon, num, popular }) => (
            <div key={key} className={`card relative overflow-hidden group ${popular ? 'bg-navy' : 'bg-white'}`}>
              {popular && (
                <>
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
                  <div className="absolute top-5 end-5 bg-gold text-navy text-xs font-bold px-3 py-1 rounded-full">
                    הנפוץ ביותר
                  </div>
                </>
              )}

              <div className="p-9">
                {/* Header row */}
                <div className="flex items-start justify-between mb-7">
                  <span className={`font-display text-5xl font-bold leading-none ${popular ? 'text-gold/15' : 'text-navy/6'}`}>
                    {num}
                  </span>
                  <span className="text-4xl transition-transform duration-300 group-hover:scale-110">
                    {icon}
                  </span>
                </div>

                <h3 className={`font-display text-xl font-semibold mb-3 ${popular ? 'text-white' : 'text-navy'}`}>
                  {t(`${key}.title`)}
                </h3>
                <p className={`text-sm leading-relaxed mb-8 font-light ${popular ? 'text-white/55' : 'text-slate-500'}`}>
                  {t(`${key}.desc`)}
                </p>

                {/* Checklist */}
                <ul className={`space-y-2 mb-8 text-xs ${popular ? 'text-white/50' : 'text-slate-500'}`}>
                  {['מחיר הוגן וברור', 'ציוד מקצועי כלול', 'אחריות מלאה'].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-gold">✓</span> {item}
                    </li>
                  ))}
                </ul>

                <a href="#contact"
                  className={`inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
                    popular ? 'text-gold' : 'text-navy hover:text-gold'
                  }`}>
                  {t('more')} <span>←</span>
                </a>
              </div>

              {!popular && (
                <div className="absolute bottom-0 inset-x-0 h-0.5 w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
