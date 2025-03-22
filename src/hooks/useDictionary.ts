import { useParams } from 'next/navigation'
import { getDictionary } from '@/i18n/getDictionary'
import { useEffect, useState } from 'react'
import type { Dictionary } from '@/i18n/types'

// 默认的空字典
const emptyDictionary: Dictionary = {
  meta: { title: '', description: '' },
  header: { title: '' },
  hero: { title: '', subtitle: '' },
  upload: { title: '', dropzone: '', button: '', newFile: '' },
  editor: { save: '', saving: '', play: '', pause: '', startTime: '', endTime: '' },
  features: {
    title: '',
    precise: { title: '', description: '' },
    waveform: { title: '', description: '' },
    instant: { title: '', description: '' }
  },
  howTo: {
    title: '',
    step1: { title: '', description: '' },
    step2: { title: '', description: '' },
    step3: { title: '', description: '' }
  },
  whyChoose: {
    title: '',
    browser: { title: '', description: '' },
    privacy: { title: '', description: '' },
    quality: { title: '', description: '' },
    interface: { title: '', description: '' }
  },
  faq: {
    title: '',
    items: {
      free: { question: '', answer: '' },
      size: { question: '', answer: '' },
      quality: { question: '', answer: '' },
      security: { question: '', answer: '' },
      mobile: { question: '', answer: '' }
    }
  }
}

export function useDictionary() {
  const [dictionary, setDictionary] = useState<Dictionary>(emptyDictionary)
  const params = useParams()

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const locale = (params?.lang as string) || 'en'
        const dict = await getDictionary(locale)
        setDictionary(dict)
      } catch (error) {
        console.error('Error loading dictionary:', error)
        // 如果加载失败，保持使用空字典
      }
    }
    loadDictionary()
  }, [params?.lang])

  return dictionary
} 