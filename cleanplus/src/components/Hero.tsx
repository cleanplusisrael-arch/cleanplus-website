'use client';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="bg-navy pt-32 pb-24 lg:pt-48 lg:pb-36 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gold opacity-[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-500 opacity-[0.04] blur-[100px] pointer-events-none" />
      {/* Dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gold text-sm font-semibold backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          {t('badge')}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
          {t('title').split('—')[0]}
          {t('title').includes('—') && (
            <>
              —<br className="hidden md:block" />
              <span className="text-gradient-gold">{t('title').split('—')[1]}</span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          {t('subtitle')}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="#contact"
            className="bg-gold hover:bg-gold-hover text-navy px-8 py-4 rounded-full font-black text-lg transition btn-gold-glow"
          >
            {t('cta_primary')}
          </a>
          <a
            href="tel:+972500000000"
            className="border-2 border-white/20 hover:border-gold text-white hover:text-gold px-8 py-4 rounded-full font-bold text-lg transition flex items-center justify-center gap-2"
          >
            <span>📞</span> {t('cta_secondary')}
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4">
          {[t('badge_insured'), t('badge_pro'), t('badge_available')].map((badge) => (
            <span key={badge}
              className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full text-gray-300 text-sm font-medium">
              <span className="text-gold font-bold">✓</span> {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
