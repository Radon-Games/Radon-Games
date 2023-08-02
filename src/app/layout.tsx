import "./index.css";
import themeData from "./themes";
import type { Metadata } from "next";
import NavBar from "~/components/NavBar";
import Presence from "~/components/Presence";
import ThemeLoader from "~/components/ThemeLoader";

export const metadata: Metadata = {
  title: "Radon Games",
  description:
    "An open-source unblocked games website built with simplicity in mind.",
  authors: { name: "Cohen Erickson", url: "https://cohenerickson.com" },
  keywords: [],
  referrer: "strict-origin",
  themeColor: "#f59e0b",
  colorScheme: "dark",
  icons: {
    other: {
      url: "/favicon.ico",
      type: "image/x-icon"
    }
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="default"
      className="bg-background text-text transition-colors"
    >
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: themeData
              .map(
                (x) =>
                  `html[data-theme=\"${x.name}\"] {--background: ${
                    x.background
                  };--background-secondary: ${x.backgroundSecondary};--text: ${
                    x.text
                  };--text-secondary: ${x.textSecondary};--accent: ${
                    x.accent
                  };}html[data-theme=\"${x.name}\"] ${
                    x.dark ? ".logo-light" : ".logo-dark"
                  } {display: none;}`
              )
              .join("")
              .replace(/\n|  /g, "")
          }}
        ></style>
      </head>
      <body>
        <ThemeLoader />
        <NavBar />
        <Presence>{children}</Presence>
      </body>
    </html>
  );
}
