import type { Metadata } from 'next';
import RecruitmentPageClient from './RecruitmentPageClient';

export const metadata: Metadata = {
  title: 'Join Our Team - Clean+ Cleaning Services | Careers',
  description: 'Join Clean+ team as a cleaning professional. Flexible hours, competitive pay, training provided. Apply now for immediate opportunities in Israel.',
  keywords: ['cleaning jobs', 'recruitment', 'employment', 'careers', 'Israel'],
  openGraph: {
    title: 'Join Clean+ Team - Cleaning Jobs Available',
    description: 'Flexible work, competitive pay. Apply for cleaning professional positions.',
    images: [{ url: 'https://cleanplus.co.il/og-recruitment.png', width: 1200, height: 630, alt: 'Clean+ Recruitment' }],
    url: 'https://cleanplus.co.il/recruitment',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cleanplus.co.il/recruitment',
    languages: {
      'he': 'https://cleanplus.co.il/he/recruitment',
      'en': 'https://cleanplus.co.il/en/recruitment',
    }
  }
};

export default function RecruitmentPage() {
  return <RecruitmentPageClient />;
}
