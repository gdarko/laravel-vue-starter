<template>
    <form @submit.prevent="updatePassword">
        <Alert :message="message" :error="error" @closed="error = null; message = null" class="mb-4"/>
        <div class="mb-2">
            <label for="password" class="text-sm text-gray-500">Current Password</label>
            <input type="password" id="current-password" v-model="currentPassword"
                   class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div class="mb-2">
            <label for="password" class="text-sm text-gray-500">Password</label>
            <input type="password" id="password" v-model="password"
                   class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div class="mb-4">
            <label for="password-confirm" class="text-sm text-gray-500">Confirm Password</label>
            <input type="password" id="password-confirm" v-model="passwordConfirm"
                   class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <Button type="submit" text="Update"/>
    </form>
</template>

<script>
import {getError} from "@/utils/helpers";
import AuthService from "@/services/AuthService";
import Alert from "@/components/utils/Alert";
import Button from "@/components/utils/Button";

export default {
    name: "AccountPassword",
    components: {
        Button,
        Alert,
    },
    data() {
        return {
            currentPassword: null,
            password: null,
            passwordConfirm: null,
            error: null,
            message: null,
        };
    },
    methods: {
        updatePassword() {
            this.error = null;
            this.message = null;
            const payload = {
                current_password: this.currentPassword,
                password: this.password,
                password_confirmation: this.passwordConfirm,
            };
            AuthService.updatePassword(payload)
                .then((response) => (this.message = 'Password updated successfully.'))
                .catch((error) => (this.error = getError(error)));
        },
    },
};
</script>
