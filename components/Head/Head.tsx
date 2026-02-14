import NextHead from "next/head";
import Script from "next/script";
import React from "react";

const description = `🌳 Vamsa Vruksham is a digital record of Vasudaiva Kutumbakam of Konkani speaking Gaud Saraswat Brahmin's.`;

export const PageHead = () => (
  <>
    <NextHead>
      <title>Vamsa Vruksham</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Vamsa Vruksham" />
      <meta property="og:image" content="/share.jpg" />
      <link rel="manifest" href="/manifest.webmanifest" />
      <link rel="apple-touch-icon" href="/favicon_io/apple-touch-icon.png" />
    </NextHead>
    {process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && <GoogleAnalytics />}
  </>
);

const GoogleAnalytics = () => (
  <>
    <Script
      strategy="lazyOnload"
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
    />
    <Script id="ga" strategy="lazyOnload">
      {`
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());

     gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
   `}
    </Script>
  </>
);
