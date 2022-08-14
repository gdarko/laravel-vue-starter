<template>
    <div class="bg-gray-100 font-family-karla flex" v-if="user && user.hasOwnProperty('id')">
        <aside class="relative bg-theme-600 h-screen w-64 hidden sm:block shadow-xl">
            <div class="p-6">
                <router-link class="text-white text-3xl font-semibold uppercase hover:text-gray-300" to="/dashboard">
                   <template v-if="state.app.logo">
                       <img :src="state.app.logo" :alt="state.app.name" />
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
            <nav class="text-white text-base font-semibold pt-3">
                <template v-for="item in state.mainMenu">
                    <router-link v-if="canMenuItemShow(item, user, 'desktop')" :to="item.to ? item.to : '#'" @click.prevent="item.hasOwnProperty('onClick') ?? item.onClick" class="flex items-center text-white opacity-85 hover:opacity-100 py-4 pl-6 nav-item">
                        <Icon :name="item.icon" class="mr-2"/>
                        {{ item.name }}
                        <span class="sr-only" v-html="item.name"></span>
                    </router-link>
                </template>
            </nav>
            <template v-if="state.footerLeftLink">
                <a v-if="state.footerLeftLink.href" :href="state.footerLeftLink.href" class="absolute w-full nav-dark-btn bottom-0 active-nav-link text-white flex items-center justify-center py-4">
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
                        <span class="relative pt-3 mr-2">{{ user.name }} <Icon :name="state.isAccountDropdownOpen ? 'angle-up' : 'angle-down'"/></span>
                        <button class="relative z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
                            <img :alt="user.name" v-if="user.avatar_url" :src="user.avatar_url">
                        </button>
                    </a>
                    <button v-if="state.isAccountDropdownOpen" @click="state.isAccountDropdownOpen = false" class="h-full w-full fixed inset-0 cursor-default"></button>
                    <div v-if="state.isAccountDropdownOpen" class="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
                        <router-link to="/profile" class="block px-4 py-2 dropdown-link hover:opacity-80">{{ trans('global.pages.profile') }}</router-link>
                        <a href="#" @click.prevent="onLogout" class="block px-4 py-2 dropdown-link hover:opacity-80">{{ trans('global.phrases.sign_out') }}</a>
                    </div>
                </div>
            </header>

            <!-- Mobile Header & Nav -->
            <header class="w-full bg-theme-600 py-5 px-6 sm:hidden">
                <div class="flex items-center justify-between">
                    <router-link class="text-white text-3xl font-semibold uppercase hover:text-gray-300" to="/dashboard">
                        {{ state.app.name }}
                    </router-link>
                    <button @click="state.isMobileMenuOpen = !state.isMobileMenuOpen" class="text-white text-3xl focus:outline-none">
                        <i v-if="!state.isMobileMenuOpen" class="fa fa-bars"></i>
                        <i v-else class="fa fa-times"></i>
                    </button>
                </div>

                <!-- Dropdown Nav -->
                <nav :class="state.isMobileMenuOpen ? 'flex': 'hidden'" class="flex flex-col pt-4">
                    <template v-for="item in state.mainMenu">
                        <router-link v-if="canMenuItemShow(item, user, 'mobile')" :to="item.to ? item.to : '#'" class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                            <Icon :name="item.icon" class="mr-2"/>
                            {{ item.name }}
                            <span class="sr-only" v-html="item.name"></span>
                        </router-link>
                    </template>
                    <button class="w-full bg-white bg-theme-800 font-semibold py-2 mt-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                        <Icon name="paperclip" class="mr-3"/>
                        {{ trans('global.buttons.documentation') }}
                    </button>
                </nav>
            </header>

            <div class="w-full h-screen overflow-x-hidden border-t flex flex-col">
                <main class="w-full flex-grow p-6">
                    <router-view/>
                </main>
                <footer class="w-full bg-white text-center text-sm p-4" v-html="trans('global.phrases.copyright')">
                </footer>
            </div>

        </div>
    </div>
    <template v-else>
        <router-view/>
    </template>
</template>

<script>
import {reactive} from "vue";

import {trans} from '@/modules/i18n';
import {useAuth} from "@/modules/auth";
import Icon from "@/views/utils/Icon";
import {useStore} from "vuex";

export default {
    name: "app",
    components: {
        Icon
    },
    setup() {
        const store = useStore();
        const {user} = useAuth();
        const state = reactive({
            mainMenu: [
                {
                    name: trans('global.pages.home'),
                    icon: 'tachometer',
                    showDesktop: true,
                    showMobile: true,
                    showIfRole: false,
                    to: '/dashboard',
                },
                {
                    name: trans('global.pages.users'),
                    icon: 'users',
                    showDesktop: true,
                    showMobile: true,
                    showIfRole: window.AppConfig.roles.admin,
                    to: '/users',
                },
                {
                    name: trans('global.phrases.sign_out'),
                    icon: 'users',
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
            app: window.AppConfig,
        });

        function canMenuItemShow(obj, user, type) {
            if (!obj) {
                return false;
            }
            let roleCheck = (false !== obj.showIfRole) ? parseInt(obj.showIfRole) === parseInt(user.role) : true;
            if (type === 'desktop') {
                return roleCheck && obj.showDesktop;
            } else if (type === 'mobile') {
                return roleCheck && obj.showMobile;
            }
            return false;
        }

        function onLogout() {
            store.dispatch("auth/logout");
        }

        return {
            canMenuItemShow,
            state,
            user,
            trans,
            onLogout,
        }
    }
};
</script>
