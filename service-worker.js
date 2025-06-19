const CACHE_NAME = "servicos-lugares-v3";
const urlsToCache = [
  "/servicos-e-lugares/",
  "/servicos-e-lugares/index.html",
  "/servicos-e-lugares/profissionais.html",
  "/servicos-e-lugares/servicos.html",
  "/servicos-e-lugares/lugares.html",
  "/servicos-e-lugares/detalhe.html",
  "/servicos-e-lugares/sobre.html",
  "/servicos-e-lugares/contato.html",
  "/servicos-e-lugares/css/styles.css",
  "/servicos-e-lugares/js/main.js",
  "/servicos-e-lugares/images/favicon.ico",
  "/servicos-e-lugares/images/icon-192.png",
  "/servicos-e-lugares/images/icon-512.png",
  "/servicos-e-lugares/images/logo.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});