import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../build.css";

export default function Settings () {
  document.title = "Settings - Radon Games";

  return (
    <div class="bg-gray-900 text-gray-100">
      <Navbar />
      <Footer />
    </div>
  );
}
