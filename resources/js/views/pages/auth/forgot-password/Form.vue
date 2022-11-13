<template>
    <div>
        <FormAlert class="mb-4"/>
        <form @submit.prevent="onFormSubmit">
            <TextInput type="email" :label="trans('users.labels.email')" name="email" v-model="form.email" autocomplete="email" class="mb-4"/>
            <div class="text-center">
                <Button type="submit" :text="trans('global.buttons.send')"/>
            </div>
        </form>
    </div>
</template>

<script>
import apiUtils from "@/utils/api";
import Button from "@/views/utils/Button";
import TextInput from "@/views/utils/TextInput";
import AuthService from "@/services/AuthService";
import Alert from "@/views/utils/Alert";
import {reactive, defineComponent} from "vue";

import {trans} from "@/utils/i18n";
import {useAlertStore} from "@/stores";
import FormAlert from "@/views/utils/FormAlert";

export default defineComponent({
    name: "ForgotPasswordForm",
    components: {
        FormAlert,
        Button,
        TextInput,
        Alert,
    },
    setup() {

        const alertStore = useAlertStore();
        const form = reactive({
            email: null,
        })

        function onFormSubmit() {
            AuthService.forgotPassword({email: form.email})
                .then((response) => (alertStore.success(response.data.message)))
                .catch((error) => (alertStore.error(apiUtils.getError(error))));
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
