import WaveformEditor from '@/components/WaveformEditor'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">音频分割工具</h1>
        
        {/* 波形编辑区域 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <WaveformEditor />
        </div>
      </div>
    </main>
  )
}
