<template>
    <form @submit.prevent="registerUser">
        <FlashMessage :error="error" @closed="error = null;" class="mb-4"/>
        <BaseInput type="text" label="Name" name="name" v-model="name" placeholder="Luke Skywalker" class="mb-2"/>
        <BaseInput type="email" label="Email" name="email" v-model="email" placeholder="luke@jedi.com" class="mb-2"/>
        <BaseInput type="password" label="Password" name="password" v-model="password" class="mb-2"/>
        <BaseInput type="password" label="Confirm Password" name="password-confirm" v-model="passwordConfirm" class="mb-4"/>
        <BaseButton type="submit" text="Register"/>
    </form>
</template>

<script>
import {getError} from "@/utils/helpers";
import AuthService from "@/services/AuthService";
import BaseInput from "@/components/utils/BaseInput";
import FlashMessage from "@/components/utils/FlashMessage";
import BaseButton from "@/components/utils/BaseButton";

export default {
    name: "RegisterForm",
    components: {
        BaseButton,
        BaseInput,
        FlashMessage,
    },
    data() {
        return {
            name: null,
            email: null,
            password: null,
            passwordConfirm: null,
            error: null,
        };
    },
    methods: {
        registerUser() {
            this.error = null;
            const payload = {
                name: this.name,
                email: this.email,
                password: this.password,
                password_confirmation: this.passwordConfirm,
            };
            AuthService.registerUser(payload)
                .then(() => this.$router.push("/dashboard"))
                .catch((error) => (this.error = getError(error)));
        },
    },
};
</script>
