'use client';
import { useTranslations } from 'next-intl';

export default function Areas() {
  const t = useTranslations('areas');
  const areas = t.raw('list') as string[];

  return (
    <section id="areas" className="py-24 bg-[#0a1628]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label">{t('title')}</div>
            <h2 style={{ color: 'white', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, fontFamily: "'Rubik', sans-serif", marginBottom: '1rem' }}>
              {t('subtitle')}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.7 }}>
              {t('subtitle')}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {areas.map((area: string, i: number) => (
              <div key={area}
                className={`flex items-center gap-2 px-5 py-3 rounded-full border transition-all duration-300 text-sm font-medium ${
                  i === 0
                    ? 'border-[#c9a84c]/50 text-[#c9a84c]'
                    : 'border-white/10 text-white/55 hover:border-[#c9a84c]/30 hover:text-white/80'
                }`}
                style={{ background: i === 0 ? 'rgba(201,168,76,0.08)' : 'rgba(255,255,255,0.03)' }}>
                <span className="text-xs">📍</span>
                {area}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
