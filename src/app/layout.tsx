import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Radon Games",
  description:
    "An open-source unblocked games website built with simplicity in mind.",
  authors: { name: "Cohen Erickson", url: "https://cohenerickson.com" },
  keywords: [],
  referrer: "strict-origin",
  themeColor: "",
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
