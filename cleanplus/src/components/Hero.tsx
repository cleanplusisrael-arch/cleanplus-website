'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center bg-navy overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060f1e] via-navy to-[#0d2444]" />
        {/* RTL skill: use end/start not right/left */}
        <div className="absolute -top-32 -end-32 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.8) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#faf8f3] to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-20">
        <div className="grid lg:grid-cols-5 gap-12 items-center">

          {/* Content */}
          <div className="lg:col-span-3">

            {/* Social proof */}
            <div className="fade-up flex items-center gap-3 mb-8">
              <div className="flex" style={{ direction: 'ltr' }}>
                {['ר','מ','ד','י'].map((l,i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-navy-mid border-2 border-gold/30 flex items-center justify-center text-gold text-xs font-bold -ms-1 first:ms-0">
                    {l}
                  </div>
                ))}
              </div>
              <div className="text-white/50 text-sm">
                <span className="text-gold font-semibold">+500</span> לקוחות מרוצים
                <span className="mx-2 text-white/20">·</span>
                {/* RTL skill: star ratings stay LTR */}
                <span className="phone-ltr text-gold">★★★★★</span>
              </div>
            </div>

            {/* Headline — content writer skill: benefit-focused, concise */}
            <h1 className="fade-up-1 font-display text-white mb-6"
              style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)', lineHeight: 1.08, fontWeight: 400 }}>
              הבית שלכם —<br />
              <em className="gold-text not-italic font-semibold">נקי, מבריק,</em><br />
              מושלם.
            </h1>

            <p className="fade-up-2 text-white/50 text-lg font-light leading-relaxed mb-10 max-w-lg">
              {t('subtitle')}
            </p>

            {/* Guarantee — content writer skill: lead with benefit */}
            <div className="fade-up-2 guarantee-badge mb-10 text-sm">
              <span className="text-gold text-lg">🛡️</span>
              <span className="text-white/70">
                <span className="text-gold font-bold">ערבות 100%</span> — לא מרוצים? נחזור חינם
              </span>
            </div>

            {/* CTAs */}
            <div className="fade-up-3 flex flex-wrap gap-4 mb-12">
              <a href="#contact" className="btn-primary text-sm">
                {t('cta_primary')} ←
              </a>
              {/* RTL skill: phone number must stay LTR */}
              <a href="tel:+972500000000" className="btn-outline text-sm">
                📞 <span className="phone-ltr">{t('cta_secondary')}</span>
              </a>
            </div>

            {/* Trust badges */}
            <div className="fade-up-4 flex flex-wrap gap-x-8 gap-y-3">
              {[t('badge_insured'), t('badge_pro'), t('badge_available')].map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-white/45 text-sm">
                  <span className="text-gold font-bold">✓</span>
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Floating UI — RTL skill: use end/start */}
          <div className="hidden lg:flex lg:col-span-2 flex-col gap-4 items-end">

            {/* Rating card */}
            <div className="anim-float w-full max-w-xs bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-7">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-white/40 text-xs uppercase mb-1">ממוצע דירוג</div>
                  <div className="font-display text-5xl font-bold gold-text">4.9</div>
                </div>
                <div className="phone-ltr text-4xl">⭐</div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_,i) => (
                  <div key={i} className="flex-1 h-1.5 bg-gold/80 rounded-full" />
                ))}
              </div>
              <div className="text-white/30 text-xs">מבוסס על 200+ ביקורות</div>
            </div>

            {/* Stat cards — RTL skill: logical properties */}
            <div className="flex gap-3 w-full max-w-xs">
              <div className="flex-1 bg-navy-mid/80 backdrop-blur-md border border-gold/15 rounded-2xl p-5 text-center">
                <div className="font-display text-3xl font-bold gold-text mb-1">+500</div>
                <div className="text-white/35 text-xs">לקוחות</div>
              </div>
              <div className="flex-1 bg-navy-mid/80 backdrop-blur-md border border-gold/15 rounded-2xl p-5 text-center">
                <div className="font-display text-3xl font-bold gold-text mb-1">
                  {/* RTL skill: numbers stay LTR */}
                  <span className="phone-ltr">7/7</span>
                </div>
                <div className="text-white/35 text-xs">זמינות</div>
              </div>
            </div>

            {/* Live notification */}
            <div className="w-full max-w-xs bg-white/8 backdrop-blur-md border border-white/8 rounded-2xl px-5 py-4 flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-60" />
              </div>
              <div>
                <div className="text-white/70 text-xs font-medium">הזמנה חדשה · לפני 4 דקות</div>
                <div className="text-white/35 text-xs">ניקיון דירה — תל אביב</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
