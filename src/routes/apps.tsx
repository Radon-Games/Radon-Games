import "../build.css";

export default function Apps () {
  document.title = "Apps - Radon Games";

  window.redirect = (url) => {
    window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
  }

  return (
    <>
      <h1 class="text-2xl text-center py-10">Apps</h1>

      <p class="text-center hover:cursor-pointer hover:underline" onclick="redirect(`https://www.google.com/`)">Google</p>
      <p class="text-center hover:cursor-pointer hover:underline" onclick="redirect(`https://geforcenow.com/`)">Geforce Now</p>
      <p class="text-center hover:cursor-pointer hover:underline" onclick="redirect(`https://discord.com/`)">Discord</p>
      <p class="text-center hover:cursor-pointer hover:underline" onclick="redirect(`https://www.youtube.com/`)">YouTube</p>
    </>
  );
}
