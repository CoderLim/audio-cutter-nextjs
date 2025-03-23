import React from 'react';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-4">
              Have questions or feedback? We&apos;d love to hear from you. Please fill out the form below or reach out to us through our social media channels.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </div>

          <div className="mt-8 pt-8 border-t">
            <h3 className="text-lg font-semibold mb-4">Other Ways to Reach Us</h3>
            <div className="space-y-2">
              <p className="text-gray-600">
                <strong>Email:</strong> contact@mp3cutter.pro
              </p>
              <p className="text-gray-600">
                <strong>Website:</strong> <a href="https://mp3cutter.pro" className="text-blue-600 hover:underline">mp3cutter.pro</a>
              </p>
              <p className="text-gray-600">
                <strong>Twitter:</strong> @AudioCutter
              </p>
              <p className="text-gray-600">
                <strong>GitHub:</strong> github.com/audiocutter
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 