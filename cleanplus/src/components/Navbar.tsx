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
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const getLocalePath = (l: string) => l === 'he' ? '/' : `/${l}`;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-400 ${
      scrolled
        ? 'bg-white/97 backdrop-blur-xl shadow-sm py-2 border-b border-gray-100'
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <div className={`transition-all duration-300 rounded-xl ${
            !scrolled ? 'bg-white/10 px-3 py-1.5' : ''
          }`}>
            <Image
              src="/logo.png"
              alt="Clean+"
              width={160}
              height={72}
              priority
              className="object-contain"
              style={{
                filter: scrolled
                  ? 'none'
                  : 'drop-shadow(0 2px 10px rgba(0,0,0,0.4)) brightness(1.25)'
              }}
            />
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {['services', 'areas', 'about', 'contact'].map((key) => (
            <a key={key} href={`#${key}`}
              className={`text-sm font-medium transition-colors duration-250 relative group ${
                scrolled ? 'text-[#374151] hover:text-[#c9a84c]' : 'text-white/75 hover:text-[#c9a84c]'
              }`}>
              {t(key)}
              <span className="absolute -bottom-0.5 start-0 w-0 h-px bg-[#c9a84c] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {/* Lang switcher */}
          <div className={`flex items-center gap-0.5 rounded-full px-2 py-1.5 border transition-colors duration-300 ${
            scrolled ? 'border-gray-200 bg-gray-50' : 'border-white/15 bg-white/5'
          }`}>
            {LOCALES.map((l) => (
              <Link key={l.code} href={getLocalePath(l.code)}
                className={`text-xs px-2.5 py-0.5 rounded-full font-medium transition-all duration-200 ${
                  locale === l.code
                    ? 'bg-[#c9a84c] text-[#0a1628]'
                    : scrolled ? 'text-gray-500 hover:text-gray-800' : 'text-white/50 hover:text-white'
                }`}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Phone with number */}
          <a href="tel:+972500000000"
            className={`text-sm transition-colors flex items-center gap-1.5 font-medium ${
              scrolled ? 'text-[#374151] hover:text-[#c9a84c]' : 'text-white/70 hover:text-[#c9a84c]'
            }`}>
            📞 <span className="phone-ltr">050-000-0000</span>
          </a>

          {/* CTA */}
          <a href="#contact" className="btn-primary text-sm px-5 py-2.5">
            {t('cta')}
          </a>
        </div>

        {/* Mobile burger */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden p-1.5 ${scrolled ? 'text-[#0a1628]' : 'text-white'}`}>
          <div className="w-6 flex flex-col gap-1.5">
            {[0,1,2].map((i) => (
              <span key={i} className={`block h-px transition-all duration-300 ${
                scrolled ? 'bg-[#0a1628]' : 'bg-white'
              } ${
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
        <div className="bg-white border-t border-gray-100 px-6 py-8 flex flex-col gap-5 text-center shadow-lg">
          {['services', 'areas', 'about', 'contact'].map((key) => (
            <a key={key} href={`#${key}`} onClick={() => setMenuOpen(false)}
              className="text-[#374151] hover:text-[#c9a84c] text-lg font-medium transition-colors">
              {t(key)}
            </a>
          ))}
          <a href="tel:+972500000000"
            className="text-[#374151] text-base font-medium">
            📞 <span className="phone-ltr">050-000-0000</span>
          </a>
          <div className="flex justify-center gap-2 pt-2">
            {LOCALES.map((l) => (
              <Link key={l.code} href={getLocalePath(l.code)}
                className={`text-xs px-3 py-1.5 rounded-full transition ${
                  locale === l.code ? 'bg-[#c9a84c] text-[#0a1628] font-bold' : 'border border-gray-200 text-gray-500'
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
