import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../build.css";

export default function Apps () {
  let settings = getSettings();
  if (!settings["tab-cloak"] || settings["tab-cloak-mode"] !== "always") {
    window.title = "Apps - Radon Games";
    document.title = window.title;
  }

  window.redirect = (url) => {
    window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
  }

  return (
    <div class="bg-gray-900 text-gray-100">
      <Navbar />
      <h1 class="text-2xl text-center py-10">Apps</h1>

      <p class="text-center hover:cursor-pointer hover:underline" onclick={ () => redirect("https://www.google.com/") }>Google</p>
      <p class="text-center hover:cursor-pointer hover:underline" onclick={ () => redirect("https://geforcenow.com/") }>Geforce Now</p>
      <p class="text-center hover:cursor-pointer hover:underline" onclick={ () => redirect("https://discord.com/") }>Discord</p>
      <p class="text-center hover:cursor-pointer hover:underline" onclick={ () => redirect("https://www.youtube.com/") }>YouTube</p>
      <Footer />
    </div>
  );
}
