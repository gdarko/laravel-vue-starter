<template>
    <div>
        <Alert :error="error" :message="message" @closed="error = null; message = null;" class="mb-4"/>
        <form @submit.prevent="forgotPassword">
            <TextInput type="email" label="Email" name="email" v-model="email" autocomplete="email" placeholder="luke@jedi.com" class="mb-4"/>
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

export default {
    name: "ForgotPasswordForm",
    components: {
        Button,
        TextInput,
        Alert,
    },
    data() {
        return {
            email: null,
            error: null,
            message: null,
        };
    },
    methods: {
        forgotPassword() {
            this.error = null;
            this.message = null;
            const payload = {
                email: this.email,
            };
            AuthService.forgotPassword(payload)
                .then((response) => (this.message = response.data.message))
                .catch((error) => (this.error = getError(error)));
        },
    },
};
</script>
