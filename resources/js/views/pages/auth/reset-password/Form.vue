<template>
    <div>
        <Alert class="mb-4"/>
        <Form id="reset-password-form" @submit.prevent="onFormSubmit">
            <div class="mb-2">
                <label for="email" class="text-sm text-gray-500">{{ trans('users.labels.email') }}</label>
                <input type="email" id="email" v-model="form.email" class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div class="mb-2">
                <label for="password" class="text-sm text-gray-500">{{ trans('users.labels.password') }}</label>
                <input type="password" id="password" v-model="form.password" class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div class="mb-4">
                <label for="password-confirm" class="text-sm text-gray-500">{{ trans('users.labels.confirm_password') }}</label>
                <input type="password" id="password-confirm" v-model="form.passwordConfirm" class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div class="text-center">
                <Button type="submit" :label="trans('global.buttons.submit')"/>
            </div>
        </Form>
    </div>
</template>

<script>
import AuthService from "@/services/AuthService";
import {reactive, defineComponent} from "vue";
import {useRoute} from "vue-router"
import {trans} from "@/helpers/i18n"
import {useAlertStore} from "@/stores";
import {getResponseError} from "@/helpers/api";
import Button from "@/views/components/input/Button";
import Alert from "@/views/components/Alert";
import Form from "@/views/components/Form";

export default defineComponent({
    name: "ResetPasswordForm",
    components: {
        Form,
        Alert,
        Button,
    },
    setup() {

        const authService = new AuthService();
        const alertStore = useAlertStore();
        const route = useRoute();
        const form = reactive({
            email: null,
            password: null,
            passwordConfirm: null,
        })

        function onFormSubmit() {
            const payload = {
                email: form.email,
                password: form.password,
                password_confirmation: form.passwordConfirm,
                token: route.query.token,
            };
            authService.resetPassword(payload)
                .then((response) => (alertStore.success(response.data.message)))
                .catch((error) => (alertStore.error(getResponseError(error))));
        }

        return {
            onFormSubmit,
            form,
            trans
        }
    },
});
</script>
