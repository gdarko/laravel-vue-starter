<template>
    <div>
        <DefaultAlert class="mb-4"/>
        <form @submit.prevent="onFormSubmit">
            <TextInput type="email" :required="true" :label="trans('users.labels.email')" name="email" v-model="form.email" autocomplete="email" class="mb-4"/>
            <div class="text-center">
                <Button type="submit" :text="trans('global.buttons.send')"/>
            </div>
        </form>
    </div>
</template>

<script>
import AuthService from "@/services/AuthService";
import {reactive, defineComponent} from "vue";
import {trans} from "@/helpers/i18n";
import {useAlertStore} from "@/stores";
import apiHelpers from "@/helpers/api";
import Button from "@/views/components/input/Button";
import TextInput from "@/views/components/input/TextInput";
import DefaultAlert from "@/views/components/alerts/DefaultAlert";

export default defineComponent({
    name: "ForgotPasswordForm",
    components: {
        DefaultAlert,
        Button,
        TextInput,
    },
    setup() {

        const authService = new AuthService();
        const alertStore = useAlertStore();
        const form = reactive({
            email: null,
        })

        function onFormSubmit() {
            authService.forgotPassword({email: form.email})
                .then((response) => (alertStore.success(response.data.message)))
                .catch((error) => (alertStore.error(apiHelpers.getError(error))));
        }

        return {
            onFormSubmit,
            form,
            trans
        }
    },
});
</script>
