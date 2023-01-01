<template>
    <Alert class="mb-4"></Alert>
    <Form id="login-form" @submit.prevent="onFormSubmit">
        <TextInput type="email" :label="trans('users.labels.email')" name="email" v-model="form.email" autocomplete="email" class="mb-2"/>
        <TextInput type="password" :label="trans('users.labels.password')" name="password" v-model="form.password" class="mb-4"/>
        <div class="text-center">
            <Button type="submit" :label="trans('global.buttons.login')"/>
        </div>
    </Form>
</template>

<script>
import {trans} from "@/helpers/i18n"
import {reactive, defineComponent} from "vue";
import {useAuthStore} from "@/stores/auth";
import Button from "@/views/components/input/Button";
import TextInput from "@/views/components/input/TextInput";
import Alert from "@/views/components/Alert";
import Form from "@/views/components/Form";

export default defineComponent({
    name: "LoginForm",
    components: {
        Form,
        Alert,
        Button,
        TextInput,
    },
    emits: ['error'],
    setup(props, {emit}) {
        const authStore = useAuthStore();
        const form = reactive({
            email: null,
            password: null,
        })

        function onFormSubmit() {
            const payload = {
                email: form.email,
                password: form.password,
            };
            authStore.login(payload)
        }

        return {
            onFormSubmit,
            form,
            trans
        }
    }
});
</script>
