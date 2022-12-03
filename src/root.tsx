// @refresh reload
import { Suspense } from "solid-js";
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
  return (
    <Html lang="en">
      <Head>
        <SEO />

        <script src="/uv/uv.bundle.js" defer></script>
        <script src="/uv/uv.config.js" defer></script>
        <script src="/index.js" defer></script>
        <script src="/pro.fontawesome.js" defer></script>
        <script src="/ruffle/ruffle.js" defer></script>
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
