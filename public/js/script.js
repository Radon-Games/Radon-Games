// settings
let settings = JSON.parse(window.localStorage.getItem("settings")) || {
  tabAutoHide: false,
  tabAutoHideIconURL: "https://google.com/favicon.ico",
  tabAutoHideTitle: "Google"
};

// Tab Visiblilty
document.addEventListener("visibilitychange", function () {
  if(settings.tabAutoHide) {
    let icon = document.getElementById("icon");
    if (document.hidden) {
      icon.href = settings.tabAutoHideIconURL;
      document.title = settings.tabAutoHideTitle;
    } else {
      icon.href = "https://cdn.glitch.global/7a7ecda1-7fea-4235-b2da-81abaec6b102/logo-512.png";
      document.title = "Radon Games";
    }
  }
});

window.localStorage.setItem("settings", JSON.stringify(settings));