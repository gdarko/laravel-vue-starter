<template>
    <Panel :title="trans('users.labels.password_settings')">
        <form @submit.prevent="onFormSubmit">
            <div class="mb-2">
                <label for="password" class="text-sm text-gray-500">{{ trans('users.labels.current_password') }}</label>
                <input type="password" id="current-password" :required="true" v-model="form.currentPassword" class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div class="mb-2">
                <label for="password" class="text-sm text-gray-500">{{ trans('users.labels.new_password') }}</label>
                <input type="password" id="password" :required="true" v-model="form.password" class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div class="mb-4">
                <label for="password-confirm" class="text-sm text-gray-500">{{ trans('users.labels.confirm_password') }}</label>
                <input type="password" id="password-confirm" :required="true" v-model="form.passwordConfirm" class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <Button type="submit" :label="trans('global.buttons.update')"/>
        </form>
    </Panel>
</template>

<script>

import AuthService from "@/services/AuthService";
import {trans} from "@/helpers/i18n";
import {reactive, defineComponent} from "vue";
import {useAlertStore} from "@/stores";
import {getResponseError} from "@/helpers/api";
import Button from "@/views/components/input/Button";
import Panel from "@/views/components/Panel";

export default defineComponent({
    components: {
        Panel,
        Button,
    },
    setup() {

        const authService = new AuthService();
        const alertStore = useAlertStore();
        const form = reactive({
            currentPassword: null,
            password: null,
            passwordConfirm: null,
        })

        function onFormSubmit() {
            const payload = {
                current_password: form.currentPassword,
                password: form.password,
                password_confirmation: form.passwordConfirm,
            };
            authService.updatePassword(payload)
                .then((response) => (alertStore.success(trans('global.phrases.password_updated'))))
                .catch((error) => (alertStore.error(getResponseError(error))));
        }

        return {
            onFormSubmit,
            form,
            trans
        }
    }
});
</script>
