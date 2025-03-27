import type { Locale, Dictionary } from './types'

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  'en': () => import('./locales/en.json').then((module) => module.default),
  'zh-CN': () => import('./locales/zh-CN.json').then((module) => module.default),
} as const

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  try {
    return await dictionaries[locale]()
  } catch {
    console.warn(`Failed to load dictionary for locale ${locale}, falling back to English`)
    return await dictionaries['en']()
  }
} 