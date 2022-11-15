<template>
    <main class="bg-theme-500 flex items-center justify-center min-h-screen">
        <div class="bg-theme-50 flex rounded-2xl shadow-lg max-w-5xl items-center">
            <div class="md:w-1/2 px-8 md:px-16 py-8">
                <slot></slot>
            </div>
            <div class="md:block hidden w-1/2">
                <img :alt="AppConfig.name" class="rounded-2xl" src="/assets/images/login.jpg">
            </div>
        </div>
    </main>
</template>

<script>

import {defineComponent} from 'vue'
import {trans} from '@/helpers/i18n';

export default defineComponent({
    name: "Auth",
    setup() {

        let AppConfig = window.AppConfig;

        return {
            trans,
            AppConfig
        }
    }
});
</script>
