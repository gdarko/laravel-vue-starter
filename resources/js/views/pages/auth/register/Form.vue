<template>
    <form @submit.prevent="onFormSubmit">
        <Alert :error="state.error" @closed="state.error = null;" class="mb-4"/>
        <TextInput type="text" :label="trans('users.labels.name')" name="name" v-model="form.name" class="mb-2"/>
        <TextInput type="email" :label="trans('users.labels.email')" name="email" v-model="form.email" class="mb-2"/>
        <TextInput type="password" :label="trans('users.labels.password')" name="password" v-model="form.password" class="mb-2"/>
        <TextInput type="password" :label="trans('users.labels.confirm_password')" name="password-confirm" v-model="form.passwordConfirm" class="mb-4"/>
        <Button type="submit" :text="trans('global.buttons.register')"/>
    </form>
</template>

<script>
import {getError} from "@/modules/helpers";
import AuthService from "@/services/AuthService";
import TextInput from "@/views/utils/TextInput";
import Alert from "@/views/utils/Alert";
import Button from "@/views/utils/Button";
import {reactive, defineComponent} from "vue";
import {useRouter} from 'vue-router';

import {trans} from "@/modules/i18n"

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
            state,
            trans
        }
    }
});
</script>
