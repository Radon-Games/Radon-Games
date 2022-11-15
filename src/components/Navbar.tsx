import { JSX, createSignal } from "solid-js";

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = createSignal(false);

  function expand() {
    setIsOpen(!isOpen());
  }

  return (
    <nav>
      {/* Default menu */}
      <div class="hidden sm:flex items-center justify-between w-full p-5 sm:px-16 md:px-32 shadow-2xl">
        <div class="flex gap-5">
          <a href="/" title="Home">
            <i class="fa-regular fa-home mr-2"></i>
            Home
          </a>
          <a href="/games" title="Games">
            <i class="fa-regular fa-gamepad-modern  mr-2"></i>
            Games
          </a>
          <a href="/apps" title="App">
            <i class="fa-regular fa-home mr-2"></i>
            Apps
          </a>
        </div>
        <div class="flex gap-5">
          <a href="" title="Settings">
            <i class="fa-regular fa-gear"></i>
          </a>
          <a href="" title="Language">
            <i class="fa-regular fa-globe"></i>
          </a>
          <a href="" title="Profile">
            <i class="fa-regular fa-user"></i>
          </a>
        </div>
      </div>

      {/* Expand button */}
      <div class="flex sm:hidden items-center justify-between w-full p-5 sm:px-16 md:px-32 shadow-2xl">
        <div class="flex gap-5">
          <span onClick={expand} title="Settings">
            <i class="fa-regular fa-bars"></i>
          </span>
        </div>
      </div>

      {/* Expanded menu */}
      <div
        class={`${
          isOpen() ? "sm:fixed" : "hidden"
        } top-0 left-0 w-[90vw] shadow-2xl h-screen bg-gray-900`}
      ></div>
    </nav>
  );
}
