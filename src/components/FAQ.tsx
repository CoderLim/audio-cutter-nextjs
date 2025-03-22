import type { Dictionary } from '@/i18n/types'

interface FAQProps {
  dictionary: Dictionary
}

export function FAQ({ dictionary }: FAQProps) {
  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{dictionary.faq.title}</h2>
        <div className="space-y-6">
          {Object.entries(dictionary.faq.items).map(([key, item]) => (
            <div key={key} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{item.question}</h3>
              <p className="text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 