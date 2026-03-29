<template>
    <component :is="iconComponent" v-if="iconComponent" :class="['inline-block shrink-0 h-5 w-5', props.class]" />
</template>

<script>
/**
 * Icon wrapper for Heroicons (https://heroicons.com)
 *
 * Usage:  <Icon name="users" class="h-5 w-5" />
 *
 * To add a new icon:
 *   1. Browse all icons at https://heroicons.com
 *   2. Import it from '@heroicons/vue/24/outline' (or /solid, /mini)
 *   3. Add a short name → component entry to the iconMap below
 */
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
    CheckIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    MagnifyingGlassIcon,
    Cog6ToothIcon,
    BellIcon,
    ArrowPathIcon,
    EyeIcon,
    EyeSlashIcon,
    DocumentTextIcon,
    FolderIcon,
    PhotoIcon,
    LinkIcon,
    CalendarIcon,
    ClockIcon,
    MapPinIcon,
    PhoneIcon,
    GlobeAltIcon,
    ShieldCheckIcon,
    KeyIcon,
    LockClosedIcon,
    StarIcon,
    HeartIcon,
    ChatBubbleLeftIcon,
    ArrowUpTrayIcon,
    ArrowDownOnSquareIcon,
    ClipboardDocumentIcon,
    TagIcon,
    BookmarkIcon,
} from '@heroicons/vue/24/outline';

// Browse all 300+ icons at https://heroicons.com
const iconMap = {
    // Navigation
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

    // Actions
    'plus': PlusIcon,
    'edit': PencilSquareIcon,
    'trash': TrashIcon,
    'save': ArrowDownTrayIcon,
    'check': CheckIcon,
    'search': MagnifyingGlassIcon,
    'refresh': ArrowPathIcon,
    'upload': ArrowUpTrayIcon,
    'download': ArrowDownOnSquareIcon,
    'clipboard': ClipboardDocumentIcon,
    'cloud-upload': CloudArrowUpIcon,

    // UI
    'filter': FunnelIcon,
    'sun': SunIcon,
    'moon': MoonIcon,
    'eye': EyeIcon,
    'eye-off': EyeSlashIcon,
    'settings': Cog6ToothIcon,
    'bell': BellIcon,
    'star': StarIcon,
    'heart': HeartIcon,
    'bookmark': BookmarkIcon,
    'tag': TagIcon,

    // Content
    'envelope': EnvelopeIcon,
    'paperclip': PaperClipIcon,
    'document': DocumentTextIcon,
    'folder': FolderIcon,
    'photo': PhotoIcon,
    'link': LinkIcon,
    'chat': ChatBubbleLeftIcon,

    // Status
    'warning': ExclamationTriangleIcon,
    'info': InformationCircleIcon,
    'shield': ShieldCheckIcon,

    // People & Auth
    'users': UsersIcon,
    'sign-out': ArrowRightStartOnRectangleIcon,
    'key': KeyIcon,
    'lock': LockClosedIcon,

    // Time & Place
    'calendar': CalendarIcon,
    'clock': ClockIcon,
    'map-pin': MapPinIcon,
    'phone': PhoneIcon,
    'globe': GlobeAltIcon,

    // Misc
    'tachometer': Squares2X2Icon,
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
