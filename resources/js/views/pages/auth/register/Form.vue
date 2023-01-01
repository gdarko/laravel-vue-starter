<template>
    <Form id="register-form" @submit.prevent="onFormSubmit">
        <Alert class="mb-4"/>
        <TextInput type="text" :required="true" :label="trans('users.labels.first_name')" name="first_name" v-model="form.first_name" class="mb-2"/>
        <TextInput type="text" :label="trans('users.labels.middle_name')" name="middle_name" v-model="form.middle_name" class="mb-2"/>
        <TextInput type="text" :required="true" :label="trans('users.labels.last_name')" name="last_name" v-model="form.last_name" class="mb-2"/>
        <TextInput type="email" :required="true" :label="trans('users.labels.email')" name="email" v-model="form.email" class="mb-2"/>
        <TextInput type="password" :required="true" :label="trans('users.labels.password')" name="password" v-model="form.password" class="mb-2"/>
        <TextInput type="password" :required="true" :label="trans('users.labels.confirm_password')" name="password-confirm" v-model="form.passwordConfirm" class="mb-4"/>
        <div class="text-center">
            <Button type="submit" :label="trans('global.buttons.register')"/>
        </div>
    </Form>
</template>

<script>
import {reactive, defineComponent} from "vue";
import {trans} from "@/helpers/i18n"
import {useAuthStore} from "@/stores";
import TextInput from "@/views/components/input/TextInput";
import Button from "@/views/components/input/Button";
import Alert from "@/views/components/Alert";
import Form from "@/views/components/Form";

export default defineComponent({
    name: "RegisterForm",
    components: {
        Form,
        Alert,
        Button,
        TextInput,
    },
    setup() {
        const authStore = useAuthStore();
        const form = reactive({
            first_name: null,
            middle_name: null,
            last_name: null,
            email: null,
            password: null,
            passwordConfirm: null,
        })

        function onFormSubmit() {
            const payload = {
                first_name: form.first_name,
                middle_name: form.middle_name,
                last_name: form.last_name,
                email: form.email,
                password: form.password,
                password_confirmation: form.passwordConfirm,
            };

            authStore.register(payload)
        }

        return {
            onFormSubmit,
            form,
            trans
        }
    }
});
</script>
