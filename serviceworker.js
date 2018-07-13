self.addEventListener('install', function(event) {
    // Perform some task
    console.log('service worker start');
});

var filesToCache = [
  '.',
  'css/styles.css',
  'css/grid.css',
  'css/styles.css',
  'data/restaurants.json',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg',
  'js/dbhelper.js',
  'js/main.js',
  'js/restaurant_info.js',
  'index.html',
  'restaurant.html',
];

var staticCacheName = 'pages-cache-v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName)
    .then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request)
      .then(function(response) {

      return caches.open(staticCacheName).then(function(cache) {
        cache.put(event.request.url, response.clone());
        return response;
      });
    });

    }).catch(function(error) {
      console.log("error");
    })
  );
});