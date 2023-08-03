"use client";

import { useEffect } from "react";
import { getObjectURL } from "~/util/bareClient";

let title = "Radon Games";
const icon = "/favicon.ico";

let cloakBlob = "";

export async function updateCloak() {
  document.title = localStorage.getItem("cloakTitle") || title;
  const cloakIcon = localStorage.getItem("cloakIcon");
  const link = document.querySelector<HTMLLinkElement>("link[rel=icon]")!;
  if (cloakIcon && link) {
    try {
      new URL(cloakIcon || "");
    } catch {
      return;
    }
    URL.revokeObjectURL(link.href);
    cloakBlob = await getObjectURL(cloakIcon);
    link.href = cloakBlob;
  } else if (link) {
    link.href = icon;
  }
}

export function reloadCloak() {
  if (localStorage.getItem("cloakTitle")) {
    document.title = localStorage.getItem("cloakTitle") || title;
  } else {
    title = document.title;
  }
  const link = document.querySelector<HTMLLinkElement>("link[rel=icon]");
  if (cloakBlob && localStorage.getItem("cloakIcon") && link) {
    link.href = cloakBlob;
  } else if (link) {
    link.href = icon;
  }
}

export default function CloakLoader(): JSX.Element {
  useEffect(() => {
    title = document.title;

    updateCloak();

    window.addEventListener("storage", (e: StorageEvent) => {
      if (
        (e.key === "cloakTitle" || e.key === "cloakIcon") &&
        e.storageArea === localStorage
      ) {
        updateCloak();
      }
    });
  }, []);

  return <></>;
}
