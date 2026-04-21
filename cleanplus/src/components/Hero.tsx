'use client';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #060f1e 0%, #0a1628 55%, #0d2444 100%)' }}>

      {/* ── Layered visual background ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gold atmospheric glow */}
        <div className="absolute -top-20 -end-20 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 70%)' }} />
        <div className="absolute bottom-40 -start-40 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(30,58,95,0.5) 0%, transparent 70%)' }} />

        {/* Subtle dot pattern */}
        <div className="absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.45) 1px, transparent 1px)', backgroundSize: '44px 44px', opacity: 0.04 }} />

        {/* Premium diagonal accent */}
        <div className="hidden lg:block absolute inset-0"
          style={{ background: 'linear-gradient(105deg, transparent 55%, rgba(201,168,76,0.03) 100%)' }} />

        {/* Visual "image" panel on desktop — professional abstraction */}
        <div className="hidden lg:block absolute end-0 top-0 bottom-0 w-[45%]"
          style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.04) 0%, rgba(30,58,95,0.3) 100%)' }}>
          {/* Geometric frame suggesting a clean room */}
          <div className="absolute inset-12 border border-[#c9a84c]/10 rounded-3xl" />
          <div className="absolute inset-16 border border-[#c9a84c]/06 rounded-2xl" />
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-6 opacity-20">✨</div>
              <div className="text-[#c9a84c]/20 text-xs tracking-widest uppercase">תמונה תגיע בקרוב</div>
            </div>
          </div>
          {/* Corner accents */}
          <div className="absolute top-8 start-8 w-8 h-8 border-t border-s border-[#c9a84c]/20 rounded-tl-lg" />
          <div className="absolute bottom-8 end-8 w-8 h-8 border-b border-e border-[#c9a84c]/20 rounded-br-lg" />
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-28"
          style={{ background: 'linear-gradient(to top, #faf8f3, transparent)' }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-20">
        <div className="lg:w-[52%]">

          {/* Eyebrow */}
          <div className="fade-up inline-flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 border border-white/12 rounded-full px-4 py-2"
              style={{ background: 'rgba(255,255,255,0.04)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
              <span className="text-white/50 text-xs" style={{ letterSpacing: '0.14em' }}>
                {t('badge')}
              </span>
            </div>
          </div>

          {/* Headline — covers ALL services, not just residential */}
          <h1 className="fade-up-1 text-white mb-6"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              lineHeight: 1.1,
              fontWeight: 800,
              fontFamily: "'Rubik', 'Heebo', sans-serif"
            }}>
            ניקיון מקצועי —
            <br />
            <span className="gold-text">לבתים, משרדים</span>
            <br />
            ועסקים.
          </h1>

          {/* Subtitle */}
          <p className="fade-up-2 mb-10 max-w-md"
            style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', lineHeight: 1.7, fontWeight: 300 }}>
            {t('subtitle')}
          </p>

          {/* Services pills */}
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

          {/* Trust badges — service focused */}
          <div className="fade-up-4 flex flex-wrap gap-x-8 gap-y-3 pt-8 border-t border-white/8">
            {[
              { icon: '👷', text: 'צוות מנוסה ומוסמך' },
              { icon: '🧴', text: 'ציוד מקצועי כלול' },
              { icon: '📅', text: 'זמינות 7 ימים' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>
                <span>{icon}</span>
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop right — floating stats */}
        <div className="hidden lg:flex flex-col gap-4 items-end absolute end-12 top-1/2 -translate-y-1/2 w-72">

          <div className="w-full rounded-2xl p-6 border border-white/8"
            style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' }}>
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
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="text-2xl font-bold gold-text mb-1 phone-ltr" style={{ fontFamily: "'Rubik', sans-serif" }}>{val}</div>
                <div className="text-white/30 text-xs">{label}</div>
              </div>
            ))}
          </div>

          <div className="w-full rounded-xl px-5 py-4 flex items-center gap-3 border border-white/8"
            style={{ background: 'rgba(255,255,255,0.03)' }}>
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
