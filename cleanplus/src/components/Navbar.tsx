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

  const getLocalePath = (l: string) => l === 'he' ? '/' : `/${l}`;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-400 ${
      scrolled ? 'bg-navy/97 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">

        {/* Logo — bigger, with white bg for transparency */}
        <Link href="/" className="flex items-center shrink-0">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-1.5">
            <Image
              src="/logo.png"
              alt="Clean+"
              width={130}
              height={62}
              priority
              className="object-contain"
              style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))' }}
            />
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {['services', 'areas', 'about', 'contact'].map((key) => (
            <a key={key} href={`#${key}`}
              className="text-white/60 hover:text-gold text-sm font-medium tracking-wide transition-colors duration-250 relative group">
              {t(key)}
              <span className="absolute -bottom-0.5 start-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {/* Lang switcher */}
          <div className="flex items-center gap-0.5 bg-white/5 border border-white/10 rounded-full px-2 py-1.5">
            {LOCALES.map((l) => (
              <Link key={l.code} href={getLocalePath(l.code)}
                className={`text-xs px-2.5 py-0.5 rounded-full font-medium transition-all duration-200 ${
                  locale === l.code ? 'bg-gold text-navy' : 'text-white/40 hover:text-white'
                }`}>
                {l.label}
              </Link>
            ))}
          </div>
          <a href="tel:+972500000000" className="text-white/50 hover:text-gold text-sm transition-colors flex items-center gap-1.5">
            📞
          </a>
          <a href="#contact" className="btn-primary text-sm px-5 py-2.5">
            {t('cta')}
          </a>
        </div>

        {/* Mobile burger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white p-1.5">
          <div className="w-6 flex flex-col gap-1.5">
            {[0,1,2].map((i) => (
              <span key={i} className={`block h-px bg-white transition-all duration-300 ${
                menuOpen && i === 0 ? 'rotate-45 translate-y-2.5' :
                menuOpen && i === 1 ? 'opacity-0 w-0' :
                menuOpen && i === 2 ? '-rotate-45 -translate-y-2.5' : ''
              }`} />
            ))}
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-400 ${menuOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="bg-navy/98 backdrop-blur-2xl border-t border-white/8 px-6 py-8 flex flex-col gap-5 text-center">
          {['services', 'areas', 'about', 'contact'].map((key) => (
            <a key={key} href={`#${key}`} onClick={() => setMenuOpen(false)}
              className="text-white/70 hover:text-gold text-lg font-light transition-colors">
              {t(key)}
            </a>
          ))}
          <div className="flex justify-center gap-2 pt-2">
            {LOCALES.map((l) => (
              <Link key={l.code} href={getLocalePath(l.code)}
                className={`text-xs px-3 py-1.5 rounded-full transition ${
                  locale === l.code ? 'bg-gold text-navy font-bold' : 'border border-white/20 text-white/50'
                }`}>
                {l.label}
              </Link>
            ))}
          </div>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-primary mx-auto text-sm">
            {t('cta')}
          </a>
        </div>
      </div>
    </nav>
  );
}
