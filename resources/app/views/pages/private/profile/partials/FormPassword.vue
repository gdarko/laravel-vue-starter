<template>
    <Panel :title="trans('users.labels.password_settings')">
        <form @submit.prevent="onFormSubmit">
            <div class="mb-2">
                <label for="current-password" class="label">
                    <span class="label-text">{{ trans('users.labels.current_password') }}</span>
                </label>
                <input type="password" id="current-password" :required="true" v-model="form.currentPassword" class="input input-bordered w-full"/>
            </div>
            <div class="mb-2">
                <label for="password" class="label">
                    <span class="label-text">{{ trans('users.labels.new_password') }}</span>
                </label>
                <input type="password" id="password" :required="true" v-model="form.password" class="input input-bordered w-full"/>
            </div>
            <div class="mb-4">
                <label for="password-confirm" class="label">
                    <span class="label-text">{{ trans('users.labels.confirm_password') }}</span>
                </label>
                <input type="password" id="password-confirm" :required="true" v-model="form.passwordConfirm" class="input input-bordered w-full"/>
            </div>
            <Button type="submit" :label="trans('global.buttons.update')"/>
        </form>
    </Panel>
</template>

<script>

import AuthService from "@/services/AuthService";
import {trans} from "@/helpers/i18n";
import {reactive, defineComponent} from "vue";
import {useToastStore} from "@/stores/toast";
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
        const toastStore = useToastStore();
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
                .then((response) => (toastStore.success(trans('global.phrases.password_updated'))))
                .catch((error) => (toastStore.error(getResponseError(error))));
        }

        return {
            onFormSubmit,
            form,
            trans
        }
    }
});
</script>
