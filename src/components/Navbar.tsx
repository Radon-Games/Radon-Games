import NavbarButton from "./NavbarButton";

export default function Navbar () {
  return (
    <nav class="bg-gray-900 text-gray-100 flex justify-center shadow-lg h-14 z-10 relative">
      <NavbarButton href="/" icon="home">
        Home
      </NavbarButton>
      <NavbarButton href="/games" icon="gamepad-modern">
        Games
      </NavbarButton>
      <NavbarButton href="/apps" icon="command">
        Apps
      </NavbarButton>
      <NavbarButton href="/services" icon="microchip">
        Services
      </NavbarButton>
      <NavbarButton href="/settings" icon="cog">
        Settings
      </NavbarButton>
    </nav>
  );
}
