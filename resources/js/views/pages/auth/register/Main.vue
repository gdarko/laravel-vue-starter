<template>
    <div class="max-w-lg p-5 m-auto">
        <h2 class="mb-4 text-xl font-bold text-center">{{ trans('global.pages.register') }}</h2>
        <RegisterForm class="p-5 bg-white border rounded shadow"/>
    </div>
</template>

<script>
import {default as RegisterForm} from "@/views/pages/auth/register/Form";
import {trans} from "@/modules/i18n"

export default {
    name: "RegisterView",
    components: {
        RegisterForm,
    },
    setup() {
        return {
            trans
        }
    }
};
</script>
