<template>
    <form @submit.prevent="registerUser">
        <Alert :error="error" @closed="error = null;" class="mb-4"/>
        <TextInput type="text" label="Name" name="name" v-model="name" placeholder="Luke Skywalker" class="mb-2"/>
        <TextInput type="email" label="Email" name="email" v-model="email" placeholder="luke@jedi.com" class="mb-2"/>
        <TextInput type="password" label="Password" name="password" v-model="password" class="mb-2"/>
        <TextInput type="password" label="Confirm Password" name="password-confirm" v-model="passwordConfirm" class="mb-4"/>
        <Button type="submit" text="Register"/>
    </form>
</template>

<script>
import {getError} from "@/utils/helpers";
import AuthService from "@/services/AuthService";
import TextInput from "@/components/utils/TextInput";
import Alert from "@/components/utils/Alert";
import Button from "@/components/utils/Button";

export default {
    name: "RegisterForm",
    components: {
        Button,
        TextInput,
        Alert,
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
