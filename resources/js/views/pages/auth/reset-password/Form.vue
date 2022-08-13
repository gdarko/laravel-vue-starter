<template>
    <div>
        <Alert :message="state.message" :error="state.error" @closed="state.message = null; state.error = null;" class="mb-4"/>
        <form @submit.prevent="onFormSubmit">
            <div class="mb-2">
                <label for="email" class="text-sm text-gray-500">{{ trans('users.labels.email') }}</label>
                <input type="email" id="email" v-model="form.email" class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div class="mb-2">
                <label for="password" class="text-sm text-gray-500">{{ trans('users.labels.password') }}</label>
                <input type="password" id="password" v-model="form.password" class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div class="mb-4">
                <label for="password-confirm" class="text-sm text-gray-500">{{ trans('users.labels.confirm_password') }}</label>
                <input type="password" id="password-confirm" v-model="form.passwordConfirm" class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div class="flex justify-between">
                <Button type="submit" :text="trans('global.buttons.submit')"/>
                <router-link to="/login" class="text-sm base-link">
                    {{ trans('global.phrases.already_registered_login') }}
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>
import {getError} from "@/modules/helpers";
import Alert from "@/views/utils/Alert";
import AuthService from "@/services/AuthService";
import Button from "@/views/utils/Button";

import {reactive, defineComponent} from "vue";
import {useRoute} from "vue-router"

import {trans} from "@/modules/i18n"

export default defineComponent({
    name: "ResetPasswordForm",
    components: {
        Button,
        Alert,
    },
    setup() {
        const route = useRoute();
        const form = reactive({
            email: null,
            password: null,
            passwordConfirm: null,
        })
        const state = reactive({
            message: null,
            error: null,
        })

        function onFormSubmit() {
            state.message = null;
            state.error = null;
            const payload = {
                email: form.email,
                password: form.password,
                password_confirmation: form.passwordConfirm,
                token: route.query.token,
            };
            AuthService.resetPassword(payload)
                .then((response) => (state.message = response.data.message))
                .catch((error) => (state.error = getError(error)));
        }

        return {
            onFormSubmit,
            form,
            state,
            trans
        }
    },
});
</script>
