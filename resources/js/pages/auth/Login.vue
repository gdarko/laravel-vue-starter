<template>
    <div class="max-w-lg p-5 m-auto">
        <h2 class="mb-4 text-xl font-bold text-center">{{ trans('global.pages.login') }}</h2>
        <LoginForm class="p-5 bg-white border rounded shadow"/>
        <p class="mt-2 text-center text-gray-500">
            <router-link to="/register" class="text-pink-500 transition hover:text-pink-600">
                {{ trans('global.phrases.register_account') }}
            </router-link>
        </p>
    </div>
</template>

<script>
import LoginForm from "@/components/auth/LoginForm";

import {trans} from "@/modules/i18n"

export default {
    name: "LoginView",
    components: {
        LoginForm,
    },
    setup() {
        return {
            trans
        }
    }
};
</script>
