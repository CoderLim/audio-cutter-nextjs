import type { Dictionary } from '@/i18n/types'

interface FeaturesProps {
  dictionary: Dictionary
}

export function Features({ dictionary }: FeaturesProps) {
  return (
    <section className="w-full py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{dictionary.features.title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">{dictionary.features.precise.title}</h3>
            <p className="text-gray-600">{dictionary.features.precise.description}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">{dictionary.features.waveform.title}</h3>
            <p className="text-gray-600">{dictionary.features.waveform.description}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">{dictionary.features.instant.title}</h3>
            <p className="text-gray-600">{dictionary.features.instant.description}</p>
          </div>
        </div>
      </div>
    </section>
  )
} 