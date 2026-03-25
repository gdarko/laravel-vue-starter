<template>
    <Auth>
        <h2 class="text-xl font-bold text-base-content">{{ trans('global.pages.reset_password') }}</h2>
        <p class="text-sm text-base-content/50 mt-1 mb-6">{{ trans('global.phrases.reset_password_desc') }}</p>
        <ResetPasswordForm/>
        <div class="divider text-xs text-base-content/30 my-4">or</div>
        <router-link to="/login" class="btn btn-outline btn-block btn-sm">
            {{ trans('global.phrases.login_ask') }} {{ trans('global.buttons.login') }}
        </router-link>
    </Auth>
</template>

<script>
import {default as ResetPasswordForm} from "@/views/pages/auth/reset-password/Form";
import {trans} from "@/helpers/i18n"
import Auth from "@/views/layouts/Auth";

export default {
    name: "ResetPassword",
    components: { Auth, ResetPasswordForm },
    setup() {
        return { trans }
    }
};
</script>
