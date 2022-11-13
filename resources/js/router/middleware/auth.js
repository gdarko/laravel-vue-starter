export default function auth({to, next, store}) {
    if (!store.user) {
        store.getCurrentUser().then(() => {
            if (!store.user) {
                window.location.href='/login';
                //next({name: "login"});
            } else {
                next();
            }
        })
    } else {
        next();
    }
}
