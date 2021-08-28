<template>
    <div>
        <FlashMessage :error="error" :message="message" @closed="error = null; message = null;" class="mb-4"/>
        <form @submit.prevent="forgotPassword">
            <BaseInput type="email" label="Email" name="email" v-model="email" autocomplete="email" placeholder="luke@jedi.com" class="mb-4"/>
            <BaseButton type="submit" text="Send"/>
        </form>
    </div>
</template>

<script>
import {getError} from "@/utils/helpers";
import BaseButton from "@/components/utils/BaseButton";
import BaseInput from "@/components/utils/BaseInput";
import AuthService from "@/services/AuthService";
import FlashMessage from "@/components/utils/FlashMessage";

export default {
    name: "ForgotPasswordForm",
    components: {
        BaseButton,
        BaseInput,
        FlashMessage,
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
