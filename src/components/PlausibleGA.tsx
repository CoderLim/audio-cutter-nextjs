import Script from 'next/script';

export default function PlausibleGA() {
  return <Script defer data-domain={process.env.NEXT_PUBLIC_SITE_DOMAIN} src={process.env.PLAUSIBLE_GA_URL} crossOrigin='anonymous' strategy="afterInteractive"></Script>
} 