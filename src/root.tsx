import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { getProfileFromToken } from "./util/auth";
import { pageview } from "./util/gtag";
import { cssBundleHref } from "@remix-run/css-bundle";
import type {
  HeadersFunction,
  LinksFunction,
  LoaderFunctionArgs
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
  useLocation
} from "@remix-run/react";
import { parse } from "cookie";
import { useEffect } from "react";
import { ExternalScripts } from "remix-utils/external-scripts";
import "~/tailwind.css";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : [])
];

export const headers: HeadersFunction = () => ({
  "X-Frame-Options": "SAMEORIGIN"
});

export async function loader({ request }: LoaderFunctionArgs) {
  const profile = await getProfileFromToken(
    parse(request.headers.get("Cookie") ?? "").token ?? "",
    {
      favorites: {
        include: {
          tags: true
        }
      }
    }
  );

  return json({
    env: {
      GTAG: process.env.GTAG!,
      ADSENSE: process.env.ADSENSE!
    },
    profile
  });
}

declare global {
  interface Window {
    __profile: ReturnType<typeof useLoaderData<typeof loader>>["profile"];
  }
}

export default function App() {
  const location = useLocation();
  const { env, profile } = useLoaderData<typeof loader>();
  const { pathname } = useLocation();

  useEffect(() => {
    window.__profile = profile;
    pageview(location.pathname, env.GTAG);
  }, [location]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-adsense-account" content={env.ADSENSE}></meta>

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/128.png" />

        <meta name="theme-color" content="#f59e0b" />
        <link rel="manifest" href="/manifest.json" />

        <meta
          name="keywords"
          content="radon,games,radon games,unblocked,unblocked games,html games,html5 games,flash games,flashplayer games,proxy,io"
        />

        <Meta />
        <Links />

        {/* BUG: This breaks hydration */}
        {/* <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${env.ADSENSE}`}
          crossOrigin="anonymous"
        ></script> */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${env.GTAG}`}
        />
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag("js", new Date());

              gtag("config", "${env.GTAG}", {
                page_path: window.location.pathname,
              });
            `
          }}
        />
      </head>
      <body className="scroll-smooth bg-bg-primary font-medium text-text-primary">
        {!pathname.startsWith("/iframe") && <Header />}
        <Outlet />
        {!pathname.startsWith("/iframe") && <Footer />}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <ExternalScripts />
      </body>
    </html>
  );
}
