<template>
    <form @submit.prevent="onFormSubmit">
        <Alert :message="state.message" :error="state.error" @closed="state.message = null; state.error = null" class="mb-4"/>
        <div class="mb-2">
            <label for="password" class="text-sm text-gray-500">{{ trans('users.labels.current_password') }}</label>
            <input type="password" id="current-password" v-model="form.currentPassword" class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div class="mb-2">
            <label for="password" class="text-sm text-gray-500">{{ trans('users.labels.new_password') }}</label>
            <input type="password" id="password" v-model="form.password" class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div class="mb-4">
            <label for="password-confirm" class="text-sm text-gray-500">{{ trans('users.labels.confirm_password') }}</label>
            <input type="password" id="password-confirm" v-model="form.passwordConfirm" class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <Button type="submit" :text="trans('global.buttons.save')"/>
    </form>
</template>

<script>
import {getError} from "@/utils/helpers";
import AuthService from "@/services/AuthService";
import Alert from "@/components/utils/Alert";
import Button from "@/components/utils/Button";
import {trans} from "@/modules/i18n";

import {reactive, defineComponent} from "vue";

export default defineComponent({
    name: "AccountPassword",
    components: {
        Button,
        Alert,
    },
    setup() {
        const form = reactive({
            currentPassword: null,
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
                current_password: form.currentPassword,
                password: form.password,
                password_confirmation: form.passwordConfirm,
            };
            AuthService.updatePassword(payload)
                .then((response) => (state.message = 'Password updated successfully.'))
                .catch((error) => (state.error = getError(error)));
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
