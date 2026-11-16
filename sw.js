'use strict';
const scope = new URL(self.registration.scope);
const prefix = 'lrs-guia:' + scope.pathname + ':';
const CACHE = prefix + 'v16-20261116';
const required = ['./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'].map(x=>new URL(x,scope).href);
const entry = required[0];
self.addEventListener('install',event=>{
  event.waitUntil((async()=>{const cache=await caches.open(CACHE);await cache.addAll(required.map(url=>new Request(url,{cache:'reload'})));await self.skipWaiting();})());
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{for(const key of await caches.keys()){if(key.startsWith(prefix)&&key!==CACHE)await caches.delete(key);}await self.clients.claim();})());
});
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 if(req.method!=='GET'||url.origin!==scope.origin||!url.pathname.startsWith(scope.pathname))return;
 if(req.mode==='navigate'){
   const offline = url.pathname===scope.pathname||url.pathname===new URL(entry).pathname;
   if(offline)event.respondWith(fetch(req).then(async r=>{
     if(!r.ok){const saved=await caches.match(entry,{cacheName:CACHE});return saved||r;}
     const c=await caches.open(CACHE);await c.put(entry,r.clone());return r;
   }).catch(async()=>(await caches.match(entry,{cacheName:CACHE}))||Response.error()));
   return;
 }
 if(required.includes(url.href))event.respondWith(caches.match(req,{cacheName:CACHE}).then(r=>r||fetch(req)));
});
