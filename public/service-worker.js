// Устанавливаем сервис-воркер
self.addEventListener("install", function(event) {
  console.log("Service Worker installed")
})

// Активируем сервис-воркер
self.addEventListener("activate", function(event) {
  console.log("Service Worker activated")
})

// Обрабатываем событие fetch
self.addEventListener("fetch", function(event) {
  // console.log("Fetching:", event.request.url)
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Если ресурс найден в кэше, возвращаем его
      if (response) {
        return response
      }
      // Иначе запрашиваем ресурс с сервера
      return fetch(event.request)
    })
  )
})
