<template>
    <div class="bg-gray-100 flex" v-if="authStore.user && authStore.user.hasOwnProperty('id')">
        <aside class="relative bg-theme-600 h-screen w-64 hidden sm:block shadow-xl">
            <div class="p-6 border-b border-theme-600">
                <router-link class="text-white text-3xl font-semibold uppercase hover:text-gray-300" to="/panel/dashboard">
                    <template v-if="state.app.logo">
                        <img :src="state.app.logo" :alt="state.app.name"/>
                    </template>
                    <template v-else>
                        {{ state.app.name }}
                    </template>
                </router-link>
                <template v-if="state.headerLeftLink">
                    <a v-if="state.headerLeftLink.href" :href="state.headerLeftLink.href" class="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                        <Icon :name="state.headerLeftLink.icon" class="mr-3"/>
                        {{ state.headerLeftLink.name }}
                    </a>
                    <router-link v-else :to="state.headerLeftLink.to" class="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                        <Icon :name="state.headerLeftLink.icon" class="mr-3"/>
                        {{ state.headerLeftLink.name }}
                    </router-link>
                </template>
            </div>
            <nav class="text-white text-base py-4 px-3 rounded">
                <Menu :state="state" :type="'desktop'"/>
            </nav>
            <template v-if="state.footerLeftLink">
                <a v-if="state.footerLeftLink.href" :href="state.footerLeftLink.href" class="absolute w-full bottom-0 bg-theme-800 text-white flex items-center justify-center py-4">
                    <Icon :name="state.footerLeftLink.icon" class="mr-3"/>
                    {{ state.footerLeftLink.name }}
                </a>
                <router-link v-else :to="state.footerLeftLink.to">
                    <Icon :name="state.footerLeftLink.icon" class="mr-3"/>
                    {{ state.footerLeftLink.name }}
                </router-link>
            </template>
        </aside>
        <div class="relative w-full flex flex-col h-screen overflow-y-hidden">
            <!-- Desktop Header -->
            <header class="w-full items-center bg-white py-2 px-6 hidden sm:flex">
                <div class="w-1/2"></div>
                <div class="relative w-1/2 flex justify-end">
                    <a class="flex cursor-pointer focus:outline-none align-middle" @click="state.isAccountDropdownOpen = !state.isAccountDropdownOpen">
                        <span class="relative pt-3 mr-2">{{ authStore.user.full_name }} <Icon :name="state.isAccountDropdownOpen ? 'angle-up' : 'angle-down'"/></span>
                        <button class="relative z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
                            <img :alt="authStore.user.full_name" v-if="authStore.user.avatar_thumb_url" :src="authStore.user.avatar_thumb_url">
                            <AvatarIcon v-else/>
                        </button>
                    </a>
                    <button v-if="state.isAccountDropdownOpen" @click="state.isAccountDropdownOpen = false" class="h-full w-full fixed inset-0 cursor-pointer"></button>
                    <div v-if="state.isAccountDropdownOpen" class="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16 z-50">
                        <router-link to="/panel/profile" class="block px-4 py-2 hover:bg-theme-800 hover:text-white hover:opacity-80">
                            {{ trans('global.pages.profile') }}
                        </router-link>
                        <a href="#" @click.prevent="onLogout" class="block px-4 py-2 hover:bg-theme-800 hover:text-white hover:opacity-80">{{
                                trans('global.phrases.sign_out')
                            }}</a>
                    </div>
                </div>
            </header>

            <!-- Mobile Header & Nav -->
            <header class="w-full bg-theme-600 py-5 px-6 sm:hidden">
                <div class="flex items-center justify-between">
                    <router-link class="text-white text-3xl font-semibold uppercase hover:text-gray-300" to="/panel/dashboard">
                        {{ state.app.name }}
                    </router-link>
                    <button @click="state.isMobileMenuOpen = !state.isMobileMenuOpen" class="text-white text-3xl focus:outline-none">
                        <i v-if="!state.isMobileMenuOpen" class="fa fa-bars"></i>
                        <i v-else class="fa fa-times"></i>
                    </button>
                </div>
                <nav :class="state.isMobileMenuOpen ? 'flex': 'hidden'" class="flex flex-col pt-4 text-base text-white">
                    <Menu :state="state" :type="'mobile'"/>
                    <button class="w-full bg-theme-800 text-white font-semibold py-2 mt-3 rounded-lg shadow-lg hover:shadow-xl hover:text-theme-800 hover:bg-gray-300 flex items-center justify-center">
                        <Icon name="paperclip" class="mr-3"/>
                        {{ trans('global.buttons.documentation') }}
                    </button>
                </nav>
            </header>

            <div class="w-full h-screen overflow-x-hidden border-t flex flex-col">
                <main class="w-full flex-grow p-6">
                    <router-view/>
                </main>
                <footer class="w-full bg-white text-center text-sm p-4" v-html="trans('global.phrases.copyright')"></footer>
            </div>

        </div>
    </div>
    <template v-else>
        <router-view/>
    </template>
</template>

<script>
import {computed, onBeforeMount, reactive} from "vue";

import {trans} from '@/helpers/i18n';
import Menu from "@/views/layouts/Menu";
import Icon from "@/views/components/icons/Icon";
import AvatarIcon from "@/views/components/icons/Avatar";
import {useAuthStore} from "@/stores/auth";
import {useGlobalStateStore} from "@/stores";
import {useRoute} from "vue-router";
import {useAlertStore} from "@/stores";
import {getAbilitiesForRoute} from "@/helpers/routing";

export default {
    name: "app",
    components: {
        AvatarIcon,
        Menu,
        Icon
    },
    setup() {

        const alertStore = useAlertStore();
        const authStore = useAuthStore();
        const globalStateStore = useGlobalStateStore();
        const route = useRoute();

        const isLoading = computed(() => {
            var value = false;
            for(var i in globalStateStore.loadingElements) {
                if(globalStateStore.loadingElements[i]){
                    value = true;
                    break;
                }
            }
            return value || globalStateStore.isUILoading;
        })

        const state = reactive({
            mainMenu: [
                {
                    name: trans('global.pages.home'),
                    icon: 'tachometer',
                    showDesktop: true,
                    showMobile: true,
                    requiresAbility: false,
                    to: '/panel/dashboard',
                },
                {
                    name: trans('global.pages.users'),
                    icon: 'users',
                    showDesktop: true,
                    showMobile: true,
                    requiresAbility: getAbilitiesForRoute(['users.list', 'users.create', 'users.edit']),
                    to: '/panel/users/list',
                    children: [
                        {
                            name: trans('global.phrases.all_records'),
                            icon: '',
                            showDesktop: true,
                            showMobile: true,
                            requiresAbility: getAbilitiesForRoute('users.list'),
                            to: '/panel/users/list',
                        },
                        {
                            name: trans('global.buttons.add_new'),
                            icon: '',
                            showDesktop: true,
                            showMobile: true,
                            requiresAbility: getAbilitiesForRoute('users.create'),
                            to: '/panel/users/create',
                        }
                    ]
                },
                {
                    name: trans('global.phrases.sign_out'),
                    icon: 'sign-out',
                    showDesktop: false,
                    showMobile: true,
                    showIfRole: false,
                    onClick: onLogout,
                    to: '',
                }
            ],
            headerLeftLink: {
                name: trans('global.buttons.new_record'),
                icon: 'plus',
                to: '',
                href: '#',
            },
            footerLeftLink: {
                name: trans('global.buttons.documentation'),
                icon: 'paperclip',
                to: '',
                href: '#',
            },
            isAccountDropdownOpen: false,
            isMobileMenuOpen: false,
            currentExpandedMenuItem: null,
            app: window.AppConfig,
        });

        function onLogout() {
            authStore.logout()
        }

        onBeforeMount(() => {
            if (route.query.hasOwnProperty('verified') && route.query.verified) {
                alertStore.success(trans('global.phrases.email_verified'));
            }
        });

        return {
            state,
            authStore,
            globalStateStore,
            trans,
            onLogout,
            isLoading,
        }
    }
};
</script>
