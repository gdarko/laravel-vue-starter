<template>
    <component :is="iconComponent" v-if="iconComponent" :class="['inline-block shrink-0 h-5 w-5', props.class]" />
</template>

<script>
import {computed, defineComponent} from "vue";
import {
    Bars3Icon,
    XMarkIcon,
    ChevronUpIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
    HomeIcon,
    CloudArrowUpIcon,
    FunnelIcon,
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    ArrowDownTrayIcon,
    EnvelopeIcon,
    PaperClipIcon,
    UsersIcon,
    ArrowRightStartOnRectangleIcon,
    Squares2X2Icon,
    SunIcon,
    MoonIcon,
} from '@heroicons/vue/24/outline';

const iconMap = {
    'bars': Bars3Icon,
    'times': XMarkIcon,
    'close': XMarkIcon,
    'angle-up': ChevronUpIcon,
    'angle-down': ChevronDownIcon,
    'caret-up': ChevronUpIcon,
    'caret-down': ChevronDownIcon,
    'angle-right': ChevronRightIcon,
    'angle-left': ChevronLeftIcon,
    'home': HomeIcon,
    'cloud-upload': CloudArrowUpIcon,
    'filter': FunnelIcon,
    'plus': PlusIcon,
    'edit': PencilSquareIcon,
    'trash': TrashIcon,
    'save': ArrowDownTrayIcon,
    'envelope': EnvelopeIcon,
    'paperclip': PaperClipIcon,
    'tachometer': Squares2X2Icon,
    'users': UsersIcon,
    'sign-out': ArrowRightStartOnRectangleIcon,
    'sun': SunIcon,
    'moon': MoonIcon,
};

export default defineComponent({
    name: "Icon",
    props: {
        name: {
            type: String,
            default: "",
        },
        class: {
            type: String,
            default: "",
        },
    },
    setup(props) {
        const iconComponent = computed(() => iconMap[props.name] || null);
        return {
            props,
            iconComponent,
        }
    }
});
</script>
