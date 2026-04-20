'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  return (
    <footer className="bg-navy border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Image src="/logo.png" alt="Clean+" width={100} height={48} className="object-contain mb-4" />
            <p className="text-white/30 text-sm font-light">{t('tagline')}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white/60 text-xs tracking-ultra uppercase font-medium mb-5">{t('quick_links')}</h4>
            <ul className="space-y-3">
              {['services', 'areas', 'about', 'contact'].map((key) => (
                <li key={key}>
                  <a href={`#${key}`} className="text-white/40 hover:text-gold text-sm transition-colors duration-200">
                    {nav(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/60 text-xs tracking-ultra uppercase font-medium mb-5">{t('contact_us')}</h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li>📞 050-0000000</li>
              <li>✉️ info@cleanplus.co.il</li>
              <li>📍 תל אביב והשרון</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/20">
          <p>© 2025 Clean+ — {t('rights')}</p>
          <div className="w-8 h-px bg-gold/30" />
        </div>
      </div>
    </footer>
  );
}
