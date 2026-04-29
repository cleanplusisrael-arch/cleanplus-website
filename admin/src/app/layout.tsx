import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'Clean+ | לוח ניהול',
  description: 'Dashboard admin — Clean+ ניקיון מקצועי',
  robots: 'noindex, nofollow',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/icon-192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Clean+',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Clean+" />
        <meta name="theme-color" content="#0a1628" />
      </head>
      <body dir="rtl" className="bg-[#f8fafc] font-hebrew">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
