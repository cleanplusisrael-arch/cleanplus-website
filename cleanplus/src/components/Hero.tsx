'use client';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #060f1e 0%, #0a1628 55%, #0d2444 100%)' }}>

      {/* Hero photo with dark overlay for text readability */}
      <div className="absolute inset-0">
        <img
          src="/hero.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.22 }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        {/* Gradient overlay — heavier on the text side (start), lighter on the card side (end) */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to end, rgba(6,15,30,0.96) 0%, rgba(10,22,40,0.88) 50%, rgba(13,36,68,0.75) 100%)' }} />
      </div>
      <div className="absolute inset-0 pointer-events-none">
        {/* Gold radial glow top-end */}
        <div className="absolute -top-20 -end-20 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 65%)' }} />
        {/* Dot grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.9) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        {/* Bottom fade to cream */}
        <div className="absolute bottom-0 inset-x-0 h-32"
          style={{ background: 'linear-gradient(to top, #faf8f3, transparent)' }} />
        {/* Subtle left glow */}
        <div className="absolute top-1/2 -start-40 w-80 h-80 rounded-full -translate-y-1/2"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-20">
        <div className="lg:w-[55%]">

          {/* Eyebrow badge */}
          <div className="fade-up inline-flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 border border-white/12 rounded-full px-4 py-2"
              style={{ background: 'rgba(255,255,255,0.04)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
              <span className="text-white/55 text-xs" style={{ letterSpacing: '0.12em' }}>
                {t('badge')}
              </span>
            </div>
          </div>

          {/* Headline — each line is a block span to give its own RTL bidi context,
               preventing the period from drifting to the wrong edge */}
          <h1 className="fade-up-1 text-white mb-6"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              lineHeight: 1.15,
              fontWeight: 800,
              fontFamily: "'Rubik', 'Heebo', sans-serif"
            }}>
            <span className="block">ניקיון מקצועי</span>
            <span className="block gold-text">לבתים, משרדים</span>
            <span className="block">ועסקים.</span>
          </h1>

          {/* Subtitle */}
          <p className="fade-up-2 mb-10 max-w-lg"
            style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.05rem', lineHeight: 1.8, fontWeight: 300 }}>
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
              קבלו הצעת מחיר
            </a>
            <a href="tel:+972500000000"
              className="flex items-center gap-2.5 text-white/70 hover:text-white border border-white/15 hover:border-[#c9a84c]/40 px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-300">
              📞 <span className="phone-ltr">{t('cta_secondary')}</span>
            </a>
          </div>

          {/* Trust row */}
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

        {/* ── Desktop right panel ── */}
        <div className="hidden lg:flex flex-col gap-4 absolute end-12 top-1/2 -translate-y-1/2 w-[300px]">

          {/* Service showcase card */}
          <div className="rounded-2xl overflow-hidden border border-white/10"
            style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)' }}>

            {/* Visual top area — cleaning illustration */}
            <div className="relative p-5 pb-4">
              <div className="w-full h-44 rounded-xl flex items-center justify-center overflow-hidden relative"
                style={{ background: 'linear-gradient(135deg, #0d2444 0%, #1a3a6b 100%)' }}>
                {/* Subtle dot pattern inside card */}
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.9) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
                {/* Gold circle glow */}
                <div className="absolute top-6 end-6 w-24 h-24 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)' }} />

                {/* Central illustration */}
                <div className="relative z-10 text-center">
                  {/* House with sparkles */}
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="mx-auto mb-2">
                    {/* House body */}
                    <rect x="15" y="38" width="50" height="30" rx="3" fill="rgba(201,168,76,0.12)" stroke="rgba(201,168,76,0.4)" strokeWidth="1.5"/>
                    {/* Roof */}
                    <path d="M10 40 L40 16 L70 40" stroke="rgba(201,168,76,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="rgba(201,168,76,0.06)"/>
                    {/* Door */}
                    <rect x="33" y="52" width="14" height="16" rx="2" fill="rgba(201,168,76,0.2)" stroke="rgba(201,168,76,0.35)" strokeWidth="1"/>
                    {/* Window left */}
                    <rect x="20" y="46" width="10" height="9" rx="1.5" fill="rgba(201,168,76,0.15)" stroke="rgba(201,168,76,0.3)" strokeWidth="1"/>
                    {/* Window right */}
                    <rect x="50" y="46" width="10" height="9" rx="1.5" fill="rgba(201,168,76,0.15)" stroke="rgba(201,168,76,0.3)" strokeWidth="1"/>
                    {/* Sparkle top-right */}
                    <path d="M60 20 L61.5 24 L65 25.5 L61.5 27 L60 31 L58.5 27 L55 25.5 L58.5 24 Z" fill="#c9a84c" opacity="0.7"/>
                    {/* Sparkle top-left */}
                    <path d="M20 22 L21 25 L24 26 L21 27 L20 30 L19 27 L16 26 L19 25 Z" fill="#c9a84c" opacity="0.45"/>
                    {/* Small sparkle */}
                    <circle cx="68" cy="36" r="2" fill="#c9a84c" opacity="0.5"/>
                    <circle cx="12" cy="32" r="1.5" fill="#c9a84c" opacity="0.4"/>
                  </svg>
                  <div className="text-xs font-medium" style={{ color: 'rgba(201,168,76,0.7)' }}>ניקיון מקצועי</div>
                </div>

                {/* Checkmark badge */}
                <div className="absolute top-3 start-3 bg-green-500/20 border border-green-400/30 rounded-full px-2.5 py-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-green-400 text-xs font-medium">מבוטח</span>
                </div>
              </div>
            </div>

            {/* Rating row */}
            <div className="px-5 pb-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-white/30 text-xs mb-0.5">דירוג ממוצע</div>
                  <div className="text-4xl font-bold gold-text" style={{ fontFamily: "'Rubik', sans-serif" }}>4.9</div>
                </div>
                <div className="text-end">
                  <div className="text-[#c9a84c] text-sm phone-ltr">★★★★★</div>
                  <div className="text-white/25 text-xs mt-1">200+ ביקורות</div>
                </div>
              </div>
              {/* Rating bar */}
              <div className="flex gap-1">
                {[...Array(5)].map((_,i) => (
                  <div key={i} className="flex-1 h-1 rounded-full bg-[#c9a84c]/55" />
                ))}
              </div>
            </div>
          </div>

          {/* Mini stats row */}
          <div className="flex gap-3">
            {[{ val: '+500', label: 'לקוחות' }, { val: '7/7', label: 'זמינות' }].map(({ val, label }) => (
              <div key={label} className="flex-1 rounded-xl p-4 text-center border border-white/8"
                style={{ background: 'rgba(255,255,255,0.04)' }}>
                <div className="text-2xl font-bold gold-text mb-1 phone-ltr"
                  style={{ fontFamily: "'Rubik', sans-serif" }}>{val}</div>
                <div className="text-white/30 text-xs">{label}</div>
              </div>
            ))}
          </div>

          {/* Live notification */}
          <div className="rounded-xl px-4 py-3.5 flex items-center gap-3 border border-white/8"
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
