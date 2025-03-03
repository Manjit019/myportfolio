const CACHE_NAME = "portfolio-cache-v1";

const urlToCache = [
    "/",
    "/index.html",
    "/style.css",
    "/app.js",
    "/Icons/icon-192x192.png",
    "/Icons/icon-512x512.png",
    "/Images/profile.jpg",
    "favicon.ico",
    "menifest.json",
];

self.addEventListener("install", (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(urlToCache);
    })
    );
    self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(cacheNames.map((cache) => {
                if (cache !== CACHE_NAME) {
                    return caches.delete(cache);
                }
            }));
        })
    )
})