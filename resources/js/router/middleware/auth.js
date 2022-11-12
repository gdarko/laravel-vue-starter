export default function auth({to, next, store}) {
    if (!store.getters["auth/authUser"]) {
        store.dispatch("auth/getCurrentUser").then(() => {
            if (!store.getters["auth/authUser"]) {
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
