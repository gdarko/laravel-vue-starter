import axios from "axios";
import BaseService from "@/services/BaseService";
import {useGlobalStateStore} from "@/stores/global"

export default class AuthService extends BaseService {

    private globalStateStore;

    constructor() {
        super();
        this.url = '/';
        this.setupAPI(axios.defaults.baseURL);
        this.globalStateStore = useGlobalStateStore();
    }

    async getCurrentUser() {
        await this.get("/sanctum/csrf-cookie");
        return this.get("/api/users/auth");
    }

    async forgotPassword(payload) {
        this.globalStateStore.loadingElements['forgot-password-form'] = true;
        await this.get("/sanctum/csrf-cookie");
        return this.post("/forgot-password", payload).finally(() => {
            this.globalStateStore.loadingElements['forgot-password-form'] = false;
        });
    }

    async resetPassword(payload) {
        this.globalStateStore.loadingElements['reset-password-form'] = true;
        await this.get("/sanctum/csrf-cookie");
        return this.post("/reset-password", payload).finally(() => {
            this.globalStateStore.loadingElements['reset-password-form'] = false;
        });
    }

    async registerUser(payload) {
        this.globalStateStore.loadingElements['register-form'] = true;
        await this.get("/sanctum/csrf-cookie");
        return this.post("/register", payload).finally(() => {
            this.globalStateStore.loadingElements['register-form'] = false;
        });
    }

    async updatePassword(payload) {
        this.globalStateStore.loadingElements['update-password-form'] = true;
        await this.get("/sanctum/csrf-cookie");
        return this.put("/user/password", payload).finally(() => {
            this.globalStateStore.loadingElements['update-password-form'] = false;
        });
    }

    async sendVerification(payload) {
        this.globalStateStore.loadingElements['send-verification-form'] = true;
        await this.get("/sanctum/csrf-cookie");
        return this.post("/email/verification-notification", payload).finally(() => {
            this.globalStateStore.loadingElements['send-verification-form'] = false;
        });
    }

    async updateUser(payload) {
        this.globalStateStore.loadingElements['update-profile-form'] = true;
        await this.get("/sanctum/csrf-cookie");
        return this.put("/user/profile-information", payload).finally(() => {
            this.globalStateStore.loadingElements['update-profile-form'] = false;
        });
    }

    login(payload) {
        this.globalStateStore.loadingElements['login-form'] = true;
        return this.post("/login", payload).finally(() => {
            this.globalStateStore.loadingElements['login-form'] = false;
        });
    }

    logout() {
        this.globalStateStore.loadingElements['logout-form'] = true;
        return this.post("/logout", {}, {}).finally(() => {
            this.globalStateStore.loadingElements['logout-form'] = false;
        });
    }

}
