// @refresh reload
import { Routes } from "solid-start/root";
import { ErrorBoundary } from "solid-start/error-boundary";
import { Suspense } from "solid-js";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./build.css";

export default function Root() {
  return (

    <ErrorBoundary>
      <Suspense>
        <Navbar />
        <Routes />
        <Footer />
      </Suspense>
    </ErrorBoundary>

  );
}
