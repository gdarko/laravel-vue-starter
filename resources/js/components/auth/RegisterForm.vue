<template>
    <form @submit.prevent="onFormSubmit">
        <Alert :error="state.error" @closed="state.error = null;" class="mb-4"/>
        <TextInput type="text" label="Name" name="name" v-model="form.name" placeholder="Luke Skywalker" class="mb-2"/>
        <TextInput type="email" label="Email" name="email" v-model="form.email" placeholder="luke@jedi.com" class="mb-2"/>
        <TextInput type="password" label="Password" name="password" v-model="form.password" class="mb-2"/>
        <TextInput type="password" label="Confirm Password" name="password-confirm" v-model="form.passwordConfirm" class="mb-4"/>
        <Button type="submit" text="Register"/>
    </form>
</template>

<script>
import {getError} from "@/utils/helpers";
import AuthService from "@/services/AuthService";
import TextInput from "@/components/utils/TextInput";
import Alert from "@/components/utils/Alert";
import Button from "@/components/utils/Button";
import {reactive, defineComponent} from "vue";
import {useRouter} from 'vue-router';

export default defineComponent({
    name: "RegisterForm",
    components: {
        Button,
        TextInput,
        Alert,
    },
    setup() {
        const router = useRouter();
        const form = reactive({
            name: null,
            email: null,
            password: null,
            passwordConfirm: null,
        })
        const state = reactive({
            error: null,
        })

        function onFormSubmit() {
            state.error = null;
            const payload = {
                name: form.name,
                email: form.email,
                password: form.password,
                password_confirmation: form.passwordConfirm,
            };
            AuthService.registerUser(payload)
                .then(() => router.push("/dashboard"))
                .catch((error) => (state.error = getError(error)));
        }

        return {
            onFormSubmit,
            form,
            state
        }
    }
});
</script>
