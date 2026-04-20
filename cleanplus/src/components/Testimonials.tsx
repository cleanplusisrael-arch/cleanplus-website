'use client';
import { useTranslations } from 'next-intl';

const TESTIMONIALS = ['t1', 't2', 't3'];

export default function Testimonials() {
  const t = useTranslations('testimonials');

  return (
    <section id="testimonials" className="py-32 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-gold" />
            <span className="text-gold text-xs tracking-ultra uppercase font-medium">Témoignages</span>
          </div>
          <h2 className="font-display font-light text-navy"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            {t('title')}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((key, i) => (
            <div key={key}
              className={`card-luxury rounded-3xl p-10 relative ${
                i === 1 ? 'md:-mt-6 md:mb-6' : ''
              }`}>
              {/* Quote mark */}
              <div className="font-display text-7xl text-gold/15 leading-none mb-4 select-none">&ldquo;</div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-gold text-sm">★</span>
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 font-light leading-relaxed text-sm mb-8 italic">
                {t(`${key}_text`)}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-gold font-display font-bold">
                  {t(`${key}_name`).charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-navy text-sm">{t(`${key}_name`)}</div>
                  <div className="text-gray-400 text-xs">{t(`${key}_city`)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
