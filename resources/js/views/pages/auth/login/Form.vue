<template>
    <Alert :error="state.error" @closed="state.error = null;" class="mb-4"/>
    <form @submit.prevent="onFormSubmit">
        <TextInput type="email" :label="trans('users.labels.email')" name="email" v-model="form.email" autocomplete="email" class="mb-2"/>
        <TextInput type="password" :label="trans('users.labels.password')" name="password" v-model="form.password" class="mb-4"/>
        <div class="text-center">
            <Button type="submit" :text="trans('global.buttons.login')"/>
        </div>
    </form>
</template>

<script>
import apiUtils from "@/utils/api";
import AuthService from "@/services/AuthService";
import Button from "@/views/utils/Button";
import TextInput from "@/views/utils/TextInput";
import Alert from "@/views/utils/Alert";
import {trans} from "@/modules/i18n"

import {reactive, defineComponent} from "vue";
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

export default defineComponent({
    name: "LoginForm",
    components: {
        Button,
        TextInput,
        Alert,
    },
    emits: ['error'],
    setup(props, {emit}) {
        const router = useRouter();
        const store = useStore();
        const form = reactive({
            email: null,
            password: null,
        })
        const state = reactive({
            error: null,
        })
        async function onFormSubmit() {
            const payload = {
                email: form.email,
                password: form.password,
            };
            state.error = null;
            try {
                await AuthService.login(payload);
                const authUser = await store.dispatch("auth/getCurrentUser");
                if (authUser) {
                    await store.dispatch("auth/setGuest", {value: "isNotGuest"});
                    await router.push("/dashboard");
                } else {
                    throw Error(
                        "Unable to fetch user after login, check your API settings."
                    );
                }
            } catch (error) {
                state.error = apiUtils.getError(error);
                emit('error', state.error);
            }
        }
        return {
            onFormSubmit,
            form,
            state,
            trans
        }
    }
});
</script>
