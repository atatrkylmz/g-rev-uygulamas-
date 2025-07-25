self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("protask-cache").then(cache => {
      return cache.addAll(["index.html", "calendar.html", "stats.html", "styles.css", "app.js"]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});
