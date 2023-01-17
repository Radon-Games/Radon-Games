// @refresh reload
import { Suspense, onMount } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title
} from "solid-start";
import "./root.css";

import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import SEO from "~/components/SEO";

export default function Root() {
  onMount(async () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js", {
        scope: "/~uv/"
      });
    }
    await import("~/scripts/options");
  });

  return (
    <Html lang="en">
      <Head>
        <SEO />

        <script src="/cdn/js/uv/bundle.js" defer></script>
        <script src="/cdn/js/uv/config.js" defer></script>
        <script src="/cdn/js/pro.fontawesome.js" defer></script>
        <script src="/cdn/ruffle/ruffle.js" defer></script>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4519303437636969"
          crossorigin="anonymous"
        ></script>
      </Head>
      <Body
        class="bg-gray-900 text-gray-100 scroll-smooth"
        style="overflow: overlay;"
      >
        <Navbar />
        <Suspense>
          <ErrorBoundary>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Footer />
        <Scripts />
      </Body>
    </Html>
  );
}
