import axios from "@/plugins/axios";
import store from "@/store/index";

export const authClient = axios.create({
    baseURL: '/',
    withCredentials: true,
});

/*
 * Add a response interceptor
 */
authClient.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        if (
            error.response &&
            [401, 419].includes(error.response.status) &&
            store.getters["auth/authUser"] &&
            !store.getters["auth/guest"]
        ) {
            store.dispatch("auth/logout");
        }
        return Promise.reject(error);
    }
);

export default {
    async forgotPassword(payload) {
        await authClient.get("/sanctum/csrf-cookie");
        return authClient.post("/forgot-password", payload);
    },
    async resetPassword(payload) {
        await authClient.get("/sanctum/csrf-cookie");
        return authClient.post("/reset-password", payload);
    },
    async registerUser(payload) {
        await authClient.get("/sanctum/csrf-cookie");
        return authClient.post("/register", payload);
    },
    async getCurrentUser() {
        await authClient.get("/sanctum/csrf-cookie");
        return authClient.get("/api/users/auth");
    },
    async updatePassword(payload) {
        await authClient.get("/sanctum/csrf-cookie");
        return authClient.put("/user/password", payload);
    },
    async sendVerification(payload) {
        await authClient.get("/sanctum/csrf-cookie");
        return authClient.post("/email/verification-notification", payload);
    },
    async updateUser(payload) {
        await authClient.get("/sanctum/csrf-cookie");
        return authClient.put("/user/profile-information", payload);
    },
    login(payload) {
        return authClient.post("/login", payload);
    },
    logout() {
        return authClient.post("/logout");
    },
};
