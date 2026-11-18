// Guarda los archivos en el movil para que funcione sin internet.
// Si cambias algun archivo del juego, sube el numero de VERSION para que los moviles se actualicen.
const VERSION = "vr-mahjong-v3";
const FILES = ["./", "index.html", "style.css", "script.js", "manifest.json", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => (k.startsWith("vr-mahjong-") || k === "mahjong-v1") && k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// Abre al instante lo guardado y, si hay internet, actualiza la copia para la proxima vez
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request).then(cached => {
    const net = fetch(e.request).then(r => { if (r.ok) caches.open(VERSION).then(c => c.put(e.request, r.clone())); return r; }).catch(() => cached);
    return cached || net;
  }));
});
