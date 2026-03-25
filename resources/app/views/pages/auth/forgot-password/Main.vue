<template>
    <Auth>
        <h2 class="text-xl font-bold text-base-content">{{ trans('global.pages.forgot_password') }}</h2>
        <p class="text-sm text-base-content/50 mt-1 mb-6">{{ trans('global.phrases.forgot_password_desc') }}</p>
        <ForgotPasswordForm/>
        <div class="divider text-xs text-base-content/30 my-4">or</div>
        <div class="flex flex-col gap-3">
            <router-link to="/login" class="text-sm text-center link link-hover text-base-content/50">
                {{ trans('global.phrases.forgot_password_login') }}
            </router-link>
            <router-link to="/register" class="btn btn-outline btn-block btn-sm">
                {{ trans('global.phrases.register_ask') }} {{ trans('global.buttons.register') }}
            </router-link>
        </div>
    </Auth>
</template>

<script>
import {default as ForgotPasswordForm} from "@/views/pages/auth/forgot-password/Form";
import {trans} from "@/helpers/i18n"
import Auth from "@/views/layouts/Auth";

export default {
    name: "ForgotPassword",
    components: { Auth, ForgotPasswordForm },
    setup() {
        return { trans }
    }
};
</script>
