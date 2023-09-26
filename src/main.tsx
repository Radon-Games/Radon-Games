import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import "./index.css";
import { NotFound } from "./routes/404";
import { Game } from "./routes/game";
import { Games } from "./routes/games";
import { Home } from "./routes/index";
import { Login } from "./routes/login";
import { Preferences } from "./routes/preferences";
import { Privacy } from "./routes/privacy";
import { Profile } from "./routes/profile";
import { Register } from "./routes/register";
import { Reset } from "./routes/reset";
import { Search } from "./routes/search";
import { Shop } from "./routes/shop";
import { Tag } from "./routes/tag";
import { User } from "./routes/user";
import { getStyle } from "./util/theme";
import { AnimatePresence } from "framer-motion";
import { render } from "preact";
import { Router, Route } from "preact-router";

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
        <Route path="/preferences" component={Preferences} />
        <Route path="/privacy" component={Privacy} />

        {/* User System */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/reset" component={Reset} />
        <Route path="/profile" component={Profile} />
        <Route path="/user/:username" component={User} />
        <Route path="/shop" component={Shop} />

        {/* 404 */}
        <Route default component={NotFound}></Route>
      </Router>
    </AnimatePresence>
    <Footer />
  </>,
  document.getElementById("root")!
);
