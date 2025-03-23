import React from 'react';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto prose prose-indigo">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-gray-600 mb-4">
                At MP3Cutter, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our audio cutting service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <div className="space-y-2">
                <h3 className="text-xl font-medium">2.1 Personal Information</h3>
                <p className="text-gray-600">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc list-inside text-gray-600 ml-4">
                  <li>Create an account</li>
                  <li>Upload audio files</li>
                  <li>Contact us for support</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-600">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                <li>Provide and maintain our service</li>
                <li>Process your audio files</li>
                <li>Send you important updates and notifications</li>
                <li>Respond to your comments and questions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <p className="text-gray-600">
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-gray-600 mt-2">
                Email: contact@mp3cutter.pro
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Changes to This Policy</h2>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
              </p>
            </section>

            <div className="text-sm text-gray-500 mt-8">
              Last Updated: March 23, 2024
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 