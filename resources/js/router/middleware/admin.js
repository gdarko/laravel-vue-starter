export default function admin({ next, store }) {
  if (store.getters["auth/isAdmin"]) next();
  else next({ name: "notFound" });
}
