import type { Dictionary } from '@/i18n/types'
import WaveformEditor from './WaveformEditor'

interface HeroProps {
  dictionary: Dictionary
}

export function Hero({ dictionary }: HeroProps) {
  return (
    <section className="w-full bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{dictionary.hero.title}</h1>
        <p className="text-xl text-gray-600 mb-8">{dictionary.hero.subtitle}</p>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <WaveformEditor dictionary={dictionary} />
        </div>
      </div>
    </section>
  )
} 