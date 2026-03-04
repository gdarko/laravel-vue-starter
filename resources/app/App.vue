<template>
    <div v-if="authStore.user && authStore.user.hasOwnProperty('id')" class="drawer lg:drawer-open">
        <input id="main-drawer" type="checkbox" class="drawer-toggle" v-model="state.isMobileMenuOpen"/>

        <div class="drawer-content flex flex-col min-h-screen bg-base-200">
            <!-- Top navbar -->
            <div class="navbar bg-base-100 border-b border-base-300/50 sticky top-0 z-10 px-6 min-h-[3.5rem] h-14">
                <div class="flex-none lg:hidden">
                    <label for="main-drawer" class="btn btn-ghost btn-sm btn-square">
                        <Icon name="bars" class="h-5 w-5"/>
                    </label>
                </div>
                <div class="flex-1"></div>
                <div class="flex-none flex items-center gap-2">
                    <button class="btn btn-ghost btn-sm btn-circle" @click="toggleTheme" :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
                        <Icon :name="isDark ? 'sun' : 'moon'" class="h-[18px] w-[18px]"/>
                    </button>
                    <div class="dropdown dropdown-end">
                        <div tabindex="0" role="button" class="flex items-center gap-3 cursor-pointer select-none hover:opacity-80 transition-opacity py-1 px-2 rounded-xl hover:bg-base-200">
                            <div class="w-9 h-9 rounded-full shrink-0 flex items-center justify-center bg-gradient-to-br from-primary to-teal-400 text-white overflow-hidden" v-if="!authStore.user.avatar_thumb_url">
                                <span class="text-xs font-bold leading-none">{{ authStore.user.first_name?.charAt(0) }}{{ authStore.user.last_name?.charAt(0) }}</span>
                            </div>
                            <div class="w-9 h-9 rounded-full shrink-0 overflow-hidden" v-else>
                                <img class="w-full h-full object-cover" :src="authStore.user.avatar_thumb_url" :alt="authStore.user.full_name">
                            </div>
                            <div class="hidden sm:block text-left">
                                <p class="text-sm font-semibold leading-tight">{{ authStore.user.full_name }}</p>
                                <p class="text-[11px] text-base-content/40">{{ authStore.user.email }}</p>
                            </div>
                            <Icon name="angle-down" class="h-3 w-3 text-base-content/30 hidden sm:block"/>
                        </div>
                        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-xl z-50 w-56 p-2 shadow-xl border border-base-300/50 mt-2">
                            <li class="menu-title text-xs px-1 pt-1 pb-2">
                                <span class="font-normal text-base-content/50">{{ authStore.user.email }}</span>
                            </li>
                            <li>
                                <router-link to="/panel/profile" class="rounded-lg">
                                    <Icon name="users" class="h-4 w-4 opacity-50"/>
                                    {{ trans('global.pages.profile') }}
                                </router-link>
                            </li>
                            <div class="divider my-1 h-0"></div>
                            <li>
                                <a href="#" @click.prevent="onLogout" class="rounded-lg text-error hover:bg-error/10">
                                    <Icon name="sign-out" class="h-4 w-4"/>
                                    {{ trans('global.phrases.sign_out') }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <main class="flex-grow p-4 lg:p-8">
                <router-view/>
            </main>

            <footer class="py-4 px-6 text-center text-xs text-base-content/30 border-t border-base-300/30" v-html="trans('global.phrases.copyright')"></footer>
        </div>

        <!-- Sidebar -->
        <div class="drawer-side z-20">
            <label for="main-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <aside class="min-h-full flex flex-col bg-sidebar text-sidebar-content border-r border-sidebar-content/10 transition-all duration-200"
                   :class="sidebarCollapsed ? 'w-16 overflow-visible' : 'w-64'">
                <!-- Logo area -->
                <div class="h-14 flex items-center border-b border-sidebar-content/10"
                     :class="sidebarCollapsed ? 'justify-center px-2' : 'px-6'">
                    <router-link class="flex items-center gap-2 hover:opacity-90 transition-opacity" to="/panel/dashboard">
                        <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                            <span class="text-primary-content font-bold text-sm">{{ state.app.name?.charAt(0) }}</span>
                        </div>
                        <span v-if="!sidebarCollapsed" class="text-sidebar-content font-semibold text-base tracking-tight">{{ state.app.name }}</span>
                    </router-link>
                </div>

                <!-- Navigation -->
                <nav class="flex-grow pt-6 pb-4" :class="[sidebarCollapsed ? 'px-2 overflow-visible' : 'px-3 overflow-y-auto']">
                    <p v-if="!sidebarCollapsed" class="px-3 mb-3 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-sidebar-content/25">Menu</p>
                    <Menu :state="state" :type="'desktop'" :collapsed="sidebarCollapsed"/>
                </nav>

                <!-- Collapse toggle -->
                <button @click="toggleSidebar"
                        class="hidden lg:flex items-center justify-center h-10 border-t border-sidebar-content/10 text-sidebar-content/40 hover:text-sidebar-content/80 hover:bg-sidebar-content/5 transition-all">
                    <Icon :name="sidebarCollapsed ? 'angle-right' : 'angle-left'" class="h-4 w-4"/>
                </button>
            </aside>
        </div>
    </div>
    <template v-else>
        <router-view/>
    </template>
    <Toast/>
</template>

<script>
import {computed, onBeforeMount, onMounted, reactive, ref} from "vue";

import {trans} from '@/helpers/i18n';
import Menu from "@/views/layouts/Menu";
import Icon from "@/views/components/icons/Icon";
import AvatarIcon from "@/views/components/icons/Avatar";
import Toast from "@/views/components/Toast";
import {useAuthStore} from "@/stores/auth";
import {useGlobalStateStore} from "@/stores";
import {useRoute} from "vue-router";
import {useToastStore} from "@/stores/toast";
import {getAbilitiesForRoute} from "@/helpers/routing";

export default {
    name: "app",
    components: {
        AvatarIcon,
        Menu,
        Icon,
        Toast,
    },
    setup() {

        const toastStore = useToastStore();
        const authStore = useAuthStore();
        const globalStateStore = useGlobalStateStore();
        const route = useRoute();

        // Dark mode
        const isDark = ref(localStorage.getItem('theme') === 'dark');

        function applyTheme() {
            document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light');
        }

        function toggleTheme() {
            isDark.value = !isDark.value;
            localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
            applyTheme();
        }

        applyTheme();

        // Sidebar collapse
        const sidebarCollapsed = ref(localStorage.getItem('sidebarCollapsed') === 'true');

        function toggleSidebar() {
            sidebarCollapsed.value = !sidebarCollapsed.value;
            localStorage.setItem('sidebarCollapsed', sidebarCollapsed.value);
        }

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
                    requiresAbility: getAbilitiesForRoute(['users.list']),
                    to: '/panel/users/list',
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
            headerLeftLink: null,
            footerLeftLink: null,
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
                toastStore.success(trans('global.phrases.email_verified'));
            }
        });

        return {
            state,
            authStore,
            globalStateStore,
            isDark,
            toggleTheme,
            sidebarCollapsed,
            toggleSidebar,
            trans,
            onLogout,
            isLoading,
        }
    }
};
</script>
