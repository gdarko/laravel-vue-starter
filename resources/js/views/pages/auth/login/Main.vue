<template>
    <Auth>
        <h2 class="font-bold text-2xl text-[#002D74]">{{ trans('global.pages.login') }}</h2>
        <p class="text-sm mt-4 mb-4 text-[#002D74]">
            {{ trans('global.phrases.login_desc') }}
        </p>
        <LoginForm/>
        <div class="mt-5 text-sm border-b border-[#002D74] py-4 text-[#002D74]">
            <router-link to="/forgot-password" class="text-sm base-link">
                {{ trans('global.phrases.forgot_password_ask') }}
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
import {default as LoginForm} from "@/views/pages/auth/login/Form";

import {trans} from "@/helpers/i18n"
import Auth from "@/views/layouts/Auth";

export default {
    name: "LoginView",
    components: {
        Auth,
        LoginForm,
    },
    setup() {
        return {
            trans,
        }
    }
};
</script>
