<template>
    <div>
        <FlashMessage :error="error" @closed="error = null;" class="mb-4"/>
        <form @submit.prevent="login">
            <BaseInput type="email" label="Email" name="email" v-model="email" autocomplete="email" placeholder="luke@jedi.com" class="mb-2"/>
            <BaseInput type="password" label="Password" name="password" v-model="password" class="mb-4"/>
            <div class="flex justify-between">
                <BaseButton type="submit" text="Login"/>
                <router-link to="/forgot-password" class="text-sm base-link">
                    Forgot your password?
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>
import {getError} from "@/utils/helpers";
import AuthService from "@/services/AuthService";
import BaseButton from "@/components/utils/BaseButton";
import BaseInput from "@/components/utils/BaseInput";
import FlashMessage from "@/components/utils/FlashMessage";

export default {
    name: "LoginView",
    components: {
        BaseButton,
        BaseInput,
        FlashMessage,
    },
    data() {
        return {
            email: null,
            password: null,
            error: null,
        };
    },
    methods: {
        async login() {
            const payload = {
                email: this.email,
                password: this.password,
            };
            this.error = null;
            try {
                await AuthService.login(payload);
                const authUser = await this.$store.dispatch("auth/getCurrentUser");
                if (authUser) {
                    this.$store.dispatch("auth/setGuest", {value: "isNotGuest"});
                    this.$router.push("/dashboard");
                } else {
                    const error = Error(
                        "Unable to fetch user after login, check your API settings."
                    );
                    error.name = "Fetch User";
                    throw error;
                }
            } catch (error) {
                this.error = getError(error);
                this.$emit('error', this.error);
            }
        },
    },
};
</script>
