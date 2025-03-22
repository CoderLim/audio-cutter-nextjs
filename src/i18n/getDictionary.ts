import type { Locale, Dictionary } from './types'

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  'en': () => import('./locales/en.json').then((module) => module.default),
  'zh-CN': () => import('./locales/zh-CN.json').then((module) => module.default),
  'es': () => import('./locales/es.json').then((module) => module.default),
  'pt': () => import('./locales/pt.json').then((module) => module.default),
  'ar': () => import('./locales/ar.json').then((module) => module.default),
  'ja': () => import('./locales/ja.json').then((module) => module.default),
  'ko': () => import('./locales/ko.json').then((module) => module.default),
  'de': () => import('./locales/de.json').then((module) => module.default),
  'fr': () => import('./locales/fr.json').then((module) => module.default),
  'ru': () => import('./locales/ru.json').then((module) => module.default)
} as const

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  try {
    return await dictionaries[locale]()
  } catch {
    console.warn(`Failed to load dictionary for locale ${locale}, falling back to English`)
    return await dictionaries['en']()
  }
} 