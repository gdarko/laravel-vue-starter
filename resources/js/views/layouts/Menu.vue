<template>
    <ul class="space-y-2">
        <template v-for="item in $props.state.mainMenu">
            <li v-if="item.hasOwnProperty('children') && item.children.length > 0 && isEnabled(item, $props.type)">
                <button @click.prevent="state.currentExpandedMenuItem  ? state.currentExpandedMenuItem = null : state.currentExpandedMenuItem = item" type="button" class="transition duration-75 group w-full flex items-center p-2 text-base font-normal text-white font-semibold rounded-lg hover:text-theme-300 hover:bg-theme-800 dark:hover:bg-theme-800" :class="isActive(item) ? 'bg-theme-800' : ''">
                    <Icon :name="item.icon" class="mr-2 text-3xl pl-2 -mt-1"/>
                    <span class="flex-1 text-left" v-html="item.name"></span>
                    <Icon :name="JSON.stringify(state.currentExpandedMenuItem) === JSON.stringify(item) ? 'angle-up' : 'angle-down'" class="mr-2 text-3xl pl-2 -mt-1"/>
                </button>
                <ul id="dropdown-example" class="py-2 space-y-2" :class="JSON.stringify(state.currentExpandedMenuItem) === JSON.stringify(item) ? '' : 'hidden'">
                    <template v-for="subitem in item.children">
                        <template v-if="isEnabled(subitem, $props.type)">
                            <li v-if="subitem.hasOwnProperty('onClick')">
                                <router-link :to="subitem.to ? subitem.to : '#'" @click.prevent="subitem.onClick" class="flex items-center p-2 pl-11 w-full text-base font-normal text-white font-semibold rounded-lg hover:text-theme-300 hover:bg-theme-800 dark:hover:bg-theme-800" :class="isActive(subitem) ? 'bg-theme-800' : ''">
                                    {{ subitem.name }}
                                    <span class="sr-only" v-html="subitem.name"></span>
                                </router-link>
                            </li>
                            <li v-else>
                                <router-link :to="subitem.to ? subitem.to : '#'" class="flex items-center p-2 pl-11 w-full text-base font-normal text-white font-semibold rounded-lg hover:text-theme-300 hover:bg-theme-800 dark:hover:bg-theme-800" :class="isActive(subitem) ? 'bg-theme-800' : ''">
                                    {{ subitem.name }}
                                    <span class="sr-only" v-html="subitem.name"></span>
                                </router-link>
                            </li>
                        </template>
                    </template>

                </ul>
            </li>
            <li v-else-if="isEnabled(item, $props.type)">
                <a v-if="item.hasOwnProperty('onClick') && !item.to" href="#" class="flex items-center p-2 text-base font-normal text-white font-semibold rounded-lg hover:text-theme-300 hover:bg-theme-800 dark:hover:bg-theme-800" @click.prevent="item.onClick">
                    <Icon :name="item.icon" class="mr-2 text-3xl pl-2 -mt-1"/>
                    <span class="ml-1" v-html="item.name"></span>
                    <span class="sr-only" v-html="item.name"></span>
                    <span v-if="item.hasOwnProperty('label') && item.label" class="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300" v-html="item.label"></span>
                </a>
                <router-link v-else :to="item.to ? item.to : '#'" class="flex items-center p-2 text-base font-normal text-white font-semibold rounded-lg hover:text-theme-300 hover:bg-theme-800 dark:hover:bg-theme-800" :class="isActive(item) ? 'bg-theme-800' : ''">
                    <Icon :name="item.icon" class="mr-2 text-3xl pl-2 -mt-1"/>
                    <span class="ml-1" v-html="item.name"></span>
                    <span class="sr-only" v-html="item.name"></span>
                    <span v-if="item.hasOwnProperty('label') && item.label" class="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300" v-html="item.label"></span>
                </router-link>
            </li>
        </template>
    </ul>
</template>

<script>

import {defineComponent} from "vue";
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores";
import Icon from "@/views/components/icons/Icon"

export default defineComponent({
    name: "Menu",
    components: {
        Icon
    },
    props: {
        state: {
            type: Object,
            default: {},
        },
        type: {
            type: String,
            default: '',
        }
    },
    setup(props) {

        const router = useRouter();
        const authStore = useAuthStore();

        function isActive(obj) {

            let currentPath = router.currentRoute.value.path;
            let isActiveMainItem = obj.to === currentPath;
            let isActiveSubItem = false;
            if (obj.hasOwnProperty('children')) {
                for (let i in obj.children) {
                    if (obj.children[i].to === currentPath) {
                        isActiveSubItem = true;
                        break;
                    }
                }
            }
            return isActiveMainItem || isActiveSubItem;
        }

        function isEnabled(obj, type) {

            if (!obj) {
                return false;
            }

            let hasPermission = obj.hasOwnProperty('requiresAbility') && false !== obj.requiresAbility ? authStore.hasAbilities(obj.requiresAbility) : true;

            let totalEnabledSubItems = 0;
            if (obj.hasOwnProperty('children')) {
                for (let i in obj.children) {
                    if (isEnabled(obj.children[i], type)) {
                        totalEnabledSubItems++;
                    }
                }
            } else {
                totalEnabledSubItems = 1;
            }

            if (type === 'desktop') {
                return hasPermission && obj.showDesktop && totalEnabledSubItems > 0;
            } else if (type === 'mobile') {
                return hasPermission && obj.showMobile && totalEnabledSubItems > 0;
            }
            return false;
        }

        return {
            isEnabled,
            isActive
        }
    }
});
</script>
