import {
  LiveReload,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import { ExternalScripts } from "remix-utils/external-scripts";

export default function App() {
  return (
    <>
      <a href="/">Home</a>
      <Outlet />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
      <ExternalScripts />
    </>
  );
}
