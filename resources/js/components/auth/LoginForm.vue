<template>
    <div>
        <Alert :error="state.error" @closed="state.error = null;" class="mb-4"/>
        <form @submit.prevent="onFormSubmit">
            <TextInput type="email" label="Email" name="email" v-model="form.email" autocomplete="email" placeholder="luke@jedi.com" class="mb-2"/>
            <TextInput type="password" label="Password" name="password" v-model="form.password" class="mb-4"/>
            <div class="flex justify-between">
                <Button type="submit" text="Login"/>
                <router-link to="/forgot-password" class="text-sm base-link">
                    Forgot your password?
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>
import {getError} from "@/utils/helpers";
import AuthService from "@/services/AuthService";
import Button from "@/components/utils/Button";
import TextInput from "@/components/utils/TextInput";
import Alert from "@/components/utils/Alert";

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
                state.error = getError(error);
                emit('error', state.error);
            }
        }
        return {
            onFormSubmit,
            form,
            state
        }
    }
});
</script>
