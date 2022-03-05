if(!window.sessionStorage.getItem("discord")) {
  document.getElementById("discord-popup").classList.remove("hidden");

  document.getElementById("discord-popup").addEventListener("click", () => {
    document.getElementById("discord-popup").classList.add("hidden");
  });

  setTimeout(() => {
    document.getElementById("discord-popup").classList.add("hidden");
  }, 60000);

  window.sessionStorage.setItem("discord", "true");
}