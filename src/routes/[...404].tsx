import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../build.css";

export default function NotFound() {
  document.title = "404 Not Found - Radon Games";

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
