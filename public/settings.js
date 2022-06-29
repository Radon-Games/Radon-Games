window.settings = getSettings();
document.getElementById("tab-cloak").value = settings["tab-cloak"] ? "true" : "false";
document.getElementById("analytics").value = settings["analytics"] ? "true" : "false";
document.getElementById("tab-cloak-text").value = settings["tab-cloak-text"];
document.getElementById("tab-cloak-icon").value = settings["tab-cloak-icon"];
document.getElementById("tab-cloak-mode").value = settings["tab-cloak-mode"];
document.getElementById("url-cloak").value = settings["url-cloak"];
