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
import SEO from "~/components/SEO";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <SEO />
      </Head>
      <Body class="bg-gray-900 text-gray-100 scroll-smooth">
        <Navbar />
        <Suspense>
          <ErrorBoundary>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
