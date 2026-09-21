import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="de">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="DEASY erklärt deine Behördenbriefe, erkennt Fristen und hilft dir, den nächsten Schritt zu tun. Kostenloser Bürokratie Check in 2 Minuten." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="DEASY — Deutsche Bürokratie. Endlich verständlich." />
        <meta property="og:description" content="Lade einen Brief hoch. DEASY erklärt dir, was er bedeutet, was du tun musst — und welche Fristen du im Blick behalten solltest." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%231C2340'/%3E%3Crect x='9' y='9' width='14' height='14' rx='4' fill='%234338CA'/%3E%3C/svg%3E" />
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --bg: #F5F5F1;
            --bg-alt: #EFEEE8;
            --ink: #14151C;
            --ink-soft: #4B4E5C;
            --navy: #1C2340;
            --indigo: #4338CA;
            --indigo-soft: #EDEBFC;
            --line: #E1DFD7;
            --success: #1E8E5A;
            --warning: #B45309;
            --danger: #C0392B;
            --white: #FFFFFF;
            --radius: 18px;
            --radius-sm: 12px;
            --maxw: 1180px;
          }
          * {
            box-sizing: border-box;
          }
          html {
            scroll-behavior: smooth;
          }
          body {
            margin: 0;
            background: var(--bg);
            color: var(--ink);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            -webkit-font-smoothing: antialiased;
            line-height: 1.5;
          }
          img, svg {
            display: block;
            max-width: 100%;
          }
          a {
            color: inherit;
            text-decoration: none;
          }
          .wrap {
            max-width: var(--maxw);
            margin: 0 auto;
            padding: 0 32px;
          }
          @media (max-width: 640px) {
            .wrap {
              padding: 0 20px;
            }
          }
        `}} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
