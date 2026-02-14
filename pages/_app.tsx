import Layout from "@/components/Layout/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    const buildId = (window as Window & { __NEXT_DATA__?: { buildId?: string } }).__NEXT_DATA__?.buildId ?? "unknown";
    navigator.serviceWorker.register(`/sw.js?buildId=${encodeURIComponent(buildId)}`).catch(() => {
      // Ignore registration failures to avoid blocking app rendering.
    });
  }, []);

  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </>
  );
};

export default MyApp;
