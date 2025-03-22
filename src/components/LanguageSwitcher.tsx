'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { i18nConfig } from '@/i18n/config'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Get current locale from pathname
  const currentLocale = i18nConfig.locales.find(
    locale => pathname.startsWith(`/${locale.code}`)
  ) || i18nConfig.locales.find(locale => locale.code === i18nConfig.defaultLocale)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const switchLanguage = (localeCode: string) => {
    const newPathname = pathname.replace(/^\/[^\/]+/, `/${localeCode}`)
    router.push(newPathname)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        <span>{currentLocale?.flag}</span>
        <span>{currentLocale?.name}</span>
        <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          {i18nConfig.locales.map((locale) => (
            <button
              key={locale.code}
              onClick={() => switchLanguage(locale.code)}
              className={`flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-100 transition-colors duration-200
                ${currentLocale?.code === locale.code ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
            >
              <span>{locale.flag}</span>
              <span>{locale.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
} 