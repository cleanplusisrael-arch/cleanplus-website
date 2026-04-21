'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

// Hero expects /public/hero.jpg (1920x1080 or 1400x900)
// If not present, falls back to CSS gradient

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #060f1e 0%, #0a1628 55%, #0d2444 100%)' }}>

      {/* Hero image — swap CSS bg with real photo when ready */}
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="ניקיון מקצועי"
          fill
          priority
          className="object-cover object-center"
          style={{ opacity: 0.18 }}
          onError={() => {}} // silently fail, CSS gradient shows
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(6,15,30,0.97) 0%, rgba(10,22,40,0.88) 55%, rgba(13,36,68,0.82) 100%)' }} />
      </div>

      {/* Atmospheric layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -end-20 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.8) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        <div className="absolute bottom-0 inset-x-0 h-28"
          style={{ background: 'linear-gradient(to top, #faf8f3, transparent)' }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-20">
        <div className="lg:w-[55%]">

          {/* Eyebrow */}
          <div className="fade-up inline-flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 border border-white/12 rounded-full px-4 py-2"
              style={{ background: 'rgba(255,255,255,0.04)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
              <span className="text-white/55 text-xs" style={{ letterSpacing: '0.12em' }}>
                {t('badge')}
              </span>
            </div>
          </div>

          {/* Headline — Hebrew punctuation: no dash at start of line
              Correct: "ניקיון מקצועי" then new line with content
              The dash goes at END of clause, never beginning of line in Hebrew */}
          <h1 className="fade-up-1 text-white mb-6"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              lineHeight: 1.15,
              fontWeight: 800,
              fontFamily: "'Rubik', 'Heebo', sans-serif"
            }}>
            ניקיון מקצועי
            <br />
            <span className="gold-text">לבתים, משרדים</span>
            <br />
            ועסקים.
          </h1>

          {/* Subtitle — no dash at sentence start */}
          <p className="fade-up-2 mb-10 max-w-lg"
            style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.05rem', lineHeight: 1.75, fontWeight: 300 }}>
            {t('subtitle')}
          </p>

          {/* Service pills */}
          <div className="fade-up-2 flex flex-wrap gap-2 mb-10">
            {['ניקיון דירות', 'ניקיון משרדים', 'ניקיון אחרי שיפוץ', 'ניקיון עסקים'].map(s => (
              <span key={s}
                className="text-xs border border-white/10 text-white/50 px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.04)' }}>
                {s}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="fade-up-3 flex flex-wrap gap-4 mb-12">
            <a href="#contact" className="btn-primary">
              קבלו הצעת מחיר ←
            </a>
            <a href="tel:+972500000000"
              className="flex items-center gap-2.5 text-white/65 hover:text-white border border-white/15 hover:border-[#c9a84c]/40 px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-300">
              📞 <span className="phone-ltr">{t('cta_secondary')}</span>
            </a>
          </div>

          {/* Trust — service focused */}
          <div className="fade-up-4 flex flex-wrap gap-x-8 gap-y-3 pt-8 border-t border-white/8">
            {[
              { icon: '👷', text: 'צוות מנוסה ומוסמך' },
              { icon: '🧴', text: 'ציוד מקצועי כלול' },
              { icon: '📅', text: 'זמינות 7 ימים' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2"
                style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>
                <span>{icon}</span>{text}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop floating stats */}
        <div className="hidden lg:flex flex-col gap-4 items-end absolute end-12 top-1/2 -translate-y-1/2 w-72">
          <div className="w-full rounded-2xl p-6 border border-white/8"
            style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(16px)' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-white/30 text-xs mb-1" style={{ letterSpacing: '0.1em' }}>דירוג ממוצע</div>
                <div className="text-5xl font-bold gold-text" style={{ fontFamily: "'Rubik', sans-serif" }}>4.9</div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center text-2xl">⭐</div>
            </div>
            <div className="flex gap-1.5 mb-3">
              {[...Array(5)].map((_,i) => (
                <div key={i} className="flex-1 h-1 rounded-full bg-[#c9a84c]/60" />
              ))}
            </div>
            <div className="text-white/25 text-xs">מבוסס על 200+ ביקורות</div>
          </div>

          <div className="flex gap-3 w-full">
            {[{ val: '+500', label: 'לקוחות' }, { val: '7/7', label: 'זמינות' }].map(({ val, label }) => (
              <div key={label} className="flex-1 rounded-xl p-5 text-center border border-white/8"
                style={{ background: 'rgba(255,255,255,0.04)' }}>
                <div className="text-2xl font-bold gold-text mb-1 phone-ltr"
                  style={{ fontFamily: "'Rubik', sans-serif" }}>{val}</div>
                <div className="text-white/30 text-xs">{label}</div>
              </div>
            ))}
          </div>

          <div className="w-full rounded-xl px-5 py-4 flex items-center gap-3 border border-white/8"
            style={{ background: 'rgba(255,255,255,0.04)' }}>
            <div className="relative shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-50" />
            </div>
            <div>
              <div className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>הזמנה חדשה · לפני 8 דקות</div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>ניקיון משרד — הרצליה</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
