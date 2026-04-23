import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['he', 'en', 'fr', 'ru'],
  defaultLocale: 'he',
  localePrefix: 'as-needed',
  localeDetection: false,   // toujours hébreu par défaut, peu importe le navigateur
});

export default function middleware(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)' 
  ]
};
