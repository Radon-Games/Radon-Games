import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../build.css";

export default function NotFound() {
  if ("getSettings" in window) {
    let settings = getSettings();
    if (!settings["tab-cloak"] || settings["tab-cloak-mode"] !== "always") {
      window.title = "404 - Radon Games";
      document.title = window.title;
    }
  }

  return (
    <div class="bg-gray-900 text-gray-100">
      <Navbar />
      <main class="py-40 dots w-full">
        <div class="block mx-auto bg-gray-900 max-w-2xl p-5">
          <h1 class="text-center text-4xl">404 - Page Not Found</h1>
          <p class="text-center p-5">Return <a class="underline" href="/">home</a>.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
