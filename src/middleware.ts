import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18nConfig } from './i18n/config'

// Get the preferred locale, similar to above or using a different method
function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language')
  if (!acceptLanguage) return i18nConfig.defaultLocale
  
  const preferredLocale = acceptLanguage
    .split(',')[0]
    .split('-')[0]
    .toLowerCase()
  
  return i18nConfig.locales.find(locale => 
    locale.code.toLowerCase().startsWith(preferredLocale)
  )?.code || i18nConfig.defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the pathname already has a locale
  const pathnameHasLocale = i18nConfig.locales.some(
    locale => pathname.startsWith(`/${locale.code}/`) || pathname === `/${locale.code}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc)
    '/((?!api|_next/static|_next/image|favicon.svg|logo.svg|assets).*)',
  ],
} 