importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

workbox.setConfig({ debug: false });
const { registerRoute } = workbox.routing;
const { clientsClaim, skipWaiting } = workbox.core;
const { CacheFirst } = workbox.strategies;
const { CacheableResponsePlugin } = workbox.cacheableResponse;
const { RangeRequestsPlugin } = workbox.rangeRequests;
const { matchPrecache } = workbox.precaching;

skipWaiting();
clientsClaim();

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
  }),
);

registerRoute(
  ({ url }) => url.pathname.endsWith('.mp4'),
  new CacheFirst({
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      new RangeRequestsPlugin(),
    ],
  }),
);

self.addEventListener('fetch', (event) => {
  if (event.request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request.url).catch(() => matchPrecache('/offline.html')),
    );
  }
});

workbox.precaching.precacheAndRoute([{"revision":"1d0c02071ad98e71161e695663629e86","url":"assets/favicons/favicon.ico"},{"revision":"025bbab6ff251f5b28b55ec170e4593f","url":"assets/favicons/safari-pinned-tab.svg"},{"revision":"685a574cb7b4b1eb749fd5327422a9fb","url":"assets/favicons/site.webmanifest"},{"revision":"3847741d8192a06fedbe857036f7904b","url":"assets/main.3a07af46.css"},{"revision":"78e84e2bc9cecb7a18dcd3acfd802fc2","url":"assets/main.3a07af46.js"},{"revision":"0193bb0bbef709e9ff509980baf9272d","url":"assets/Roboto-Bold.0193bb0b.ttf"},{"revision":"026397ae5a259275e4215c4b11f24578","url":"assets/Roboto-Bold.026397ae.woff2"},{"revision":"c14cca482951aae4890212f1503834be","url":"assets/Roboto-Bold.c14cca48.woff"},{"revision":"79c3e21e039178626df0a4857bdcf3ac","url":"assets/Roboto-Medium.79c3e21e.woff2"},{"revision":"9dda4e591e6d4bce5d4a8e2a195dca07","url":"assets/Roboto-Medium.9dda4e59.ttf"},{"revision":"cd7c471f15fd9b53d3a8d19cead9cfb4","url":"assets/Roboto-Medium.cd7c471f.woff"},{"revision":"213253878e6723aeb817b6fb4923ebef","url":"assets/Roboto.21325387.woff"},{"revision":"66a81648168226855d5840fe5fde7034","url":"assets/Roboto.66a81648.ttf"},{"revision":"888337f262294b55c52bbb2013721b52","url":"assets/Roboto.888337f2.woff2"},{"revision":"b632a8665c9507ad3ba0cfa443753276","url":"assets/vendors~main.148de527.chunk.js"},{"revision":"f973776324ec8e4de4cb721e266becc2","url":"assets/vendors~main.148de527.css"},{"revision":"5c3cb587634b2f131ef27d76b09fa093","url":"favicon.ico"},{"revision":"676d233b8b1c0ed49bc9651d790aaa4d","url":"manifest.json"},{"revision":"eb2015253aee8f999e8c5ef92754eb86","url":"offline.html"},{"revision":"0157961be72bfd70926a948e327a38c5","url":"webpack-assets.json"}] || []);