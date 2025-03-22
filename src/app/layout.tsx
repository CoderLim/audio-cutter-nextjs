import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MP3 Cutter - Free Online Audio Splitter Tool",
  description: "Free online MP3 cutter tool to split and trim audio files. Easy to use, no registration required. Cut MP3 files with precision and download instantly.",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="MP3 Cutter Logo" width={32} height={32} />
              <span className="text-xl font-semibold text-gray-900">MP3 Cutter</span>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
