import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "../globals.css";

export const metadata: Metadata = {
  title: "Clean+ | סטנדרט חדש של ניקיון",
  description: "חברת ניקיון מקצועית לבתים ועסקים — מרחובות ועד חדרה. Clean+ מציעה שירות אמין, מבוטח ובמחיר הוגן.",
  keywords: "חברת ניקיון, ניקיון דירות, ניקיון אחרי שיפוץ, ניקיון משרדים, cleanplus",
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  const isRTL = locale === 'he' || locale === 'ar';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Heebo:wght@300;400;500;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-heebo antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
