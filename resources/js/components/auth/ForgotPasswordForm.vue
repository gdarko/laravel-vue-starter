<template>
    <div>
        <Alert :error="state.error" :message="state.message" @closed="state.message = null; state.error = null;" class="mb-4"/>
        <form @submit.prevent="onFormSubmit">
            <TextInput type="email" label="Email" name="email" v-model="form.email" autocomplete="email" class="mb-4"/>
            <Button type="submit" text="Send"/>
        </form>
    </div>
</template>

<script>
import {getError} from "@/utils/helpers";
import Button from "@/components/utils/Button";
import TextInput from "@/components/utils/TextInput";
import AuthService from "@/services/AuthService";
import Alert from "@/components/utils/Alert";
import {reactive, defineComponent} from "vue";

export default defineComponent({
    name: "ForgotPasswordForm",
    components: {
        Button,
        TextInput,
        Alert,
    },
    setup() {
        const state = reactive({
            message: null,
            error: null,
        })
        const form = reactive({
            email: null,
        })

        function onFormSubmit() {
            state.message = null;
            state.error = null;
            AuthService.forgotPassword({email: form.email})
                .then((response) => (state.message = response.data.message))
                .catch((error) => (state.error = getError(error)));
        }

        return {
            onFormSubmit,
            form,
            state
        }
    },
});
</script>
