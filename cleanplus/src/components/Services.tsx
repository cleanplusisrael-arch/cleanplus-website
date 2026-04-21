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
    <section id="services" className="py-24 bg-[#faf8f3]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="section-label">{t('title')}</div>
            <h2 className="text-[#0a1628]"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', lineHeight: 1.15, fontWeight: 700, fontFamily: "'Rubik', sans-serif" }}>
              {t('subtitle')}
            </h2>
          </div>
          <a href="#contact" className="btn-primary self-start md:self-auto shrink-0">
            קבלו הצעת מחיר ←
          </a>
        </div>

        {/* Cards — equal height, no empty space */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SERVICES.map(({ key, icon, num, featured }) => (
            <div key={key}
              className={`relative overflow-hidden rounded-2xl flex flex-col group cursor-pointer transition-all duration-350 ${
                featured
                  ? 'bg-[#0a1628]'
                  : 'bg-white border border-[#c9a84c]/12 hover:border-[#c9a84c]/35 hover:shadow-[0_20px_60px_rgba(10,22,40,0.1)] hover:-translate-y-1'
              }`}>

              {featured && (
                <>
                  <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)' }} />
                  <div className="absolute top-4 start-4 bg-[#c9a84c] text-[#0a1628] text-xs font-bold px-3 py-1 rounded-full">
                    הנפוץ ביותר
                  </div>
                </>
              )}

              <div className="p-8 flex flex-col flex-1">
                {/* Number + Icon */}
                <div className="flex items-start justify-between mb-6">
                  <span className={`font-bold leading-none select-none`}
                    style={{ fontSize: '3.5rem', fontFamily: "'Rubik', sans-serif", color: featured ? 'rgba(201,168,76,0.12)' : 'rgba(10,22,40,0.06)' }}>
                    {num}
                  </span>
                  <span className="text-3xl transition-transform duration-300 group-hover:scale-110">{icon}</span>
                </div>

                {/* Content */}
                <h3 className={`text-xl font-bold mb-3 ${featured ? 'text-white' : 'text-[#0a1628]'}`}
                  style={{ fontFamily: "'Rubik', sans-serif" }}>
                  {t(`${key}.title`)}
                </h3>
                <p className={`text-sm leading-relaxed mb-7 flex-1 ${featured ? 'text-white/55' : 'text-slate-500'}`}
                  style={{ fontWeight: 300 }}>
                  {t(`${key}.desc`)}
                </p>

                {/* Features list */}
                <ul className={`space-y-2 mb-7 text-xs ${featured ? 'text-white/45' : 'text-slate-400'}`}>
                  {['מחיר ברור ללא הפתעות', 'ציוד מקצועי כלול', 'תיאום גמיש'].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-[#c9a84c]">✓</span> {item}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a href="#contact"
                  className={`inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
                    featured ? 'text-[#c9a84c]' : 'text-[#0a1628] group-hover:text-[#c9a84c]'
                  }`}>
                  {t('more')} ←
                </a>
              </div>

              {!featured && (
                <div className="absolute bottom-0 inset-x-0 h-px w-0 bg-[#c9a84c] transition-all duration-500 group-hover:w-full" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
