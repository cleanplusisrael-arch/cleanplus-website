'use client';
import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const LOCALES = [
  { code: 'he', label: 'עב', flag: '🇮🇱' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'ru', label: 'RU', flag: '🇷🇺' },
];

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isRTL = locale === 'he';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLocalePath = (newLocale: string) => {
    return newLocale === 'he' ? '/' : `/${newLocale}`;
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-navy/95 backdrop-blur-md shadow-lg' : 'bg-navy'
    } border-b border-white/10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link href="/" className="text-2xl font-black tracking-tighter text-white" dir="ltr">
            clean<span className="text-gold">+</span>
          </Link>

          {/* Desktop Menu */}
          <div className={`hidden md:flex gap-8 items-center font-medium ${isRTL ? 'flex-row-reverse' : ''}`}>
            <a href="#services" className="text-gray-300 hover:text-gold transition">{t('services')}</a>
            <a href="#areas" className="text-gray-300 hover:text-gold transition">{t('areas')}</a>
            <a href="#testimonials" className="text-gray-300 hover:text-gold transition">{t('about')}</a>
            <a href="#contact" className="text-gray-300 hover:text-gold transition">{t('contact')}</a>
          </div>

          {/* Right side: Lang switcher + CTA */}
          <div className={`hidden md:flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Language switcher */}
            <div className="flex gap-1">
              {LOCALES.map((l) => (
                <Link
                  key={l.code}
                  href={getLocalePath(l.code)}
                  className={`text-xs px-2 py-1 rounded transition font-bold ${
                    locale === l.code
                      ? 'bg-gold text-navy'
                      : 'text-gray-400 hover:text-gold'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <a
              href="#contact"
              className="bg-gold hover:bg-gold-hover text-navy px-6 py-2.5 rounded-full font-bold transition btn-gold-glow text-sm"
            >
              {t('cta')}
            </a>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white hover:text-gold transition"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy border-t border-white/10">
          <div className="px-4 py-6 flex flex-col gap-4 text-center">
            <a href="#services" onClick={() => setMenuOpen(false)} className="text-gray-200 hover:text-gold py-2">{t('services')}</a>
            <a href="#areas" onClick={() => setMenuOpen(false)} className="text-gray-200 hover:text-gold py-2">{t('areas')}</a>
            <a href="#testimonials" onClick={() => setMenuOpen(false)} className="text-gray-200 hover:text-gold py-2">{t('about')}</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="text-gray-200 hover:text-gold py-2">{t('contact')}</a>
            <div className="flex justify-center gap-2 pt-2">
              {LOCALES.map((l) => (
                <Link key={l.code} href={getLocalePath(l.code)}
                  className={`text-xs px-3 py-1.5 rounded font-bold transition ${
                    locale === l.code ? 'bg-gold text-navy' : 'text-gray-400 border border-white/20'
                  }`}>
                  {l.flag} {l.label}
                </Link>
              ))}
            </div>
            <a href="#contact" onClick={() => setMenuOpen(false)}
              className="bg-gold text-navy px-6 py-3 rounded-full font-bold mt-2 mx-auto inline-block">
              {t('cta')}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
