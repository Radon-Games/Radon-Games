import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import "./index.css";
import { NotFound } from "./routes/404";
import { Game } from "./routes/game";
import { Games } from "./routes/games";
import { Home } from "./routes/index";
import { Preferences } from "./routes/preferences";
import { Privacy } from "./routes/privacy";
import { Proxy } from "./routes/proxy";
import { Search } from "./routes/search";
import { Tag } from "./routes/tag";
import { Terms } from "./routes/terms";
import { getStyle } from "./util/theme";
//@ts-ignore
import { BareMuxConnection } from "@mercuryworkshop/bare-mux";
import { AnimatePresence } from "framer-motion";
import { render } from "preact";
import { Router, Route } from "preact-router";

declare global {
  interface Window {
    Connection: BareMuxConnection;
    scram: {
      init: () => Promise<ServiceWorkerRegistration>;
      // fix
      createFrame: (frame?: HTMLIFrameElement) => void;
      encodeUrl: (url: string | URL) => string;
      decodeUrl: (url: string | URL) => string;
      saveConfig: () => void;
      //fix
      modifyConfig: () => void;
    };
  }
}

const title = localStorage.getItem("title")?.trim() || "Radon Games";
document.title = title;
const icon = localStorage.getItem("icon")?.trim() || "/favicon.ico";
document.querySelector('link[rel="icon"]')!.setAttribute("href", icon);

if ("serviceWorker" in navigator) {
  if (window.scram) {
    navigator.serviceWorker
      .register("/sw.js", {
        scope: "/"
      })
      .then(() => {
        console.log(`Registered SW`);
      });
    navigator.serviceWorker.ready.then(() => {
      const connection = new BareMuxConnection("/baremux/worker.js");
      window.Connection = connection;

      connection.setTransport("/libcurl/index.mjs", [
        {
          wisp:
            location.protocol === "http:"
              ? `ws://${location.host}/w/`
              : `wss://${location.host}/w/`
        }
      ]);
      console.log(`Set transport to epoxy`);
    });
  }
}

render(
  <>
    <style dangerouslySetInnerHTML={{ __html: getStyle() }}></style>

    <Router>
      <Route path="/proxy" component={Proxy} />
      <Route
        path="/:*?"
        component={() => (
          <>
            <Header />
            <AnimatePresence>
              <Router>
                <Route path="/" component={Home} />
                <Route path="/game/:id" component={Game} />
                <Route path="/tag/:id" component={Tag} />
                <Route path="/games" component={Games} />
                <Route path="/search" component={Search} />
                <Route path="/preferences" component={Preferences} />
                <Route path="/privacy" component={Privacy} />
                <Route path="/terms" component={Terms} />
                <Route default component={NotFound}></Route>
              </Router>
            </AnimatePresence>
            <Footer />
          </>
        )}
      />
    </Router>
  </>,
  document.getElementById("root")!
);
