'use client';
import { useTranslations } from 'next-intl';

const STEPS = [
  { num: '1', emoji: '📝', key: 'step1' },
  { num: '2', emoji: '📞', key: 'step2' },
  { num: '3', emoji: '✨', key: 'step3' },
];

export default function HowItWorks() {
  const t = useTranslations('how');

  return (
    <section id="how" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-navy mb-4">{t('title')}</h2>
          <div className="w-20 h-1 bg-gold mx-auto rounded-full" />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative">
          {/* Connecting line desktop */}
          <div className="hidden md:block absolute top-10 start-[15%] end-[15%] h-px bg-gray-200 z-0" />

          {STEPS.map(({ num, emoji, key }) => (
            <div key={key} className="flex flex-col items-center text-center w-full md:w-1/3 z-10 px-4">
              {/* Icon circle */}
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full bg-light-gray border-4 border-white shadow-xl flex items-center justify-center text-3xl">
                  {emoji}
                </div>
                <span className="absolute -top-1 -end-1 w-7 h-7 bg-gold text-navy text-xs font-black rounded-full flex items-center justify-center border-2 border-white">
                  {num}
                </span>
              </div>
              <h3 className="text-lg font-black text-navy mb-2">{t(`${key}_title`)}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{t(`${key}_desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
