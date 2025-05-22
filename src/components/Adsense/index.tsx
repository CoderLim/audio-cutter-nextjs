import Script from 'next/script';

export default function AdSense() {
  const clientId = process.env.GOOGLE_ADSENSE_ID || 'ca-pub-8028656293202971';
  
  return <>
    {/* 广告 */}
    <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`} crossOrigin='anonymous' strategy="afterInteractive" />
    {/* 广告 blocked，恢复广告 */}
    <>
      {/* 引入 Google Funding Choices 脚本 */}
      <Script
        async
        src={`https://fundingchoicesmessages.google.com/i/pub-${clientId.replace('ca-pub-', '')}?ers=1`}
        strategy="afterInteractive"
      />
      {/* 执行额外的嵌入脚本 */}
      <Script id="googlefc-script" strategy="afterInteractive">
        {`
          (function() {
            function signalGooglefcPresent() {
              if (!window.frames['googlefcPresent']) {
                if (document.body) {
                  const iframe = document.createElement('iframe');
                  iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;';
                  iframe.style.display = 'none';
                  iframe.name = 'googlefcPresent';
                  document.body.appendChild(iframe);
                } else {
                  setTimeout(signalGooglefcPresent, 0);
                }
              }
            }
            signalGooglefcPresent();
          })();
        `}
      </Script>
    </>

  </>
}