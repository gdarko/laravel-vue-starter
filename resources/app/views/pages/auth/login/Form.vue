<template>
    <Form id="login-form" @submit.prevent="onFormSubmit">
        <TextInput type="email" :label="trans('users.labels.email')" name="email" v-model="form.email" autocomplete="email" class="mb-3"/>
        <TextInput type="password" :label="trans('users.labels.password')" name="password" v-model="form.password" class="mb-5"/>
        <Button type="submit" :label="trans('global.buttons.login')" class="btn-block"/>
    </Form>
</template>

<script>
import {trans} from "@/helpers/i18n"
import {reactive, defineComponent} from "vue";
import {useAuthStore} from "@/stores/auth";
import Button from "@/views/components/input/Button";
import TextInput from "@/views/components/input/TextInput";
import Form from "@/views/components/Form";

export default defineComponent({
    name: "LoginForm",
    components: { Form, Button, TextInput },
    setup() {
        const authStore = useAuthStore();
        const form = reactive({ email: null, password: null });

        function onFormSubmit() {
            authStore.login({ email: form.email, password: form.password });
        }

        return { onFormSubmit, form, trans }
    }
});
</script>
