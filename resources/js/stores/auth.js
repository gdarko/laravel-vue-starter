import router from "@/router";
import {defineStore} from 'pinia'
import {getResponseError} from "@/helpers/api";
import {useAlertStore} from "@/stores/alert";
import AuthService from "@/services/AuthService";
import UserService from "@/services/UserService";
import {trans} from "@/helpers/i18n";

export const useAuthStore = defineStore("auth", {
    state: () => {
        return {
            user: null,
            error: null,
        };
    },
    actions: {
        async login(payload) {
            const authService = new AuthService();
            const alertStore = useAlertStore();
            try {
                const response = await authService.login(payload);
                this.user = response.data.user;
                this.setBrowserData();
                alertStore.clear();
                await router.push("/panel/dashboard");
                await this.getCurrentUser();
            } catch (error) {
                alertStore.error(getResponseError(error));
            }
        },
        async register(payload) {
            const authService = new AuthService();
            const alertStore = useAlertStore();
            try {
                const response = await authService.registerUser(payload);
                await router.push("/panel/dashboard");
                alertStore.clear();
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
        updateAvatar(id, payload) {
            const alertStore = useAlertStore();
            const userService = new UserService();
            return new Promise((resolve, reject) => {
                return userService
                    .updateAvatar(id, payload)
                    .then((response) => {
                        this.getCurrentUser().then(() => {
                            alertStore.success(trans('global.phrases.file_uploaded'));
                            resolve(response)
                        });
                    })
                    .catch((err) => {
                        alertStore.error(getResponseError(err));
                        reject(err)
                    })
            })
        },
        logout() {
            return new Promise((resolve, reject) => {
                const alertStore = useAlertStore();
                const authService = new AuthService();
                return authService
                    .logout()
                    .then((response) => {
                        this.clearBrowserData();
                        this.user = null;
                        if (router.currentRoute.name !== "login") {
                            router.push({path: "/login"});
                            console.log('logout...');
                        }
                        resolve(response)
                    })
                    .catch((err) => {
                        alertStore.error(getResponseError(err));
                        reject(err)
                    })
            });
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
        },
        hasAbilities(abilities) {
            return this.user && this.user.hasOwnProperty('abilities') && !!this.user.abilities.find((ab) => {
                if (ab.name === '*') {
                    return true
                }
                if (typeof abilities === 'string') {
                    return ab.name === abilities
                }
                return !!abilities.find((p) => {
                    return ab.name === p
                })
            })
        },

        hasAllAbilities(abilities) {
            let isAvailable = true
            if (this.user && this.user.hasOwnProperty('abilities')) {
                this.user.abilities.filter((ab) => {
                    let hasContain = !!abilities.find((p) => {
                        return ab.name === p
                    })
                    if (!hasContain) {
                        isAvailable = false
                    }
                })
            }

            return isAvailable
        },
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
