
// Server component layout: keep head/meta and mount client providers inside body
// import { Public_Sans } from "next/font/google";
// export const publicSans = Public_Sans({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
//   display: 'swap',
//   preload: true
// });
import "./global.css"; 
import "overlayscrollbars/overlayscrollbars.css";


// Client providers wrapper
import ClientProviders from "components/ClientProviders";


export default function RootLayout({
  children,
  modal
}) {
  return <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/images/small-screen-logo.png" type="image/png" sizes="any" />
        <link rel="icon" href="/assets/images/small-screen-logo.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/assets/images/small-screen-logo.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/assets/images/small-screen-logo.png" />
        <link rel="manifest" href="/assets/images/favicon/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="QADEEM - Tools, parts and supplies with fast delivery." />
        <meta property="og:title" content="QADEEM" />
        <meta property="og:description" content="Explore top products, tools and parts at QADEEM." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/images/logo.jpeg" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="robots" href="/robots.txt" />
        {/* Resource hints for faster connections to image CDN and fonts */}
        <link rel="preconnect" href="https://qadeem.s3.eu-west-2.amazonaws.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//qadeem.s3.eu-west-2.amazonaws.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Alice&display=swap" rel="stylesheet" />
        {/* Optional: Preload a known critical CSS chunk */}
        {/* <link rel="preload" as="style" href="/_next/static/css/ef8edee74f693473.css" /> */}
        {/* <title>SIFRA</title> */}
      </head>
    <body id="body" className="font-sans">
      <ClientProviders modal={modal}>{children}</ClientProviders>
      {/* <GoogleAnalytics gaId="G-XKPD36JXY0" /> */}
    </body>
  </html>;
}