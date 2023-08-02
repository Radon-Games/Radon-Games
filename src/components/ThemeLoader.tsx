"use client";

import Head from "next/head";
import { useEffect, useState } from "react";

export default function Client(): JSX.Element {
  const [background, setBackground] = useState("");

  useEffect(() => {
    updateTheme();

    window.addEventListener("storage", (e: StorageEvent) => {
      if (e.key === "theme" && e.storageArea === localStorage) {
        updateTheme();
      }
    });
  }, []);

  function updateTheme() {
    const theme = localStorage.getItem("theme") || "default";
    document.documentElement.dataset.theme = theme;
    setBackground(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--background"
      )
    );
  }

  return (
    <div>
      <Head>
        <meta name="theme-color" content={background} />
      </Head>
    </div>
  );
}
