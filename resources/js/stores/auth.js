import {defineStore} from 'pinia'
import router from "@/router";
import {getResponseError} from "@/helpers/api";
import {useAlertStore} from "@/stores/alert";
import AuthService from "@/services/AuthService";
import UserService from "@/services/UserService";

export const useAuthStore = defineStore("auth", {
    state: () => {
        return {
            user: null,
            loading: false,
            error: null,
        };
    },
    actions: {
        async login(payload) {
            const alertStore = useAlertStore();
            const authService = new AuthService();
            try {
                const response = await authService.login(payload);
                this.user = response.data.user;
                this.setBrowserData();
                alertStore.clear();
                await this.getCurrentUser();
                await router.push("/dashboard");
                //window.location.href = "/dashboard";
            } catch (error) {
                alertStore.error(getResponseError(error));
            }
        },
        async register(payload) {
            const alertStore = useAlertStore();
            const authService = new AuthService();
            try {
                const response = await authService.registerUser(payload);
                await router.push("/dashboard");
                alertStore.clear();
            } catch (error) {
                alertStore.error(getResponseError(error));
            }
        },
        async updateAvatar(id, payload) {
            const alertStore = useAlertStore();
            const userService = new UserService();
            try {
                const response = await userService.updateAvatar(id, payload);
                await this.getCurrentUser();
                alertStore.success(trans('global.phrases.file_uploaded'))
                return true;
            } catch (error) {
                alertStore.error(getResponseError(error));
                return false;
            }
        },
        async logout() {
            const alertStore = useAlertStore();
            const authService = new AuthService();
            try {
                await authService.logout();
                this.user = null;
                this.clearBrowserData()
                if (router.currentRoute.name !== "login") {
                    await router.push({path: "/login"});
                }
            } catch (error) {
                alertStore.error(getResponseError(error));
            }
        },
        async getCurrentUser() {
            this.loading = true;
            const authService = new AuthService();
            try {
                const response = await authService.getCurrentUser();
                this.user = response.data.data;
                this.loading = false
            } catch (error) {
                this.loading = false
                this.user = null;
                this.error = getResponseError(error);
            }
            return this.user;

        },
        hasBrowserData() {
            let data = window.localStorage.getItem('currentUser');
            return !!data;
        },
        setBrowserData() {
            window.localStorage.setItem('currentUser', JSON.stringify(this.user))
        },
        clearBrowserData() {
            window.localStorage.removeItem('currentUser');
        }
    },
    getters: {
        isAdmin: (state) => {
            return state.user ? state.user.is_admin : false;
        },
        loggedIn: (state) => {
            return !!state.user;
        },
        guest: (state) => {
            return !state.hasBrowserData();
        },
    }
});
