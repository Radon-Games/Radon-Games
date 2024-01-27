import { pageview } from "./util/gtag";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import type { HeadersFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation
} from "@remix-run/react";
import { useEffect } from "react";
import stylesheet from "~/tailwind.css";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: stylesheet }
];

export const headers: HeadersFunction = () => ({
  "X-Frame-Options": "SAMEORIGIN"
});

export default function App() {
  const location = useLocation();

  useEffect(() => {
    pageview(location.pathname);
  }, [location]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="google-adsense-account"
          content="ca-pub-8517735295733237"
        ></meta>

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/128.png" />

        <meta name="theme-color" content="#f59e0b" />

        <meta
          name="keywords"
          content="radon,games,radon games,unblocked,unblocked games,html games,html5 games,flash games,flashplayer games,proxy,io"
        />

        <Meta />
        <Links />

        {/* BUG: This breaks hydration */}
        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8517735295733237"
          crossOrigin="anonymous"
        ></script> */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-0GR0HN1RFL"
        />
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag("js", new Date());

              gtag("config", "G-0GR0HN1RFL", {
                page_path: window.location.pathname,
              });
            `
          }}
        />
      </head>
      <body className="scroll-smooth bg-bg-primary text-text-primary">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
