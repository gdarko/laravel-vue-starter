<template>
    <Auth>
        <h2 class="font-bold text-2xl text-[#002D74]">{{ trans('global.pages.reset_password') }}</h2>
        <p class="text-sm mt-4 mb-4 text-[#002D74]">
            {{ trans('global.phrases.reset_password_desc') }}
        </p>
        <ResetPasswordForm/>
        <div class="mt-5 text-sm flex justify-between items-center text-[#002D74] border-t border-[#002D74] pt-3">
            <p>{{ trans('global.phrases.login_ask') }}</p>
            <router-link to="/login" class="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                {{ trans('global.buttons.login') }}
            </router-link>
        </div>
    </Auth>
</template>

<script>
import {default as ResetPasswordForm} from "@/views/pages/auth/reset-password/Form";
import {trans} from "@/helpers/i18n"
import Auth from "@/views/layouts/Auth";

export default {
    name: "ResetPassword",
    components: {
        Auth,
        ResetPasswordForm
    },
    setup() {
        return {
            trans
        }
    }
};
</script>
