'use client';
import { useTranslations } from 'next-intl';

export default function Areas() {
  const t = useTranslations('areas');
  const areas = t.raw('list') as string[];

  return (
    <section id="areas" className="py-24 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(201,168,76,0.05)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">{t('title')}</h2>
          <div className="w-20 h-1 bg-gold mx-auto rounded-full mb-6" />
          <p className="text-gray-400 text-lg">{t('subtitle')}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {areas.map((area: string) => (
            <div key={area}
              className="flex items-center gap-2 bg-white/5 border border-white/10 hover:border-gold/50 hover:bg-white/10 px-5 py-3 rounded-full transition group cursor-default">
              <span className="text-gold text-sm">📍</span>
              <span className="text-white font-medium text-sm">{area}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
