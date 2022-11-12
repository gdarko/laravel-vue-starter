import {createWebHistory, createRouter} from "vue-router";
import store from "@/store/index";
import auth from "@/router/middleware/auth";
import admin from "@/router/middleware/admin";
import guest from "@/router/middleware/guest";
import pipeline from "@/router/pipeline";

import {default as PageDashboard} from "@/views/pages/private/dashboard/Main";
import {default as PageLogin} from "@/views/pages/auth/login/Main";
import {default as PageRegister} from "@/views/pages/auth/register/Main";
import {default as PageResetPassword} from "@/views/pages/auth/reset-password/Main";
import {default as PageForgotPassword} from "@/views/pages/auth/forgot-password/Main";
import {default as PageNotFound} from "@/views/pages/shared/404/Main";
import {default as PageProfile} from "@/views/pages/private/profile/Main";

import {default as PageUsers} from "@/views/pages/private/users/Main";
import {default as PageUsersCreate} from "@/views/pages/private/users/Create";
import {default as PageUsersEdit} from "@/views/pages/private/users/Edit";


const routes = [
    {
        path: "/",
        name: "home",
        meta: {middleware: [guest]},
        component: PageLogin,
    },
    {
        path: "/dashboard",
        name: "dashboard",
        meta: {middleware: [auth]},
        component: PageDashboard,
    },
    {
        path: "/profile",
        name: "profile",
        meta: {middleware: [auth]},
        component: PageProfile,
    },
    {
        path: "/users",
        name: "users",
        meta: {middleware: [auth, admin]},
        component: PageUsers,
    },
    {
        path: "/users/create",
        name: "users.create",
        meta: {middleware: [auth, admin]},
        component: PageUsersCreate,
    },
    {
        path: "/users/:id/edit",
        name: "users.edit",
        meta: {middleware: [auth, admin]},
        component: PageUsersEdit,
    },
    {
        path: "/login",
        name: "login",
        meta: {middleware: [guest]},
        component: PageLogin,
    },
    {
        path: "/register",
        name: "register",
        meta: {middleware: [guest]},
        component: PageRegister,
    },
    {
        path: "/reset-password",
        name: "resetPassword",
        meta: {middleware: [guest]},
        component: PageResetPassword,
    },
    {
        path: "/forgot-password",
        name: "forgotPassword",
        meta: {middleware: [guest]},
        component: PageForgotPassword,
    },
    {
        path: "/:catchAll(.*)",
        name: "notFound",
        component: PageNotFound,
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
