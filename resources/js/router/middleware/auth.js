export default function auth({ to, next, store }) {
  const loginQuery = { path: "/login", query: { redirect: to.fullPath } };

  if (!store.getters["auth/authUser"]) {
    store.dispatch("auth/getCurrentUser").then(() => {
      if (!store.getters["auth/authUser"]) next(loginQuery);
      else next();
    });
  } else {
    next();
  }
}
