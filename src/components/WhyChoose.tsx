import type { Dictionary } from '@/i18n/types'

interface WhyChooseProps {
  dictionary: Dictionary
}

export function WhyChoose({ dictionary }: WhyChooseProps) {
  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{dictionary.whyChoose.title}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">{dictionary.whyChoose.browser.title}</h3>
            <p className="text-gray-600">{dictionary.whyChoose.browser.description}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">{dictionary.whyChoose.privacy.title}</h3>
            <p className="text-gray-600">{dictionary.whyChoose.privacy.description}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">{dictionary.whyChoose.quality.title}</h3>
            <p className="text-gray-600">{dictionary.whyChoose.quality.description}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">{dictionary.whyChoose.interface.title}</h3>
            <p className="text-gray-600">{dictionary.whyChoose.interface.description}</p>
          </div>
        </div>
      </div>
    </section>
  )
} 