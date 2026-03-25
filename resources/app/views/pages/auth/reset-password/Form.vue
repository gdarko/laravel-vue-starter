<template>
    <Form id="reset-password-form" @submit.prevent="onFormSubmit">
        <TextInput type="email" :required="true" :label="trans('users.labels.email')" name="email" v-model="form.email" class="mb-3"/>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            <TextInput type="password" :required="true" :label="trans('users.labels.password')" name="password" v-model="form.password"/>
            <TextInput type="password" :required="true" :label="trans('users.labels.confirm_password')" name="password-confirm" v-model="form.passwordConfirm"/>
        </div>
        <Button type="submit" :label="trans('global.buttons.submit')" class="btn-block"/>
    </Form>
</template>

<script>
import AuthService from "@/services/AuthService";
import {reactive, defineComponent} from "vue";
import {useRoute} from "vue-router"
import {trans} from "@/helpers/i18n"
import {useToastStore} from "@/stores/toast";
import {getResponseError} from "@/helpers/api";
import Button from "@/views/components/input/Button";
import TextInput from "@/views/components/input/TextInput";
import Form from "@/views/components/Form";

export default defineComponent({
    name: "ResetPasswordForm",
    components: { Form, Button, TextInput },
    setup() {
        const authService = new AuthService();
        const toastStore = useToastStore();
        const route = useRoute();
        const form = reactive({ email: null, password: null, passwordConfirm: null });

        function onFormSubmit() {
            authService.resetPassword({
                email: form.email, password: form.password,
                password_confirmation: form.passwordConfirm,
                token: route.query.token,
            })
                .then((response) => toastStore.success(response.data.message))
                .catch((error) => toastStore.error(getResponseError(error)));
        }

        return { onFormSubmit, form, trans }
    },
});
</script>
