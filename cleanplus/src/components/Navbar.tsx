'use client';
import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const LOCALES = [
  { code: 'he', label: 'עב' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'ru', label: 'RU' },
];

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLocalePath = (newLocale: string) => newLocale === 'he' ? '/' : `/${newLocale}`;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-navy/97 backdrop-blur-xl shadow-luxury py-3'
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Clean+"
              width={110}
              height={52}
              priority
              className="object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {['services', 'areas', 'about', 'contact'].map((key) => (
              <a key={key} href={`#${key}`}
                className="text-white/70 hover:text-gold text-sm font-medium tracking-wide transition-colors duration-300 relative group">
                {t(key)}
                <span className="absolute -bottom-1 start-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-5">
            {/* Lang switcher */}
            <div className="flex items-center gap-1 border border-white/10 rounded-full px-2 py-1">
              {LOCALES.map((l, i) => (
                <span key={l.code} className="flex items-center">
                  <Link href={getLocalePath(l.code)}
                    className={`text-xs px-2 py-0.5 rounded-full font-medium transition-all duration-200 ${
                      locale === l.code
                        ? 'bg-gold text-navy'
                        : 'text-white/50 hover:text-white'
                    }`}>
                    {l.label}
                  </Link>
                  {i < LOCALES.length - 1 && <span className="text-white/20 text-xs">·</span>}
                </span>
              ))}
            </div>

            <a href="#contact"
              className="btn-gold text-navy font-bold text-sm px-6 py-2.5 rounded-full">
              {t('cta')}
            </a>
          </div>

          {/* Mobile burger */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2">
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`h-px bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-px bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-400 overflow-hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-navy/98 backdrop-blur-xl px-6 py-8 flex flex-col gap-6 text-center border-t border-white/10">
          {['services', 'areas', 'about', 'contact'].map((key) => (
            <a key={key} href={`#${key}`} onClick={() => setMenuOpen(false)}
              className="text-white/80 hover:text-gold transition text-lg font-light">
              {t(key)}
            </a>
          ))}
          <div className="flex justify-center gap-3 pt-2">
            {LOCALES.map((l) => (
              <Link key={l.code} href={getLocalePath(l.code)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition ${
                  locale === l.code ? 'bg-gold text-navy' : 'border border-white/20 text-white/60'
                }`}>
                {l.label}
              </Link>
            ))}
          </div>
          <a href="#contact" onClick={() => setMenuOpen(false)}
            className="btn-gold text-navy font-bold py-3 px-8 rounded-full mx-auto">
            {t('cta')}
          </a>
        </div>
      </div>
    </nav>
  );
}
