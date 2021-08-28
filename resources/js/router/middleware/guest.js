export default function guest({ next, store }) {
  const storageItem = window.localStorage.getItem("guest");
  if (storageItem === "isNotGuest" && !store.getters["auth/authUser"]) {
    store.dispatch("auth/getCurrentUser").then(() => {
      if (store.getters["auth/authUser"]) {
        next({ name: "dashboard" });
      } else {
        store.dispatch("auth/setGuest", { value: "isGuest" });
        next();
      }
    });
  } else {
    next();
  }
}
