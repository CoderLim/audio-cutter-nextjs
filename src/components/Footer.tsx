import Link from 'next/link';
import { i18nConfig } from '@/i18n/config';
import FriendLinks from './FriendLinks';
export default function Footer() {
  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Pages */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Pages</h3>
            <ul className="space-y-2">
              {pages.map((page) => (
                <li key={page.path}>
                  <Link
                    href={page.path}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Languages</h3>
            <ul className="space-y-2">
              {i18nConfig.locales.map((locale) => (
                <li key={locale.code}>
                  <Link
                    href={`/${locale.code}`}
                    className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2"
                  >
                    <span>{locale.flag}</span>
                    <span>{locale.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:contact@mp3cutter.pro"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  contact@mp3cutter.pro
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/CoderLim/audio-cutter-nextjs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">About</h3>
            <p className="text-sm text-gray-600">
              MP3Cutter is a free online tool for cutting and trimming audio files. 
              All processing is done in your browser, ensuring your privacy and security.
            </p>
          </div>
        </div>

        {/* Friendly Links */}
        <div className="mt-8 pt-4 border-t">
          <FriendLinks />
        </div>

        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} MP3Cutter. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 