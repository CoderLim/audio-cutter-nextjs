import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18nConfig } from './i18n/config'
import type { Locale } from './i18n/types'

// 静态资源路径
const PUBLIC_FILE = /\.(.*)$/

// 不需要语言重定向的路径
const NO_LANG_REDIRECT_PATHS = ['/privacy', '/contact', '/terms']

// 获取默认语言，不再根据浏览器语言自动判断
function getPreferredLocale(): Locale {
  // 直接返回配置中的默认语言，强制使用英文
  return i18nConfig.defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // 如果是静态资源，直接返回
  if (PUBLIC_FILE.test(pathname)) {
    return
  }

  // 检查是否是无需语言重定向的路径
  if (NO_LANG_REDIRECT_PATHS.some(path => pathname === path)) {
    return
  }

  // 检查请求路径是否已经包含语言代码
  const pathnameHasLocale = i18nConfig.locales.some(
    locale => pathname.startsWith(`/${locale.code}/`) || pathname === `/${locale.code}`
  )

  if (pathnameHasLocale) return

  // 获取默认语言，不再根据浏览器语言判断
  const locale = getPreferredLocale()
  
  // 重定向到带有语言代码的路径
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc)
    '/((?!api|_next/static|_next/image|favicon.svg|logo.svg|assets).*)',
  ],
} 