import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['he', 'en', 'fr', 'ru'],
  defaultLocale: 'he',
  localePrefix: 'as-needed',
  localeDetection: false,   // Default to Hebrew regardless of browser language
});

export default function middleware(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)' 
  ]
};
