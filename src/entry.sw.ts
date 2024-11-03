/// <reference lib="webworker" />
const sw = self as unknown as ServiceWorkerGlobalScope;

const cacheName = "offilne-v5.0.0";
const precachedAssets = ["/unity/UnityLoader.js", "/ruffle/ruffle.js"];

sw.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(precachedAssets);
    })
  );
});

sw.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  const isPrecachedRequest = precachedAssets.includes(url.pathname);

  if (isPrecachedRequest) {
    event.respondWith(
      caches.open(cacheName).then((cache) => {
        return cache.match(event.request.url);
      }) as Promise<Response>
    );
  } else {
    return;
  }
});
