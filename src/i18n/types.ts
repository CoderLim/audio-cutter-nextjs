import { i18nConfig } from './config'

export type Locale = typeof i18nConfig.locales[number]['code'];

export interface Dictionary {
  meta: {
    title: string
    description: string
  }
  header: {
    title: string
  }
  hero: {
    title: string
    subtitle: string
  }
  upload: {
    title: string
    dropzone: string
    button: string
    newFile: string
  }
  editor: {
    save: string
    saving: string
    play: string
    pause: string
    startTime: string
    endTime: string
  }
  features: {
    title: string
    precise: {
      title: string
      description: string
    }
    waveform: {
      title: string
      description: string
    }
    instant: {
      title: string
      description: string
    }
  }
  howTo: {
    title: string
    step1: {
      title: string
      description: string
    }
    step2: {
      title: string
      description: string
    }
    step3: {
      title: string
      description: string
    }
  }
  whyChoose: {
    title: string
    browser: {
      title: string
      description: string
    }
    privacy: {
      title: string
      description: string
    }
    quality: {
      title: string
      description: string
    }
    interface: {
      title: string
      description: string
    }
  }
  faq: {
    title: string
    items: {
      free: {
        question: string
        answer: string
      }
      size: {
        question: string
        answer: string
      }
      quality: {
        question: string
        answer: string
      }
      security: {
        question: string
        answer: string
      }
      mobile: {
        question: string
        answer: string
      }
    }
  }
} 