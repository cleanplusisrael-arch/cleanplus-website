'use client';
import { useTranslations } from 'next-intl';

export default function Areas() {
  const t = useTranslations('areas');
  const areas = t.raw('list') as string[];

  return (
    <section id="areas" className="py-32 bg-navy relative overflow-hidden">
      <div className="absolute inset-0"
        style={{ backgroundImage: 'radial-gradient(ellipse at top right, rgba(201,168,76,0.08) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs tracking-ultra uppercase font-medium">Coverage</span>
            </div>
            <h2 className="font-display font-light text-white mb-6"
              style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
              {t('title')}
            </h2>
            <p className="text-white/45 font-light text-lg leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          {/* Right — areas grid */}
          <div className="flex flex-wrap gap-3">
            {areas.map((area: string, i: number) => (
              <div key={area}
                className={`flex items-center gap-2 px-5 py-3 rounded-full border transition-all duration-300 cursor-default ${
                  i === 0
                    ? 'border-gold/50 bg-gold/10 text-gold'
                    : 'border-white/10 bg-white/5 text-white/60 hover:border-gold/30 hover:text-white/80'
                }`}>
                <span className="text-xs">📍</span>
                <span className="text-sm font-medium">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
