import React from 'react';

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-600">
            By accessing and using MP3Cutter, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
          <p className="text-gray-600">
            MP3Cutter provides an online platform for cutting and processing audio files. Our service allows users to upload audio files, make cuts, and download the processed files.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
          <p className="text-gray-600 mb-2">
            As a user of MP3Cutter, you agree to:
          </p>
          <ul className="list-disc list-inside text-gray-600 ml-4">
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account</li>
            <li>Not use the service for any illegal purposes</li>
            <li>Not upload content that infringes on others&apos; rights</li>
            <li>Not attempt to reverse engineer the service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
          <p className="text-gray-600">
            The service and its original content, features, and functionality are owned by MP3Cutter and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
          <p className="text-gray-600">
            MP3Cutter shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Changes to Terms</h2>
          <p className="text-gray-600">
            We reserve the right to modify or replace these terms at any time. We will notify users of any material changes via email or through the service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
          <p className="text-gray-600">
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <p className="text-gray-600 mt-2">
            Email: contact@mp3cutter.pro
          </p>
        </section>

        <div className="text-sm text-gray-500 mt-8">
          Last Updated: March 23, 2024
        </div>
      </div>
    </div>
  );
} 