<template>
    <div class="max-w-lg p-5 m-auto">
        <h2 class="mb-4 text-xl font-bold text-center">{{ trans('global.pages.reset_password') }}</h2>
        <ResetPasswordForm class="p-5 bg-white border rounded shadow"/>
    </div>
</template>

<script>
import {default as ResetPasswordForm} from "@/views/pages/auth/reset-password/Form";
import {trans} from "@/modules/i18n"

export default {
    name: "ResetPassword",
    components: {
        ResetPasswordForm
    },
    setup() {
        return {
            trans
        }
    }
};
</script>
