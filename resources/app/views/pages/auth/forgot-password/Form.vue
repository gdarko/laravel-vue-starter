<template>
    <Form id="forgot-password-form" @submit.prevent="onFormSubmit">
        <TextInput type="email" :required="true" :label="trans('users.labels.email')" name="email" v-model="form.email" autocomplete="email" class="mb-5"/>
        <Button type="submit" :label="trans('global.buttons.send')" class="btn-block"/>
    </Form>
</template>

<script>
import AuthService from "@/services/AuthService";
import {reactive, defineComponent} from "vue";
import {trans} from "@/helpers/i18n";
import {useToastStore} from "@/stores/toast";
import {getResponseError} from "@/helpers/api";
import Button from "@/views/components/input/Button";
import TextInput from "@/views/components/input/TextInput";
import Form from "@/views/components/Form";

export default defineComponent({
    name: "ForgotPasswordForm",
    components: { Form, Button, TextInput },
    setup() {
        const authService = new AuthService();
        const toastStore = useToastStore();
        const form = reactive({ email: null });

        function onFormSubmit() {
            authService.forgotPassword({email: form.email})
                .then((response) => toastStore.success(response.data.message))
                .catch((error) => toastStore.error(getResponseError(error)));
        }

        return { onFormSubmit, form, trans }
    },
});
</script>
