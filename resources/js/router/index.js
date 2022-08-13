import {createWebHistory, createRouter} from "vue-router";
import store from "@/store/index";
import auth from "@/router/middleware/auth";
import admin from "@/router/middleware/admin";
import guest from "@/router/middleware/guest";
import pipeline from "@/router/pipeline";

import Home from "@/pages/public/Home";
import Dashboard from "@/pages/private/Dashboard";
import Account from "@/pages/private/Account";
import Users from "@/pages/private/Users";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ResetPassword from "@/pages/auth/ResetPassword";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import NotFound from "@/pages/shared/NotFound";

const routes = [
    {
        path: "/",
        name: "home",
        meta: {middleware: [guest]},
        component: Home,
    },
    {
        path: "/dashboard",
        name: "dashboard",
        meta: {middleware: [auth]},
        component: Dashboard,
    },
    {
        path: "/account",
        name: "account",
        meta: {middleware: [auth]},
        component: Account,
    },
    {
        path: "/users",
        name: "users",
        meta: {middleware: [auth, admin]},
        component: Users,
    },
    {
        path: "/login",
        name: "login",
        meta: {middleware: [guest]},
        component: Login,
    },
    {
        path: "/register",
        name: "register",
        meta: {middleware: [guest]},
        component: Register,
    },
    {
        path: "/reset-password",
        name: "resetPassword",
        meta: {middleware: [guest]},
        component: ResetPassword,
    },
    {
        path: "/forgot-password",
        name: "forgotPassword",
        meta: {middleware: [guest]},
        component: ForgotPassword,
    },
    {
        path: "/:catchAll(.*)",
        name: "notFound",
        component: NotFound,
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
