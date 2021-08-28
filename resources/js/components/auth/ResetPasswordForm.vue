<template>
    <div>
        <FlashMessage :message="message" :error="error" @closed="message = null; error = null;" class="mb-4"/>
        <form @submit.prevent="resetPassword">
            <div class="mb-2">
                <label for="email" class="text-sm text-gray-500">Email</label>
                <input type="email" id="email" v-model="email" class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div class="mb-2">
                <label for="password" class="text-sm text-gray-500">Password</label>
                <input type="password" id="password" v-model="password" class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div class="mb-4">
                <label for="password-confirm" class="text-sm text-gray-500">Confirm Password</label>
                <input type="password" id="password-confirm" v-model="passwordConfirm"
                       class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div class="flex justify-between">
                <BaseButton type="submit" text="Submit"/>
                <router-link to="/login" class="text-sm base-link">
                    Already done? Login now
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>
import {getError} from "@/utils/helpers";
import FlashMessage from "@/components/utils/FlashMessage";
import AuthService from "@/services/AuthService";
import BaseButton from "@/components/utils/BaseButton";

export default {
    name: "ResetPasswordForm",
    components: {
        BaseButton,
        FlashMessage,
    },
    data() {
        return {
            email: null,
            password: null,
            passwordConfirm: null,
            error: null,
            message: null,
        };
    },
    methods: {
        resetPassword() {
            this.error = null;
            this.message = null;
            const payload = {
                email: this.email,
                password: this.password,
                password_confirmation: this.passwordConfirm,
                token: this.$route.query.token,
            };
            AuthService.resetPassword(payload)
                .then((response) => (this.message = response.data.message))
                .catch((error) => (this.error = getError(error)));
        },
    },
};
</script>
