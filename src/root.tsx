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

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Radon Games</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="/pro.fontawesome.js" defer></script>
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
