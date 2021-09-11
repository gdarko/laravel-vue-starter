<template>
    <header class="p-5 text-white bg-green-400">
        <nav class="container flex items-center justify-between mx-auto">
            <div v-if="user" class="flex items-center space-x-5">
                <router-link to="/dashboard">
                    <HomeIcon class="w-6 h-6 text-white"/>
                    <span class="sr-only">{{ trans('global.pages.home') }}</span>
                </router-link>
                <router-link to="/users" v-if="user && user.isAdmin">{{ trans('global.pages.users') }}</router-link>
            </div>
            <router-link to="/" v-else>
                <HomeIcon class="w-6 h-6 text-white"/>
            </router-link>
            <div class="inline-flex items-center space-x-5" v-if="user">
                <router-link to="/account">{{ user.name }}</router-link>
                <button type="button" @click="onLogout" class="inline-flex items-center space-x-2">
                    <span class="hidden sm:inline">{{ trans('global.pages.logout') }}</span>
                    <LogoutIcon class="w-6 h-6 text-white"/>
                </button>
            </div>
            <router-link v-else to="/login" class="inline-flex items-center space-x-2">
                <span>{{ trans('global.pages.login') }}</span>
                <LoginIcon class="w-6 h-6 text-white"/>
            </router-link>
        </nav>
    </header>
</template>

<script>

import HomeIcon from "@/components/icons/HomeIcon";
import LoginIcon from "@/components/icons/LoginIcon";
import LogoutIcon from "@/components/icons/LogoutIcon";

import {useAuth} from "@/modules/auth";
import {defineComponent} from 'vue'
import {useStore} from 'vuex';

import {trans} from '@/modules/i18n';

export default defineComponent({
    name: "Header",
    components: {
        HomeIcon,
        LoginIcon,
        LogoutIcon,
    },
    setup() {
        const store = useStore();
        const {user} = useAuth();

        function onLogout() {
            store.dispatch("auth/logout");
        }

        return {
            onLogout,
            store,
            user,
            trans
        }
    }
});
</script>
