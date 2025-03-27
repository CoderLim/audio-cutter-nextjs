import type { Locale, Dictionary } from './types';

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  'en': () => import('./locales/en.json').then((module) => module.default),
  'zh-CN': () => import('./locales/zh-CN.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]();
}; 