'use client';
import { useTranslations } from 'next-intl';

const STEPS = [
  { num: '01', emoji: '📝', key: 'step1' },
  { num: '02', emoji: '📞', key: 'step2' },
  { num: '03', emoji: '✨', key: 'step3' },
];

export default function HowItWorks() {
  const t = useTranslations('how');

  return (
    <section id="how" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-gold" />
            <span className="text-gold text-xs tracking-ultra uppercase font-medium">Process</span>
            <div className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-display font-light text-navy"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            {t('title')}
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 start-[20%] end-[20%] h-px bg-gradient-to-r rtl:bg-gradient-to-l from-transparent via-gold/30 to-transparent" />

          {STEPS.map(({ num, emoji, key }) => (
            <div key={key} className="text-center group">
              {/* Number circle */}
              <div className="relative inline-block mb-8">
                <div className="w-24 h-24 rounded-full border border-gold/20 bg-cream flex items-center justify-center mx-auto transition-all duration-400 group-hover:border-gold/50 group-hover:bg-gold/5">
                  <span className="text-3xl transition-transform duration-300 group-hover:scale-110">{emoji}</span>
                </div>
                <div className="absolute -top-2 -end-2 w-8 h-8 rounded-full bg-navy border-2 border-cream flex items-center justify-center">
                  <span className="text-gold text-xs font-bold font-display">{num}</span>
                </div>
              </div>

              <h3 className="font-display text-xl font-semibold text-navy mb-3">
                {t(`${key}_title`)}
              </h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed max-w-xs mx-auto">
                {t(`${key}_desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
