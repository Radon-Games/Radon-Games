// @refresh reload
import { Suspense, onMount } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Routes,
  Scripts
} from "solid-start";
import "./root.css";

import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import SEO from "~/components/SEO";

export default function Root() {
  onMount(async () => {
    await import("~/scripts/registerSw");
    await import("~/scripts/options");
  });

  return (
    <Html lang="en">
      <Head>
        <SEO />

        <script src="/uv/uv.bundle.js" defer></script>
        <script src="/uv/uv.config.js" defer></script>
        <script src="/cdn/js/pro.fontawesome.js" defer></script>
        <script src="/cdn/ruffle/ruffle.js" defer></script>

        {/* Google Services */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-0GR0HN1RFL"
        ></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-0GR0HN1RFL');
          `}
        </script>
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
