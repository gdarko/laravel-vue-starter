<template>
    <ul class="space-y-2">
        <template v-for="item in $props.state.mainMenu">
            <li v-if="item.hasOwnProperty('subitems') && item.subitems.length > 0">
                <button @click.prevent="state.currentExpandedMenuItem  ? state.currentExpandedMenuItem = null : state.currentExpandedMenuItem = item" type="button" class="transition duration-75 group w-full flex items-center p-2 text-base font-normal text-white font-semibold rounded-lg hover:text-theme-300 hover:bg-theme-800 dark:hover:bg-theme-800" :class="isActive(item) ? 'bg-theme-800' : ''">
                    <Icon :name="item.icon" class="mr-2 text-3xl pl-2 -mt-1"/>
                    <span class="flex-1 text-left" v-html="item.name"></span>
                    <Icon :name="JSON.stringify(state.currentExpandedMenuItem) === JSON.stringify(item) ? 'angle-up' : 'angle-down'" class="mr-2 text-3xl pl-2 -mt-1"/>
                </button>
                <ul id="dropdown-example" class="py-2 space-y-2" :class="JSON.stringify(state.currentExpandedMenuItem) === JSON.stringify(item) ? '' : 'hidden'">
                    <li v-for="subitem in item.subitems">
                        <router-link v-if="isEnabled(subitem, $props.user, $props.type)" :to="subitem.to ? subitem.to : '#'" @click.prevent="subitem.hasOwnProperty('onClick') ?? subitem.onClick" class="flex items-center p-2 pl-11 w-full text-base font-normal text-white font-semibold rounded-lg hover:text-theme-300 hover:bg-theme-800 dark:hover:bg-theme-800" :class="isActive(subitem) ? 'bg-theme-800' : ''">
                            {{ subitem.name }}
                            <span class="sr-only" v-html="subitem.name"></span>
                        </router-link>
                    </li>
                </ul>
            </li>
            <li v-else>
                <router-link v-if="isEnabled(item, $props.user, $props.type)" :to="item.to ? item.to : '#'" @click.prevent="item.hasOwnProperty('onClick') ?? item.onClick" class="flex items-center p-2 text-base font-normal text-white font-semibold rounded-lg hover:text-theme-300 hover:bg-theme-800 dark:hover:bg-theme-800" :class="isActive(item) ? 'bg-theme-800' : ''">
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
import Icon from "@/views/utils/Icon";
import {useRoute, useRouter} from "vue-router";

export default defineComponent({
    name: "Menu",
    components:{
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
        },
        user: {
            type: Object,
            default: {},
        },
    },
    setup(props) {

        const router = useRouter();

        function isActive(obj) {
            let currentPath = router.currentRoute.value.path;
            let isActiveMainItem = obj.to === currentPath;
            let isActiveSubItem = false;
            if(obj.hasOwnProperty('subitems')) {
                for(let i in obj.subitems) {
                    if(obj.subitems[i].to === currentPath) {
                        isActiveSubItem = true;
                        break;
                    }
                }
            }
            return isActiveMainItem || isActiveSubItem;
        }

        function isEnabled(obj, user, type) {

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

        return {
            router,
            isEnabled,
            isActive
        }
    }
});
</script>
