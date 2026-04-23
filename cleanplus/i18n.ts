import { getRequestConfig } from 'next-intl/server';

const SUPPORTED_LOCALES = ['he', 'en', 'fr', 'ru'];

// next-intl v4: requestLocale is a Promise, not a direct string
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = SUPPORTED_LOCALES.includes(requested as string) ? (requested as string) : 'he';

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
