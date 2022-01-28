// settings
let settings = JSON.parse(window.localStorage.getItem("settings")) || {
  tabAutoHide: false,
  tabAutoHideProfile: "google",
  searchColors: false
};

// tab visibility profiles
const visibilityProfiles = {
  google: {
    url: "https://www.google.com/favicon.ico",
    title: "Google"
  },
  googleDrive: {
    url: "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png",
    title: "Google Drive"
  },
  gmail: {
    url: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico",
    title: "Gmail"
  },
  khanAcademy: {
    url: "https://www.khanacademy.org/favicon.ico",
    title: "Khan Academy"
  },
  googleClassroom: {
    url: "https://ssl.gstatic.com/classroom/favicon.png",
    title: "Google Classroom"
  },
  edpuzzle: {
    url: "https://ssl.gstatic.com/classroom/favicon.png",
    title: "Edpuzzle"
  },
  quizlet: {
    url: "https://assets.quizlet.com/a/j/dist/app/i/logo/2021/q-twilight.389092a385cb51d.png",
    title: "Quizlet"
  }
}

// Tab Visiblilty
document.addEventListener("visibilitychange", function () {
  if(settings.tabAutoHide) {
    let icon = document.getElementById("icon");
    if (document.hidden) {
      icon.href = visibilityProfiles[settings.tabAutoHideProfile].url;
      document.title = visibilityProfiles[settings.tabAutoHideProfile].title;
    } else {
      icon.href = "img/logo-512.png";
      document.title = "Radon Games";
    }
  }
});

window.localStorage.setItem("settings", JSON.stringify(settings));