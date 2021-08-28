import {createWebHistory, createRouter} from "vue-router";
import store from "@/store/index";
import auth from "@/router/middleware/auth";
import admin from "@/router/middleware/admin";
import guest from "@/router/middleware/guest";
import pipeline from "@/router/pipeline";

function page(path) {
    return () => import(/* webpackChunkName: '' */ `@/pages/${path}`).then(m => m.default || m)
}

const routes = [
    {
        path: "/",
        name: "home",
        meta: {middleware: [guest]},
        component: page("public/Home"),
    },
    {
        path: "/dashboard",
        name: "dashboard",
        meta: {middleware: [auth]},
        component: page("private/Dashboard"),
    },
    {
        path: "/account",
        name: "account",
        meta: {middleware: [auth]},
        component: page("private/Account"),
    },
    {
        path: "/users",
        name: "users",
        meta: {middleware: [auth, admin]},
        component: page("private/Users"),
    },
    {
        path: "/login",
        name: "login",
        meta: {middleware: [guest]},
        component: page("auth/Login"),
    },
    {
        path: "/register",
        name: "register",
        meta: {middleware: [guest]},
        component: page("auth/Register"),
    },
    {
        path: "/reset-password",
        name: "resetPassword",
        meta: {middleware: [guest]},
        component: page("auth/ResetPassword"),
    },
    {
        path: "/forgot-password",
        name: "forgotPassword",
        meta: {middleware: [guest]},
        component: page("auth/ForgotPassword"),
    },
    {
        path: "/:catchAll(.*)",
        name: "notFound",
        component: () =>
            import(/* webpackChunkName: "not-found" */ "@/pages/shared/NotFound"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const middleware = to.meta.middleware;
    const context = {to, from, next, store};

    if (!middleware) {
        return next();
    }
    middleware[0]({
        ...context,
        next: pipeline(context, middleware, 1),
    });
});

export default router;
