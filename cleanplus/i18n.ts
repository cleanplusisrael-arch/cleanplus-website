import { getRequestConfig } from 'next-intl/server';

const SUPPORTED_LOCALES = ['he', 'en', 'fr', 'ru'];

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = SUPPORTED_LOCALES.includes(locale as string) ? locale as string : 'he';
  return {
    locale: safeLocale,
    messages: (await import(`./messages/${safeLocale}.json`)).default
  };
});
