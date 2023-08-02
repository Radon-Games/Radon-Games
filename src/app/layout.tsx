import "./index.css";
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
      <body>
        <ThemeLoader />
        <NavBar />
        <Presence>{children}</Presence>
      </body>
    </html>
  );
}
