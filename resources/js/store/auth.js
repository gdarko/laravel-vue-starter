import {defineStore} from 'pinia'
import AuthService from "@/services/AuthService";
import router from "@/router";
import apiUtils from "@/utils/api";
import {useAlertStore} from "@/store/alert";


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
            try {
                const response = await AuthService.login(payload);
                this.user = response.data.user;
                this.setBrowserData();
                alertStore.clear();
                await this.getCurrentUser();
                await router.push("/dashboard");
                //window.location.href = "/dashboard";
            } catch (error) {
                alertStore.error(apiUtils.getError(error));
            }
        },
        async register(payload) {
            const alertStore = useAlertStore();
            try {
                const response = await AuthService.registerUser(payload);
                await router.push("/dashboard");
                alertStore.clear();
            } catch (error) {
                alertStore.error(apiUtils.getError(error));
            }
        },
        async logout() {
            const alertStore = useAlertStore();
            try {
                await AuthService.logout();
                this.user = null;
                this.clearBrowserData()
                if (router.currentRoute.name !== "login") {
                    await router.push({path: "/login"});
                }
            } catch (error) {
                alertStore.error(apiUtils.getError(error));
            }
        },
        async getCurrentUser() {
            this.loading = true;
            try {
                const response = await AuthService.getCurrentUser();
                this.user = response.data.data;
                this.loading = false
            } catch (error) {
                this.loading = false
                this.user = null;
                this.error = apiUtils.getError(error);
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
            return state.user ? state.user.isAdmin : false;
        },
        loggedIn: (state) => {
            return !!state.user;
        },
        guest: (state) => {
            return !state.hasBrowserData();
        },
    }
});
