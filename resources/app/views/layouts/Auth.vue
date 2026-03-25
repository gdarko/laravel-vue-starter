<template>
    <main class="min-h-screen flex items-center justify-center bg-base-200 px-4 py-12">
        <!-- Decorative background -->
        <div class="fixed inset-0 overflow-hidden pointer-events-none">
            <div class="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        <div class="relative w-full max-w-md">
            <!-- Logo -->
            <div class="text-center mb-8">
                <div class="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-3 shadow-lg shadow-primary/20">
                    <span class="text-primary-content font-bold text-xl">{{ AppConfig.name?.charAt(0) }}</span>
                </div>
                <h1 class="text-2xl font-bold text-base-content">{{ AppConfig.name }}</h1>
            </div>

            <!-- Card -->
            <div class="card bg-base-100 shadow-xl border border-base-300/50">
                <div class="card-body p-8">
                    <slot></slot>
                </div>
            </div>

            <!-- Footer -->
            <p class="text-center text-xs text-base-content/30 mt-6">&copy; {{ new Date().getFullYear() }} {{ AppConfig.name }}. All rights reserved.</p>
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
