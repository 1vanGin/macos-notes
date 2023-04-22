//@ts-ignore
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/serviceWorker.ts").catch((error) => {
    console.log("Service Worker not registered", error);
  });
}
