<template>
    <div>
        <!-- Welcome banner -->
        <div class="bg-gradient-to-r from-primary to-teal-600 rounded-2xl p-8 mb-6 text-white relative overflow-hidden">
            <div class="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
            <div class="absolute right-20 bottom-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2"></div>
            <div class="relative">
                <p class="text-white/70 text-sm font-medium mb-1">Welcome back,</p>
                <h1 class="text-3xl font-bold mb-2">{{ authStore.user.full_name }}</h1>
                <p class="text-white/60 text-sm max-w-md">{{ trans('global.phrases.inspire') }}</p>
            </div>
        </div>

        <!-- Quick actions -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <router-link to="/panel/users/list" class="group card bg-base-100 shadow-sm hover:shadow-md transition-all border border-base-300/50 hover:border-primary/30">
                <div class="card-body p-5 flex-row items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon name="users" class="h-6 w-6 text-primary"/>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="font-semibold text-base-content">{{ trans('global.pages.users') }}</h3>
                        <p class="text-xs text-base-content/50 mt-0.5">{{ trans('global.phrases.all_records') }}</p>
                    </div>
                    <Icon name="angle-right" class="h-4 w-4 text-base-content/20 group-hover:text-primary transition-colors"/>
                </div>
            </router-link>

            <router-link to="/panel/users/create" class="group card bg-base-100 shadow-sm hover:shadow-md transition-all border border-base-300/50 hover:border-secondary/30">
                <div class="card-body p-5 flex-row items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                        <Icon name="plus" class="h-6 w-6 text-secondary"/>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="font-semibold text-base-content">{{ trans('global.buttons.add_new') }}</h3>
                        <p class="text-xs text-base-content/50 mt-0.5">{{ trans('global.pages.users_create') }}</p>
                    </div>
                    <Icon name="angle-right" class="h-4 w-4 text-base-content/20 group-hover:text-secondary transition-colors"/>
                </div>
            </router-link>

            <router-link to="/panel/profile" class="group card bg-base-100 shadow-sm hover:shadow-md transition-all border border-base-300/50 hover:border-accent/30">
                <div class="card-body p-5 flex-row items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <Icon name="edit" class="h-6 w-6 text-accent"/>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="font-semibold text-base-content">{{ trans('global.pages.profile') }}</h3>
                        <p class="text-xs text-base-content/50 mt-0.5">{{ trans('global.buttons.update') }}</p>
                    </div>
                    <Icon name="angle-right" class="h-4 w-4 text-base-content/20 group-hover:text-accent transition-colors"/>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import {computed, defineComponent} from 'vue';
import {trans} from "@/helpers/i18n";
import Icon from "@/views/components/icons/Icon";
import {useAuthStore} from "@/stores/auth";

export default defineComponent({
    components: {
        Icon
    },
    setup() {
        const authStore = useAuthStore();

        return {
            trans,
            authStore,
        }
    }
});
</script>
