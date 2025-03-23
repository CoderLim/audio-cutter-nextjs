'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { i18nConfig } from '@/i18n/config'
import { useDictionary } from '@/hooks/useDictionary'

export default function LanguageSwitchPrompt() {
  const [show, setShow] = useState(false)
  const [targetLang, setTargetLang] = useState('')
  const router = useRouter()
  const params = useParams()
  const dict = useDictionary()

  useEffect(() => {
    // 检查是否已经显示过提示
    const hasShownPrompt = localStorage.getItem('languagePromptShown')
    if (hasShownPrompt) return

    // 获取当前语言和浏览器语言
    const currentLang = params?.lang as string
    const browserLang = navigator.language.split('-')[0].toLowerCase()
    
    // 检查浏览器语言是否受支持
    const supportedLang = i18nConfig.locales.find(
      locale => locale.code.toLowerCase().startsWith(browserLang)
    )

    // 如果浏览器语言受支持且与当前语言不同，显示提示
    if (supportedLang && currentLang !== supportedLang.code && currentLang === 'en') {
      setTargetLang(supportedLang.code)
      setShow(true)
    }

    // 标记已显示过提示
    localStorage.setItem('languagePromptShown', 'true')
  }, [params?.lang])

  const handleSwitch = () => {
    const currentPath = window.location.pathname
    const newPath = currentPath.replace(`/${params?.lang}`, `/${targetLang}`)
    router.push(newPath)
    setShow(false)
  }

  const handleDismiss = () => {
    setShow(false)
  }

  if (!show) return null

  const targetLanguageName = i18nConfig.locales.find(l => l.code === targetLang)?.name

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm border border-gray-200 z-50">
      <p className="text-gray-700 mb-3">
        {dict.languagePrompt.question.replace('{language}', targetLanguageName || '')}
      </p>
      <div className="flex justify-end space-x-3">
        <button
          onClick={handleDismiss}
          className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
        >
          {dict.languagePrompt.decline}
        </button>
        <button
          onClick={handleSwitch}
          className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          {dict.languagePrompt.accept}
        </button>
      </div>
    </div>
  )
} 