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
  Title,
} from "solid-start";
import "./root.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <script async src="https://arc.io/widget.min.js#b6y3tJMs"></script>

        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1"/>
        <Meta name="theme-color" content="#f59e0b"/>

        <Title>Radon Games</Title>
        <Meta property="og:title" content="Radon Games" />

        <link rel="icon" href="/favicon.ico" />
        <Meta property="og:image" content="/128.png"/>
        <link rel="apple-touch-icon" href="/128.png"/>

        <Meta name="robots" content="index, follow"/>
        <Meta name="revisit-after" content="7 days"/>

        <Meta name="description" content="An open-source unblocked games website built with simplicity in mind."/>
        <Meta property="og:description" content="An open-source unblocked games website built with simplicity in mind."/>
        <Meta name="keywords" content="radon,games,radon games,unblocked,unblocked games,html games,html5 games,flash games,flashplayer games,proxy,io"/>

        <script src="/uv/uv.bundle.js" defer></script>
        <script src="/uv/uv.config.js" defer></script>
        <script src="/index.js" defer></script>
        <script src="/pro.fontawesome.js" defer></script>
        <script src="/ruffle/ruffle.js" defer></script>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4519303437636969"
          crossorigin="anonymous"></script>
      </Head>
      <Body class="bg-gray-900">
        <Suspense>
          {/* <ErrorBoundary> */}
            <Navbar />
            <Routes>
              <FileRoutes />
            </Routes>
            <Footer />
          {/* </ErrorBoundary> */}
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
