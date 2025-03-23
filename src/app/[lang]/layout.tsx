import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Image from "next/image";
import LanguageSwitcher from "@/components/LanguageSwitcher";
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
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#4F46E5" />
        <meta name="msapplication-TileColor" content="#4F46E5" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GA />
        <PlausibleGA />
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