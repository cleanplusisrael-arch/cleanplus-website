'use client';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  return (
    <footer className="bg-[#08121C] border-t border-white/10 py-12 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="text-2xl font-black text-white mb-2" dir="ltr">
              clean<span className="text-gold">+</span>
            </div>
            <p className="text-sm">{t('tagline')}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-black mb-4">{t('quick_links')}</h4>
            <ul className="space-y-2 text-sm">
              {['services', 'areas', 'about', 'contact'].map((key) => (
                <li key={key}>
                  <a href={`#${key}`} className="hover:text-gold transition">{nav(key)}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-black mb-4">{t('contact_us')}</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><span className="text-gold">📞</span> 050-0000000</li>
              <li className="flex items-center gap-2"><span className="text-gold">✉️</span> info@cleanplus.co.il</li>
              <li className="flex items-center gap-2"><span className="text-gold">📍</span> תל אביב והשרון</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 text-center text-xs">
          <p>© 2025 Clean+ — {t('rights')}</p>
        </div>
      </div>
    </footer>
  );
}
