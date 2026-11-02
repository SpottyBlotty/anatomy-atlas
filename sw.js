var V = "atlas-f7bcd52812";
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) { e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== V; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); })); });
self.addEventListener("fetch", function (e) {
  var r = e.request; if (r.method !== "GET") return;
  var u = new URL(r.url);
  if (u.origin === location.origin && (u.pathname.indexOf("/data/") >= 0 || u.pathname.indexOf("/lib/") >= 0)) {
    e.respondWith(caches.open(V).then(function (c) { return c.match(r).then(function (m) { return m || fetch(r).then(function (x) { if (x.ok) c.put(r, x.clone()); return x; }); }); }));
  } else if (u.hostname === "cdnjs.cloudflare.com") {
    e.respondWith(caches.open(V).then(function (c) { return c.match(r).then(function (m) { return m || fetch(r).then(function (x) { if (x.ok) c.put(r, x.clone()); return x; }); }); }));
  }
});
