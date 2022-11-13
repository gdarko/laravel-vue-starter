<template>
    <form @submit.prevent="onFormSubmit">
        <FormAlert class="mb-4"/>
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
import apiUtils from "@/utils/api";
import AuthService from "@/services/AuthService";
import Button from "@/views/utils/Button";
import {trans} from "@/modules/i18n";

import {reactive, defineComponent} from "vue";
import {useAlertStore} from "@/store";
import FormAlert from "@/views/utils/FormAlert";

export default defineComponent({
    components: {
        FormAlert,
        Button,
    },
    setup() {

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
            AuthService.updatePassword(payload)
                .then((response) => (alertStore.success(trans('global.phrases.password_updated'))))
                .catch((error) => (alertStore.error(apiUtils.getError(error))));
        }

        return {
            onFormSubmit,
            form,
            trans
        }
    }
});
</script>
