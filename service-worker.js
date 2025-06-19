 const CACHE_NAME = "servicos-lugares-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/profissionais.html",
  "/servicos.html",
  "/lugares.html",
  "/detalhe.html",
  "/sobre.html",
  "/contato.html",
  "/css/styles.css",
  "/js/main.js"
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
      return response || fetch(event.request);
    })
  );
});