export default class SWRegister {
  constructor() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/serviceWorker.ts").catch((error) => {
        console.log("Service Worker not registered", error);
      });
    }
  }
}

new SWRegister();
