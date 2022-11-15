import BaseService from "@/services/BaseService";
import axios from "axios";

export default class AuthService extends BaseService {

    constructor() {
        super();
        this.url = '/';
        this.setupAPI(axios.defaults.baseURL);
    }

    async forgotPassword(payload) {
        await this.api.get("/sanctum/csrf-cookie");
        return this.api.post("/forgot-password", payload);
    }

    async resetPassword(payload) {
        await this.api.get("/sanctum/csrf-cookie");
        return this.api.post("/reset-password", payload);
    }

    async registerUser(payload) {
        await this.api.get("/sanctum/csrf-cookie");
        return this.api.post("/register", payload);
    }

    async getCurrentUser() {
        await this.api.get("/sanctum/csrf-cookie");
        return this.api.get("/api/users/auth");
    }

    async updatePassword(payload) {
        await this.api.get("/sanctum/csrf-cookie");
        return this.api.put("/user/password", payload);
    }

    async sendVerification(payload) {
        await this.api.get("/sanctum/csrf-cookie");
        return this.api.post("/email/verification-notification", payload);
    }

    async updateUser(payload) {
        await this.api.get("/sanctum/csrf-cookie");
        return this.api.put("/user/profile-information", payload);
    }

    login(payload) {
        return this.api.post("/login", payload);
    }

    logout() {
        return this.api.post("/logout");
    }

}
