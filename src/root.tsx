// @refresh reload
import { Routes } from "solid-start/root";
import { ErrorBoundary } from "solid-start/error-boundary";
import { Suspense } from "solid-js";

import "./build.css";

export default function Root() {
  return (

    <ErrorBoundary>
      <Suspense>
        <Routes />
      </Suspense>
    </ErrorBoundary>

  );
}
