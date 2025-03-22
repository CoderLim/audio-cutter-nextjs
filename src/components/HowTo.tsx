import type { Dictionary } from '@/i18n/types'

interface HowToProps {
  dictionary: Dictionary
}

export function HowTo({ dictionary }: HowToProps) {
  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{dictionary.howTo.title}</h2>
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">1</div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{dictionary.howTo.step1.title}</h3>
              <p className="text-gray-600">{dictionary.howTo.step1.description}</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">2</div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{dictionary.howTo.step2.title}</h3>
              <p className="text-gray-600">{dictionary.howTo.step2.description}</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">3</div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{dictionary.howTo.step3.title}</h3>
              <p className="text-gray-600">{dictionary.howTo.step3.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 