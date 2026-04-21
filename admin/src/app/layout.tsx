import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'Clean+ | לוח ניהול',
  description: 'Dashboard admin — Clean+ ניקיון מקצועי',
  robots: 'noindex, nofollow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body dir="rtl" className="bg-[#f8fafc] font-hebrew">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
