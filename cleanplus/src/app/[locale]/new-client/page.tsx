import type { Metadata } from 'next';
import NewClientPageClient from './NewClientPageClient';

export const metadata: Metadata = {
  title: 'Free Cleaning Quote - Clean+ Israel | Same-Day Response',
  description: 'Get your professional cleaning quote in 60 seconds. Transparent pricing, no commitment, expert team. Free estimate for residential & commercial cleaning.',
  keywords: ['cleaning services', 'free quote', 'professional cleaning', 'Israel', 'Tel Aviv', 'Herzliya'],
  openGraph: {
    title: 'Free Cleaning Quote - Clean+',
    description: 'Professional cleaning services. Get a free quote within 1 hour.',
    images: [{ url: 'https://cleanplus.co.il/og-quote.png', width: 1200, height: 630, alt: 'Clean+ Free Cleaning Quote' }],
    url: 'https://cleanplus.co.il/new-client',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cleanplus.co.il/new-client',
    languages: {
      'he': 'https://cleanplus.co.il/he/new-client',
      'en': 'https://cleanplus.co.il/en/new-client',
    }
  }
};

export default function NewClientPage() {
  return <NewClientPageClient />;
}
