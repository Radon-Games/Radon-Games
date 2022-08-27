import UpdateTab from "../Tab";
import { onMount } from "solid-js";

export const defaultSettings = {
  "tab-cloak": false,
  "tab-cloak-text": "Google",
  "tab-cloak-icon": "https://google.com/favicon.ico",
  "analytics": true,
  "tab-cloak-mode": "hidden",
  "url-cloak": "disabled",
};

export default function Settings () {
  onMount(() => {
    UpdateTab();
    let settings;
    try {
      settings = JSON.parse(localStorage.getItem("settings")) || defaultSettings;
    } catch {
      settings = defaultSettings;
    }
    (document.getElementById("tab-cloak") as HTMLInputElement).value = settings["tab-cloak"];
    (document.getElementById("analytics") as HTMLInputElement).value = settings["analytics"];
    (document.getElementById("tab-cloak-text") as HTMLInputElement).value = settings["tab-cloak-text"];
    (document.getElementById("tab-cloak-icon") as HTMLInputElement).value = settings["tab-cloak-icon"];
    (document.getElementById("tab-cloak-mode") as HTMLInputElement).value = settings["tab-cloak-mode"];
    (document.getElementById("url-cloak") as HTMLInputElement).value = settings["url-cloak"];
  });

  function save () {
    let settings;
    try {
      settings = JSON.parse(localStorage.getItem("settings")) || {};
    } catch {
      settings = {};
    }
    settings["tab-cloak"] = ((document.getElementById("tab-cloak") as HTMLInputElement).value.toLowerCase() === "true");
    settings["analytics"] = ((document.getElementById("analytics") as HTMLInputElement).value.toLowerCase() === "true");
    settings["tab-cloak-text"] = (document.getElementById("tab-cloak-text") as HTMLInputElement).value;
    settings["tab-cloak-icon"] = (document.getElementById("tab-cloak-icon") as HTMLInputElement).value;
    settings["tab-cloak-mode"] = (document.getElementById("tab-cloak-mode") as HTMLInputElement).value;
    settings["url-cloak"] = (document.getElementById("url-cloak") as HTMLInputElement).value;
    localStorage.setItem("settings", JSON.stringify(settings));
    location.reload();
  }

  return (
    <div class="bg-gray-900 text-gray-100">
      <h1 class="text-2xl p-10 text-center">Settings</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 px-5 sm:px-30 md:px-64">
        <div>
          <h2 class="text-xl py-2">Tab Cloak</h2>
          <select onchange={ save } id="tab-cloak" class="bg-gray-900 w-full p-2 rounded-md border-solid border-2 border-gray-800 focus:outline-none">
            <option value="true">Enabled</option>
            <option value="false">Disabled</option>
          </select>
        </div>
        <div>
          <h2 class="text-xl py-2">Analytics Tracking</h2>
          <select onchange={ save } id="analytics" class="bg-gray-900 w-full p-2 rounded-md border-solid border-2 border-gray-800 focus:outline-none">
            <option value="true">Enabled</option>
            <option value="false">Disabled</option>
          </select>
        </div>
        <div>
          <h2 class="text-xl py-2">Tab Cloak Text</h2>
          <input onchange={ save } id="tab-cloak-text" class="bg-gray-900 w-full p-2 rounded-md border-solid border-2 border-gray-800 focus:outline-none"></input>
        </div>
        <div>
          <h2 class="text-xl py-2">Tab Cloak Icon</h2>
          <input onchange={ save } id="tab-cloak-icon" class="bg-gray-900 w-full p-2 rounded-md border-solid border-2 border-gray-800 focus:outline-none"></input>
        </div>
        <div>
          <h2 class="text-xl py-2">Tab Cloak Mode</h2>
          <select onchange={ save } id="tab-cloak-mode" class="bg-gray-900 w-full p-2 rounded-md border-solid border-2 border-gray-800 focus:outline-none">
            <option value="hidden">On Tab Hide</option>
            <option value="always">Always On</option>
          </select>
        </div>
        <div>
          <h2 class="text-xl py-2">URL Cloaking</h2>
          <select onchange={ save } id="url-cloak" class="bg-gray-900 w-full p-2 rounded-md border-solid border-2 border-gray-800 focus:outline-none">
            <option value="disabled">Disabled</option>
            <option value="blank">About Blank</option>
            <option value="data">Data URL</option>
            <option value="blob">Blob URL</option>
          </select>
        </div>
      </div>
    </div>
  );
}
