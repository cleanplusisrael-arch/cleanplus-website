import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['he', 'en', 'fr', 'ru'],
  defaultLocale: 'he',
  localePrefix: 'as-needed' // Hebrew has no prefix (cleanplus.co.il/), others get prefix
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
