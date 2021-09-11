<template>
    <div class="max-w-lg p-5 m-auto">
        <h2 class="mb-4 text-xl font-bold text-center">{{ trans('global.pages.forgot_password') }}</h2>
        <ForgotPasswordForm class="p-5 bg-white border rounded shadow"/>
    </div>
</template>

<script>
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import {trans} from "@/modules/i18n"

export default {
    name: "ForgotPassword",
    components: {
        ForgotPasswordForm
    },
    setup() {
        return {
            trans
        }
    }
};
</script>
