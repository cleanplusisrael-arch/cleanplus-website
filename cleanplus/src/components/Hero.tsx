'use client';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #060f1e 0%, #0a1628 50%, #0d2444 100%)' }}>

      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gold glow */}
        <div className="absolute -top-40 -end-40 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 65%)' }} />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(201,168,76,1) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#faf8f3] to-transparent" />

        {/* Decorative geometric lines — desktop only */}
        <div className="hidden lg:block absolute end-0 top-0 bottom-0 w-1/2 opacity-10"
          style={{ background: 'linear-gradient(135deg, transparent 40%, rgba(201,168,76,0.05) 100%)' }} />
        <div className="hidden lg:block absolute end-24 top-16 w-px h-64"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent)' }} />
        <div className="hidden lg:block absolute end-48 top-32 w-px h-48"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.15), transparent)' }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Content ── */}
          <div className="text-start">

            {/* Eyebrow badge */}
            <div className="fade-up inline-flex items-center gap-3 mb-8">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-[#c9a84c]" />
                <span className="text-white/60 text-xs tracking-widest uppercase" style={{ letterSpacing: '0.15em' }}>
                  {t('badge')}
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="fade-up-1 text-white mb-7"
              style={{ fontSize: 'clamp(2.6rem, 5vw, 4.5rem)', lineHeight: 1.1, fontWeight: 700, fontFamily: "'Rubik', 'Heebo', sans-serif" }}>
              הבית שלכם —
              <br />
              <span className="gold-text">נקי, מבריק,</span>
              <br />
              מושלם.
            </h1>

            {/* Subtitle */}
            <p className="fade-up-2 text-white/50 text-lg leading-relaxed mb-10 max-w-md" style={{ fontWeight: 300 }}>
              {t('subtitle')}
            </p>

            {/* CTAs — NO חינם */}
            <div className="fade-up-3 flex flex-wrap gap-4 mb-12">
              <a href="#contact" className="btn-primary">
                קבלו הצעת מחיר ←
              </a>
              <a href="tel:+972500000000"
                className="flex items-center gap-2.5 border border-white/15 hover:border-[#c9a84c]/50 text-white/70 hover:text-white px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-300">
                📞 <span dir="ltr" className="phone-ltr">{t('cta_secondary')}</span>
              </a>
            </div>

            {/* Trust badges */}
            <div className="fade-up-4 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/8 pt-8">
              {[t('badge_insured'), t('badge_pro'), t('badge_available')].map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-white/40 text-sm">
                  <span className="text-[#c9a84c]">✓</span>
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Floating stats — desktop only ── */}
          <div className="hidden lg:flex flex-col gap-4 items-end">

            {/* Rating card */}
            <div className="w-full max-w-[280px] rounded-3xl p-7 border border-white/10 backdrop-blur-md"
              style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-white/30 text-xs uppercase mb-1" style={{ letterSpacing: '0.12em' }}>דירוג ממוצע</div>
                  <div className="text-5xl font-bold gold-text" style={{ fontFamily: "'Rubik', sans-serif" }}>4.9</div>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center text-2xl">⭐</div>
              </div>
              <div className="flex gap-1.5 mb-3">
                {[...Array(5)].map((_,i) => (
                  <div key={i} className="flex-1 h-1 rounded-full bg-[#c9a84c]/70" />
                ))}
              </div>
              <div className="text-white/25 text-xs">מבוסס על 200+ ביקורות</div>
            </div>

            {/* Stat row */}
            <div className="flex gap-3 w-full max-w-[280px]">
              <div className="flex-1 rounded-2xl p-5 text-center border border-white/8"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="text-3xl font-bold gold-text mb-1" style={{ fontFamily: "'Rubik', sans-serif" }}>+500</div>
                <div className="text-white/30 text-xs">לקוחות</div>
              </div>
              <div className="flex-1 rounded-2xl p-5 text-center border border-white/8"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="text-3xl font-bold gold-text mb-1 phone-ltr" style={{ fontFamily: "'Rubik', sans-serif" }}>7/7</div>
                <div className="text-white/30 text-xs">זמינות</div>
              </div>
            </div>

            {/* Live notification */}
            <div className="w-full max-w-[280px] rounded-2xl px-5 py-4 flex items-center gap-3 border border-white/8"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="relative flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-50" />
              </div>
              <div>
                <div className="text-white/60 text-xs font-medium">הזמנה חדשה · לפני 12 דקות</div>
                <div className="text-white/30 text-xs mt-0.5">ניקיון דירה — תל אביב</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
