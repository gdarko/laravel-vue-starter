export default function guest({next, store}) {
    const storageItem = store.hasBrowserData();
    if (storageItem && !store.user) {
        store.getCurrentUser().then(() => {
            if (store.user) {
                next({name: "dashboard"});
            } else {
                store.clearBrowserData();
                next();
            }
        });
    } else {
        next();
    }
}
