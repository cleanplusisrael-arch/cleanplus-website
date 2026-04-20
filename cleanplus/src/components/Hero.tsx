'use client';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen bg-navy overflow-hidden flex items-center">

      {/* Layered background */}
      <div className="absolute inset-0">
        {/* Deep gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-mid to-[#0d2444]" />
        {/* Gold orb top right */}
        <div className="absolute -top-40 -end-40 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)' }} />
        {/* Blue orb bottom left */}
        <div className="absolute -bottom-60 -start-40 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(30,58,95,0.6) 0%, transparent 70%)' }} />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Content */}
          <div className="text-start">
            {/* Eyebrow */}
            <div className="animate-fade-up flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs font-medium tracking-ultra uppercase">
                {t('badge')}
              </span>
            </div>

            {/* Main headline — editorial style */}
            <h1 className="animate-fade-up-delay-1 font-display font-light text-white leading-[1.05] mb-8"
              style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}>
              הבית שלך<br />
              <span className="text-gold-gradient font-semibold italic">
                נקי, מבריק,
              </span><br />
              מושלם.
            </h1>

            {/* Subtitle */}
            <p className="animate-fade-up-delay-2 text-white/55 text-lg font-light leading-relaxed mb-12 max-w-md">
              {t('subtitle')}
            </p>

            {/* CTAs */}
            <div className="animate-fade-up-delay-3 flex flex-wrap gap-4 mb-16">
              <a href="#contact"
                className="btn-gold text-navy font-bold px-8 py-4 rounded-full text-sm tracking-wide">
                {t('cta_primary')}
              </a>
              <a href="tel:+972500000000"
                className="flex items-center gap-3 border border-white/15 hover:border-gold/40 text-white/80 hover:text-white px-8 py-4 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm">
                <span className="text-gold">📞</span>
                {t('cta_secondary')}
              </a>
            </div>

            {/* Trust badges */}
            <div className="animate-fade-up-delay-4 flex flex-wrap gap-6">
              {[t('badge_insured'), t('badge_pro'), t('badge_available')].map((badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span className="text-white/50 text-sm">{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Visual */}
          <div className="hidden lg:flex justify-center items-center relative">
            {/* Floating card 1 */}
            <div className="animate-float absolute -top-8 end-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 w-52">
              <div className="text-4xl font-display font-bold text-gold mb-1">+500</div>
              <div className="text-white/60 text-xs">לקוחות מרוצים</div>
              <div className="mt-3 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-gold text-xs">★</span>
                ))}
              </div>
            </div>

            {/* Center piece */}
            <div className="relative w-72 h-72 rounded-full border border-gold/20 flex items-center justify-center"
              style={{ animation: 'float 6s ease-in-out infinite' }}>
              <div className="absolute inset-4 rounded-full border border-gold/10 flex items-center justify-center">
                <div className="absolute inset-4 rounded-full bg-gold/5 flex items-center justify-center">
                  <span className="text-8xl">✨</span>
                </div>
              </div>
              {/* Orbiting dot */}
              <div className="absolute w-3 h-3 rounded-full bg-gold top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-gold animate-pulse-gold" />
            </div>

            {/* Floating card 2 */}
            <div className="absolute -bottom-4 start-4 bg-navy-mid/80 backdrop-blur-md border border-gold/20 rounded-2xl p-5 w-48">
              <div className="text-xs text-white/50 mb-2 uppercase tracking-wide">זמינות</div>
              <div className="text-2xl font-display font-semibold text-gold">7 / 7</div>
              <div className="text-white/40 text-xs mt-1">ימים בשבוע</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
    </section>
  );
}
