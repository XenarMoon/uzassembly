// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n/config'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
  localePrefix: 'always',
})

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  const locale = pathnameHasLocale 
    ? pathname.split('/')[1] 
    : defaultLocale
  
  const isAdminRoute = pathname.includes('/admin') && 
                      !pathname.includes('/admin/login')
  
  if (isAdminRoute) {
    // ✅ Next.js 15: cookies.get() ishlatamiz
    const token = request.cookies.get('token')?.value
    
    if (!token) {
      const url = request.nextUrl.clone()
      url.pathname = `/${locale}/admin/login`
      return NextResponse.redirect(url)
    }
  }
  
  return intlMiddleware(request)
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|static|.*\\..*|favicon).*)',
  ],
}