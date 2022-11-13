<template>
    <form @submit.prevent="onFormSubmit">
        <FormAlert class="mb-4"/>
        <TextInput type="text" :label="trans('users.labels.first_name')" name="first_name" v-model="form.first_name" class="mb-2"/>
        <TextInput type="text" :label="trans('users.labels.last_name')" name="last_name" v-model="form.last_name" class="mb-2"/>
        <TextInput type="email" :label="trans('users.labels.email')" name="email" v-model="form.email" class="mb-2"/>
        <TextInput type="password" :label="trans('users.labels.password')" name="password" v-model="form.password" class="mb-2"/>
        <TextInput type="password" :label="trans('users.labels.confirm_password')" name="password-confirm" v-model="form.passwordConfirm" class="mb-4"/>
        <div class="text-center">
            <Button type="submit" :text="trans('global.buttons.register')"/>
        </div>
    </form>
</template>

<script>
import TextInput from "@/views/utils/TextInput";
import Alert from "@/views/utils/Alert";
import Button from "@/views/utils/Button";
import {reactive, defineComponent} from "vue";

import {trans} from "@/utils/i18n"
import {useAuthStore} from "@/stores";
import FormAlert from "@/views/utils/FormAlert";

export default defineComponent({
    name: "RegisterForm",
    components: {
        FormAlert,
        Button,
        TextInput,
        Alert,
    },
    setup() {
        const authStore = useAuthStore();
        const form = reactive({
            first_name: null,
            last_name: null,
            email: null,
            password: null,
            passwordConfirm: null,
        })

        function onFormSubmit() {
            const payload = {
                first_name: form.first_name,
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
