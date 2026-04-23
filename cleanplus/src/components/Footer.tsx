'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  return (
    <footer className="bg-[#060f1e] border-t border-white/5 py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <Image src="/logo.png" alt="Clean+" width={150} height={72} className="object-contain mb-4" />
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.7 }}>
              {t('tagline')}
            </p>
          </div>
          <div>
            <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              {t('quick_links')}
            </h4>
            <ul className="space-y-3">
              {['services', 'areas', 'about', 'contact'].map((key) => (
                <li key={key}>
                  <a href={`#${key}`}
                    style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.875rem' }}
                    className="hover:text-[#c9a84c] transition-colors duration-200">
                    {nav(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              {t('contact_us')}
            </h4>
            <ul className="space-y-3" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.35)' }}>
              <li className="phone-ltr">📞 <span>050-000-0000</span></li>
              <li className="phone-ltr">✉️ <span>info@cleanplus.co.il</span></li>
              <li>📍 {t('area_value')}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)' }}>
          <p>© 2025 Clean+ · {t('rights')}</p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-[#c9a84c] transition-colors">{t('privacy')}</a>
            <span>·</span>
            <a href="/terms" className="hover:text-[#c9a84c] transition-colors">{t('terms')}</a>
            <span>·</span>
            <p>{t('vat_note')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
