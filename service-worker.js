
self.addEventListener('install', событие => {
  событие.waitUntil(
    кэши.open('finance-cache').then(cache => {
      возврат кэша.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/main.js',
        '/manifest.json'
      ]);
    })
  );
});
self.addEventListener('fetch', event => {
  событие.respondWith(
    кэши.соответствие(событие.запрос).затем(ответ => ответ || выборка(событие.запрос))
  );
});
