'use client';
import { useTranslations } from 'next-intl';

const TESTIMONIALS = ['t1', 't2', 't3'];

export default function Testimonials() {
  const t = useTranslations('testimonials');

  return (
    <section id="testimonials" className="py-24 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-navy mb-4">{t('title')}</h2>
          <div className="w-20 h-1 bg-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((key) => (
            <div key={key} className="bg-white rounded-3xl p-8 shadow-md card-hover border border-gray-100">
              {/* Stars */}
              <div className="text-gold text-xl mb-4">⭐⭐⭐⭐⭐</div>
              {/* Text */}
              <p className="text-gray-700 italic leading-relaxed mb-6 text-sm">
                &ldquo;{t(`${key}_text`)}&rdquo;
              </p>
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-navy text-white rounded-full flex items-center justify-center font-black text-lg">
                  {t(`${key}_name`).charAt(0)}
                </div>
                <div>
                  <div className="font-black text-navy text-sm">{t(`${key}_name`)}</div>
                  <div className="text-gray-500 text-xs">{t(`${key}_city`)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
