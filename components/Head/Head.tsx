import NextHead from "next/head";
import Script from "next/script";
import React from "react";

const description = `Dhani is an open group project to restore genealogical connections and collect information about the origins of the Karkala Konkani family and their relationship with other families`;

export const PageHead = () => (
  <>
    <NextHead>
      <title>Dhani-Tree</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
      <meta property="og:image" content="/share.jpg" />
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
