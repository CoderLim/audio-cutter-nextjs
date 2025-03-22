import WaveformEditor from '@/components/WaveformEditor'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section with Tool Entry */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">MP3 Cutter - Free Online Audio Splitter</h1>
          <p className="text-xl text-gray-600 mb-8">Split and trim your MP3 files with precision. No registration required.</p>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <WaveformEditor />
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Main Features of Our MP3 Cutter</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Precise Cutting</h3>
              <p className="text-gray-600">Our MP3 cutter provides millisecond-level precision for accurate audio splitting. Perfect for creating ringtones or extracting specific parts of your audio files.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Waveform Visualization</h3>
              <p className="text-gray-600">Visual waveform display helps you identify exact cutting points. The intuitive interface makes it easy to select the perfect segment of your audio.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Instant Download</h3>
              <p className="text-gray-600">Process your MP3 files instantly and download them immediately. No waiting time, no watermarks, and no quality loss.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">How to Use Our MP3 Cutter</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">1</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Upload Your MP3 File</h3>
                <p className="text-gray-600">Click the upload button or drag and drop your MP3 file into the designated area. Our MP3 cutter supports files up to 50MB in size.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">2</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Select Cutting Points</h3>
                <p className="text-gray-600">Use the waveform visualization to select your desired cutting points. You can either drag the handles or input exact timestamps for precise control.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">3</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Preview and Download</h3>
                <p className="text-gray-600">Preview your selection using the built-in player. Once satisfied, click the download button to save your trimmed MP3 file.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Our MP3 Cutter?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Browser-Based Solution</h3>
              <p className="text-gray-600">Our MP3 cutter runs entirely in your browser, eliminating the need for software installation. Access it from any device with an internet connection.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Privacy-Focused</h3>
              <p className="text-gray-600">Your audio files are processed locally in your browser. We never store or transmit your files to our servers, ensuring complete privacy.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">High-Quality Output</h3>
              <p className="text-gray-600">Our MP3 cutter maintains the original audio quality of your files. No compression or quality loss during the cutting process.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">User-Friendly Interface</h3>
              <p className="text-gray-600">The intuitive design of our MP3 cutter makes it easy for anyone to split their audio files, regardless of technical expertise.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Is this MP3 cutter free to use?</h3>
              <p className="text-gray-600">Yes, our MP3 cutter is completely free to use. There are no hidden charges or premium features. You can split as many MP3 files as you want without any limitations.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What file sizes does the MP3 cutter support?</h3>
              <p className="text-gray-600">Our MP3 cutter supports files up to 50MB in size. This should be sufficient for most audio files, including full-length songs and podcasts.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Will the MP3 cutter affect audio quality?</h3>
              <p className="text-gray-600">No, our MP3 cutter maintains the original audio quality of your files. We use advanced algorithms to ensure precise cutting without any quality loss.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Is my audio data secure?</h3>
              <p className="text-gray-600">Yes, your audio files are processed entirely in your browser. We never store or transmit your files to our servers, ensuring complete privacy and security.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Can I use the MP3 cutter on mobile devices?</h3>
              <p className="text-gray-600">Yes, our MP3 cutter is fully responsive and works on all devices, including smartphones and tablets. The interface adapts to your screen size for optimal usability.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
