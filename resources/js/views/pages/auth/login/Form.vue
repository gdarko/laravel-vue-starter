<template>
    <DefaultAlert class="mb-4"></DefaultAlert>
    <form @submit.prevent="onFormSubmit">
        <TextInput type="email" :label="trans('users.labels.email')" name="email" v-model="form.email" autocomplete="email" class="mb-2"/>
        <TextInput type="password" :label="trans('users.labels.password')" name="password" v-model="form.password" class="mb-4"/>
        <div class="text-center">
            <Button type="submit" :text="trans('global.buttons.login')"/>
        </div>
    </form>
</template>

<script>
import {trans} from "@/helpers/i18n"
import {reactive, defineComponent} from "vue";
import {useAuthStore} from "@/stores/auth";
import Button from "@/views/components/input/Button";
import TextInput from "@/views/components/input/TextInput";
import DefaultAlert from "@/views/components/alerts/DefaultAlert";

export default defineComponent({
    name: "LoginForm",
    components: {
        DefaultAlert,
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
