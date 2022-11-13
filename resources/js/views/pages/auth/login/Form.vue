<template>
    <FormAlert class="mb-4"></FormAlert>
    <form @submit.prevent="onFormSubmit">
        <TextInput type="email" :label="trans('users.labels.email')" name="email" v-model="form.email" autocomplete="email" class="mb-2"/>
        <TextInput type="password" :label="trans('users.labels.password')" name="password" v-model="form.password" class="mb-4"/>
        <div class="text-center">
            <Button type="submit" :text="trans('global.buttons.login')"/>
        </div>
    </form>
</template>

<script>
import Button from "@/views/utils/Button";
import TextInput from "@/views/utils/TextInput";
import Alert from "@/views/utils/Alert";
import {trans} from "@/modules/i18n"

import {reactive, defineComponent} from "vue";
import {useRouter} from 'vue-router';
import {useAuthStore} from "@/store/auth";
import FormAlert from "@/views/utils/FormAlert";

export default defineComponent({
    name: "LoginForm",
    components: {
        FormAlert,
        Button,
        TextInput,
        Alert,
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
