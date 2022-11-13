export default function admin({next, store}) {
    if (store.isAdmin) {
        next();
    } else {
        next({name: "notFound"});
    }
}
