/* console.log('Hello from service-worker.js');
importScripts('https://cdn.bootcdn.net/ajax/libs/workbox-sw/5.1.3/workbox-sw.min.js')

if(workbox){
  console.log(`Yay! Workbox is loaded 🎉`)
}else{
  console.log(`Boo! Workbox didn't load 😬`)
} */
self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open('v1').then(function(cache){
      return cache.addAll([
        '/src/',
        '/public/',
        '/src/main.js',
        '/src/App.vue',
        '/src/utils/index.js',
      ])
    })
  )
})

self.addEventListener('fetch', function(event){
  // console.log(event)
  event.respondWith(caches.match(event.request).then(function(response){
    if(response != void 0){
      return response
    } else {
       return fetch(event.request).then(function(response){
         let responseClone = response.clone()
         caches.open('v1').then(function(cache){
           cache.put(event.request, responseClone)
         })
         return response
       }).catch(function(err){
           return caches.match('/sw-test/gallery/myLittleVader.jpg')
       })
    }
  }))
})
