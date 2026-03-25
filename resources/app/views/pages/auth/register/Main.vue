<template>
    <Auth>
        <h2 class="text-xl font-bold text-base-content">{{ trans('global.pages.register') }}</h2>
        <p class="text-sm text-base-content/50 mt-1 mb-6">{{ trans('global.phrases.register_desc') }}</p>
        <RegisterForm/>
        <div class="divider text-xs text-base-content/30 my-4">or</div>
        <router-link to="/login" class="btn btn-outline btn-block btn-sm">
            {{ trans('global.phrases.login_ask') }} {{ trans('global.buttons.login') }}
        </router-link>
    </Auth>
</template>

<script>
import {default as RegisterForm} from "@/views/pages/auth/register/Form";
import {trans} from "@/helpers/i18n"
import Auth from "@/views/layouts/Auth";

export default {
    name: "RegisterView",
    components: { Auth, RegisterForm },
    setup() {
        return { trans }
    }
};
</script>
