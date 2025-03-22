import WaveformEditor from '@/components/WaveformEditor'
import { getDictionary } from '@/i18n/getDictionary'
import { i18nConfig } from '@/i18n/config'
import type { Locale } from '@/i18n/types'

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  // Validate that lang is a supported locale
  const validLang = (i18nConfig.locales.some(locale => locale.code === lang) ? lang : 'en') as Locale;
  const dict = await getDictionary(validLang)

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section with Tool Entry */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{dict.hero.title}</h1>
          <p className="text-xl text-gray-600 mb-8">{dict.hero.subtitle}</p>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <WaveformEditor dictionary={dict} />
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{dict.features.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">{dict.features.precise.title}</h3>
              <p className="text-gray-600">{dict.features.precise.description}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">{dict.features.waveform.title}</h3>
              <p className="text-gray-600">{dict.features.waveform.description}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">{dict.features.instant.title}</h3>
              <p className="text-gray-600">{dict.features.instant.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{dict.howTo.title}</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">1</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{dict.howTo.step1.title}</h3>
                <p className="text-gray-600">{dict.howTo.step1.description}</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">2</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{dict.howTo.step2.title}</h3>
                <p className="text-gray-600">{dict.howTo.step2.description}</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">3</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{dict.howTo.step3.title}</h3>
                <p className="text-gray-600">{dict.howTo.step3.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{dict.whyChoose.title}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">{dict.whyChoose.browser.title}</h3>
              <p className="text-gray-600">{dict.whyChoose.browser.description}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">{dict.whyChoose.privacy.title}</h3>
              <p className="text-gray-600">{dict.whyChoose.privacy.description}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">{dict.whyChoose.quality.title}</h3>
              <p className="text-gray-600">{dict.whyChoose.quality.description}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">{dict.whyChoose.interface.title}</h3>
              <p className="text-gray-600">{dict.whyChoose.interface.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{dict.faq.title}</h2>
          <div className="space-y-6">
            {(Object.entries(dict.faq.items) as [string, { question: string; answer: string }][]).map(([key, item]) => (
              <div key={key}>
                <h3 className="text-xl font-semibold mb-2">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 