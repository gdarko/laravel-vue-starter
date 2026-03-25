<template>
    <Form id="register-form" @submit.prevent="onFormSubmit">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <TextInput type="text" :required="true" :label="trans('users.labels.first_name')" name="first_name" v-model="form.first_name"/>
            <TextInput type="text" :required="true" :label="trans('users.labels.last_name')" name="last_name" v-model="form.last_name"/>
        </div>
        <TextInput type="text" :label="trans('users.labels.middle_name')" name="middle_name" v-model="form.middle_name" class="mb-3"/>
        <TextInput type="email" :required="true" :label="trans('users.labels.email')" name="email" v-model="form.email" class="mb-3"/>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            <TextInput type="password" :required="true" :label="trans('users.labels.password')" name="password" v-model="form.password"/>
            <TextInput type="password" :required="true" :label="trans('users.labels.confirm_password')" name="password-confirm" v-model="form.passwordConfirm"/>
        </div>
        <Button type="submit" :label="trans('global.buttons.register')" class="btn-block"/>
    </Form>
</template>

<script>
import {reactive, defineComponent} from "vue";
import {trans} from "@/helpers/i18n"
import {useAuthStore} from "@/stores";
import TextInput from "@/views/components/input/TextInput";
import Button from "@/views/components/input/Button";
import Form from "@/views/components/Form";

export default defineComponent({
    name: "RegisterForm",
    components: { Form, Button, TextInput },
    setup() {
        const authStore = useAuthStore();
        const form = reactive({
            first_name: null, middle_name: null, last_name: null,
            email: null, password: null, passwordConfirm: null,
        });

        function onFormSubmit() {
            authStore.register({
                first_name: form.first_name, middle_name: form.middle_name,
                last_name: form.last_name, email: form.email,
                password: form.password, password_confirmation: form.passwordConfirm,
            });
        }

        return { onFormSubmit, form, trans }
    }
});
</script>
