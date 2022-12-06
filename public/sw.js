/*global UVServiceWorker*/
importScripts("/cdn/js/uv/bundle.js");
importScripts("/cdn/js/uv/config.js");
importScripts("/cdn/js/uv/sw.js");

const sw = new UVServiceWorker();

self.addEventListener("fetch", (event) => event.respondWith(sw.fetch(event)));
