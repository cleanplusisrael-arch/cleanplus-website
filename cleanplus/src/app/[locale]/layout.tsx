import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "../globals.css";

export const metadata: Metadata = {
  title: "Clean+ | שירותי ניקיון מקצועיים",
  description: "שירות ניקיון מקצועי לבתים, משרדים ועסקים. צוות מיומן, ציוד כלול, מחיר הוגן.",
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  const isRTL = ['he'].includes(locale);
  const dir = isRTL ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;700;800;900&family=Assistant:wght@300;400;600;700;800&family=Rubik:wght@300;400;500;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Force RTL direction via CSS as backup for all Hebrew pages */}
        {isRTL && (
          <style dangerouslySetInnerHTML={{ __html: `
            html, body { direction: rtl; }
            /* Ensure Tailwind logical properties work */
            * { box-sizing: border-box; }
          `}} />
        )}
      </head>
      <body dir={dir}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
