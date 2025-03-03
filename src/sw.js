/*globals articleHandler importScripts workbox*/
importScripts(`js/workbox-sw.js`);

if (workbox) {
  console.log(`Loaded Workbox v6 service worker library`);
  try {
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
  } catch (error) {
    console.warn("An error occurred while precaching and routing:", error);
  }
  workbox.routing.registerRoute(/(.*)article(.*)\.html/, (args) => {
    const notFound = 404;
    return articleHandler.handle(args).then((response) => {
      if (!response) return caches.match(`offline.html`);
      if (response.status === notFound) return caches.match(`404.html`);
      return response;
    });
  });
} else {
  console.warn(`Failed to load Workbox service worker library`);
}
