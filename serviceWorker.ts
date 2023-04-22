export const staticCacheName = "static-site-v1";
export const dynamicCacheName = "dynamic-site-v1";

const ASSETS = [
  "/",
  "/index.html",
  "/src/main.tsx",
  "/src/App.tsx",
  "/src/pages/Login",
  "/src/pages/NotFound",
  "/src/containers/Header",
  "/src/containers/TableView",
  "/src/containers/CardsView",
];

self.addEventListener("install", async (event) => {
  console.log("Service Worker has been installed");
  const cache = await caches.open(staticCacheName);
  await cache.addAll(ASSETS);
});

self.addEventListener("activate", async (event) => {
  const cachesKeysArr = await caches.keys();
  await Promise.all(
    cachesKeysArr
      .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
      .map((key) => caches.delete(key))
  );
});

self.addEventListener("fetch", (event: any) => {
  event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request: any) {
  const cached = await caches.match(request);

  try {
    return (
      cached ??
      (await fetch(request).then((response) => {
        return networkFirst(request);
      }))
    );
  } catch (e) {
    console.log("error", e);
    return networkFirst(request);
  }
}

async function networkFirst(request: any) {
  const cache = await caches.open(dynamicCacheName);
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());
    return response;
  } catch (e) {
    const cached = await cache.match(request);
    return cached ?? (await caches.match("/src/pages/NotFound.jsx"));
  }
}
