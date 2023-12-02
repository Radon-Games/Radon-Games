import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import "./index.css";
import { NotFound } from "./routes/404";
// import { Activate } from "./routes/activate";
import { Game } from "./routes/game";
import { Games } from "./routes/games";
import { Home } from "./routes/index";
// import { Login } from "./routes/login";
import { Preferences } from "./routes/preferences";
import { Privacy } from "./routes/privacy";
import { Proxy } from "./routes/proxy";
// import { Profile } from "./routes/profile";
import { Search } from "./routes/search";
// import { Shop } from "./routes/shop";
import { Tag } from "./routes/tag";
import { Terms } from "./routes/terms";
// import { User } from "./routes/user";
import { getStyle } from "./util/theme";
import { AnimatePresence } from "framer-motion";
import { render } from "preact";
import { Router, Route } from "preact-router";

const title = localStorage.getItem("title")?.trim() || "Radon Games";
document.title = title;
const icon = localStorage.getItem("icon")?.trim() || "/favicon.ico";
document.querySelector('link[rel="icon"]')!.setAttribute("href", icon);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/uv/sw.js", {
    scope: "/uv/"
  });
}

render(
  <>
    <style dangerouslySetInnerHTML={{ __html: getStyle() }}></style>
    <Header />
    <AnimatePresence>
      <Router>
        {/* Basic routes */}
        <Route path="/" component={Home} />
        <Route path="/game/:id" component={Game} />
        <Route path="/tag/:id" component={Tag} />
        <Route path="/games" component={Games} />
        <Route path="/search" component={Search} />
        <Route path="/proxy" component={Proxy} />
        <Route path="/preferences" component={Preferences} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />

        {/* User System */}
        {/* <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/activate" component={Activate} />
        <Route path="/reset" component={Reset} />
        <Route path="/profile" component={Profile} />
        <Route path="/user/:username" component={User} />
        <Route path="/shop" component={Shop} /> */}

        {/* 404 */}
        <Route default component={NotFound}></Route>
      </Router>
    </AnimatePresence>
    <Footer />
  </>,
  document.getElementById("root")!
);
