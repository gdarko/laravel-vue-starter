<template>
    <Auth>
        <h2 class="font-bold text-2xl text-[#002D74]">{{ trans('global.pages.forgot_password') }}</h2>
        <p class="text-sm mt-4 mb-4 text-[#002D74]">
            {{ trans('global.phrases.forgot_password_desc') }}
        </p>
        <ForgotPasswordForm/>
        <div class="mt-5 text-sm border-b border-[#002D74] py-4 text-[#002D74]">
            <router-link to="/login" class="text-sm base-link">
                {{ trans('global.phrases.forgot_password_login') }}
            </router-link>
        </div>

        <div class="mt-3 text-sm flex justify-between items-center text-[#002D74]">
            <p>{{ trans('global.phrases.register_ask') }}</p>
            <router-link to="/register" class="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                {{ trans('global.buttons.register') }}
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
    components: {
        Auth,
        ForgotPasswordForm
    },
    setup() {
        return {
            trans
        }
    }
};
</script>
