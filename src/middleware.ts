import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Enable browser language detection
  localeDetection: true,

  // Always show locale in URL (/uz, /ru, /en)
  localePrefix: 'always',
});

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /_vercel (Vercel internals)
  // - /static (inside /public)
  // - all root files like favicon.ico, robots.txt
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
