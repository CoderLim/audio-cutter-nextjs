import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Image from "next/image";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import LanguageSwitchPrompt from "@/components/LanguageSwitchPrompt";
import PlausibleGA from "@/components/PlausibleGA";
import GA from "@/components/GA";
import { i18nConfig } from "@/i18n/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({
    lang: locale.code,
  }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <head>
        {/* Basic Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>MP3 Cutter - Free Online Audio Trimmer and Cutter</title>
        <meta name="description" content="Free online MP3 cutter - Cut, trim, and edit audio files directly in your browser. No upload needed, instant processing, and high-quality output. Try now at mp3cutter.pro!" />
        <meta name="keywords" content="MP3 Cutter, audio trimmer, cut mp3, online audio editor, mp3 editor, audio cutter" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mp3cutter.pro" />
        <meta property="og:title" content="MP3 Cutter - Free Online Audio Trimmer" />
        <meta property="og:description" content="Free online MP3 cutter - Cut, trim, and edit audio files directly in your browser. No upload needed, instant processing, and high-quality output." />
        <meta property="og:image" content="https://mp3cutter.pro/og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://mp3cutter.pro" />
        <meta name="twitter:title" content="MP3 Cutter - Free Online Audio Trimmer" />
        <meta name="twitter:description" content="Free online MP3 cutter - Cut, trim, and edit audio files directly in your browser. No upload needed, instant processing, and high-quality output." />
        <meta name="twitter:image" content="https://mp3cutter.pro/og-image.png" />

        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#4F46E5" />
        <meta name="msapplication-TileColor" content="#4F46E5" />

        {/* Additional SEO */}
        <link rel="canonical" href="https://mp3cutter.pro" />
        <meta name="robots" content="index, follow" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GA />
        <PlausibleGA />
        <LanguageSwitchPrompt />
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image src="/logo.svg" alt="MP3 Cutter Logo" width={32} height={32} />
                <span className="text-xl font-semibold text-gray-900">MP3 Cutter</span>
              </div>
              <LanguageSwitcher />
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
} 