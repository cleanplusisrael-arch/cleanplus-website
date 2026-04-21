'use client';
import { useTranslations } from 'next-intl';

const STEPS = [
  { num: '01', emoji: '📝', key: 'step1', time: '60 שניות' },
  { num: '02', emoji: '📞', key: 'step2', time: 'תוך שעה'  },
  { num: '03', emoji: '✨', key: 'step3', time: 'ביום שנקבע' },
];

export default function HowItWorks() {
  const t = useTranslations('how');

  return (
    <section id="how" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="text-center mb-20">
          <div className="section-label justify-center">{t('title')}</div>
          <h2 className="font-display font-light text-navy"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            ניקיון ב-3 צעדים פשוטים
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting dashed line */}
          <div className="hidden md:block absolute top-16 start-[18%] end-[18%] border-t-2 border-dashed border-gold/20 z-0" />

          {STEPS.map(({ num, emoji, key, time }) => (
            <div key={key} className="relative z-10 text-center group">
              {/* Circle */}
              <div className="relative inline-flex items-center justify-center w-32 h-32 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full border border-gold/15 bg-cream transition-all duration-400 group-hover:border-gold/40 group-hover:bg-gold/5" />
                <span className="text-5xl relative z-10 transition-transform duration-300 group-hover:scale-110">
                  {emoji}
                </span>
                {/* Number badge */}
                <div className="absolute -top-1 -end-1 w-9 h-9 rounded-full bg-navy border-2 border-white flex items-center justify-center">
                  <span className="text-gold text-xs font-bold font-display">{num}</span>
                </div>
              </div>

              {/* Time pill */}
              <div className="inline-flex items-center gap-1.5 bg-gold/10 border border-gold/20 text-gold text-xs font-medium px-3 py-1 rounded-full mb-4">
                ⏱ {time}
              </div>

              <h3 className="font-display text-xl font-semibold text-navy mb-3">
                {t(`${key}_title`)}
              </h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed max-w-[220px] mx-auto">
                {t(`${key}_desc`)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="#contact" className="btn-primary inline-flex text-sm">
            הזמן ניקיון עכשיו ←
          </a>
          <p className="text-slate-400 text-xs mt-3">ללא התחייבות · חוזרים תוך שעה</p>
        </div>
      </div>
    </section>
  );
}
