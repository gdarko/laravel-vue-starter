<template>
    <!-- Tooltip (teleported to body to escape overflow:hidden) -->
    <Teleport to="body">
        <div v-if="tip.visible" class="fixed z-[9999] px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap bg-base-content text-base-100 shadow-lg pointer-events-none transition-opacity duration-100"
             :style="{top: tip.y + 'px', left: tip.x + 'px'}"
             :class="tip.visible ? 'opacity-100' : 'opacity-0'">
            {{ tip.text }}
        </div>
    </Teleport>
    <ul class="space-y-1">
        <template v-for="item in $props.state.mainMenu">
            <!-- Menu item with children (only show expanded when sidebar open) -->
            <li v-if="item.hasOwnProperty('children') && item.children.length > 0 && isEnabled(item, $props.type) && !$props.collapsed">
                <button @click.prevent="state.currentExpandedMenuItem === item ? state.currentExpandedMenuItem = null : state.currentExpandedMenuItem = item"
                        class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                        :class="isActive(item) ? 'bg-sidebar-content/10 text-sidebar-content' : 'text-sidebar-content/60 hover:text-sidebar-content hover:bg-sidebar-content/5'">
                    <Icon v-if="item.icon" class="h-[18px] w-[18px] shrink-0" :name="item.icon"/>
                    <span class="flex-1 text-left" v-html="item.name"></span>
                    <Icon :name="JSON.stringify(state.currentExpandedMenuItem) === JSON.stringify(item) ? 'angle-up' : 'angle-down'" class="h-3.5 w-3.5 opacity-50"/>
                </button>
                <ul v-show="JSON.stringify(state.currentExpandedMenuItem) === JSON.stringify(item)" class="mt-1 ml-5 pl-3 border-l border-sidebar-content/10 space-y-0.5">
                    <template v-for="subitem in item.children">
                        <li v-if="isEnabled(subitem, $props.type)">
                            <router-link v-if="!subitem.hasOwnProperty('onClick')" :to="subitem.to ? subitem.to : '#'"
                                         class="block px-3 py-1.5 rounded-md text-sm transition-all"
                                         :class="isActive(subitem) ? 'text-sidebar-content bg-sidebar-content/10' : 'text-sidebar-content/50 hover:text-sidebar-content hover:bg-sidebar-content/5'">
                                {{ subitem.name }}
                            </router-link>
                            <a v-else href="#" @click.prevent="subitem.onClick"
                               class="block px-3 py-1.5 rounded-md text-sm text-sidebar-content/50 hover:text-sidebar-content hover:bg-sidebar-content/5 transition-all">
                                {{ subitem.name }}
                            </a>
                        </li>
                    </template>
                </ul>
            </li>

            <!-- Collapsed: item with children shows as icon linking to first child -->
            <li v-else-if="item.hasOwnProperty('children') && item.children.length > 0 && isEnabled(item, $props.type) && $props.collapsed">
                <router-link :to="item.to ? item.to : '#'" @mouseenter="showTip($event, item.name)" @mouseleave="hideTip()" class="flex items-center justify-center w-10 h-10 mx-auto rounded-lg transition-all"
                             :class="isActive(item) ? 'bg-primary text-primary-content shadow-lg shadow-primary/20' : 'text-sidebar-content/60 hover:text-sidebar-content hover:bg-sidebar-content/5'"
>
                    <Icon v-if="item.icon" class="h-[18px] w-[18px]" :name="item.icon"/>
                </router-link>
            </li>

            <!-- Simple menu item -->
            <li v-else-if="isEnabled(item, $props.type)">
                <!-- Collapsed -->
                <template v-if="$props.collapsed">
                    <a v-if="item.hasOwnProperty('onClick') && !item.to" href="#" @click.prevent="item.onClick"
                       @mouseenter="showTip($event, item.name)" @mouseleave="hideTip()" class="flex items-center justify-center w-10 h-10 mx-auto rounded-lg text-sidebar-content/60 hover:text-sidebar-content hover:bg-sidebar-content/5 transition-all"
                       :data-tip="item.name">
                        <Icon v-if="item.icon" class="h-[18px] w-[18px]" :name="item.icon"/>
                    </a>
                    <router-link v-else :to="item.to ? item.to : '#'"
                                 @mouseenter="showTip($event, item.name)" @mouseleave="hideTip()" class="flex items-center justify-center w-10 h-10 mx-auto rounded-lg transition-all"
                                 :class="isActive(item) ? 'bg-primary text-primary-content shadow-lg shadow-primary/20' : 'text-sidebar-content/60 hover:text-sidebar-content hover:bg-sidebar-content/5'"
    >
                        <Icon v-if="item.icon" class="h-[18px] w-[18px]" :name="item.icon"/>
                    </router-link>
                </template>
                <!-- Expanded -->
                <template v-else>
                    <a v-if="item.hasOwnProperty('onClick') && !item.to" href="#" @click.prevent="item.onClick"
                       class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-sidebar-content/60 hover:text-sidebar-content hover:bg-sidebar-content/5 transition-all">
                        <Icon v-if="item.icon" class="h-[18px] w-[18px] shrink-0" :name="item.icon"/>
                        <span v-html="item.name"></span>
                    </a>
                    <router-link v-else :to="item.to ? item.to : '#'"
                                 class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                                 :class="isActive(item) ? 'bg-primary text-primary-content shadow-lg shadow-primary/20' : 'text-sidebar-content/60 hover:text-sidebar-content hover:bg-sidebar-content/5'">
                        <Icon v-if="item.icon" class="h-[18px] w-[18px] shrink-0" :name="item.icon"/>
                        <span v-html="item.name"></span>
                    </router-link>
                </template>
            </li>
        </template>
    </ul>
</template>

<script>

import {defineComponent, reactive} from "vue";
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
        },
        collapsed: {
            type: Boolean,
            default: false,
        }
    },
    setup(props) {

        const router = useRouter();
        const authStore = useAuthStore();

        const tip = reactive({ visible: false, text: '', x: 0, y: 0 });

        function showTip(event, text) {
            const rect = event.currentTarget.getBoundingClientRect();
            tip.text = text;
            tip.x = rect.right + 10;
            tip.y = rect.top + rect.height / 2 - 12;
            tip.visible = true;
        }

        function hideTip() {
            tip.visible = false;
        }

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
            if (!obj) return false;

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
            isActive,
            tip,
            showTip,
            hideTip,
        }
    }
});
</script>

