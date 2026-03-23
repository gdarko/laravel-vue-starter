<template>
    <div class="toast toast-end toast-top z-50 mt-14">
        <TransitionGroup name="toast">
            <div v-for="toast in toastStore.toasts" :key="toast.id"
                 :class="['alert shadow-lg max-w-sm', alertClass(toast.type)]">
                <div class="flex items-start gap-2 w-full">
                    <Icon :name="iconName(toast.type)" class="h-5 w-5 shrink-0 mt-0.5"/>
                    <span class="text-sm flex-1">{{ toast.text }}</span>
                    <button class="btn btn-ghost btn-xs btn-circle shrink-0 -mr-1 -mt-1" @click="toastStore.remove(toast.id)">
                        <Icon name="times" class="h-3 w-3"/>
                    </button>
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>

<script>
import {defineComponent} from "vue";
import {useToastStore} from "@/stores/toast";
import Icon from "@/views/components/icons/Icon";

export default defineComponent({
    components: {Icon},
    setup() {
        const toastStore = useToastStore();

        function alertClass(type) {
            switch (type) {
                case 'success': return 'alert-success';
                case 'error': return 'alert-error';
                case 'warning': return 'alert-warning';
                case 'info': return 'alert-info';
                default: return '';
            }
        }

        function iconName(type) {
            switch (type) {
                case 'success': return 'save';
                case 'error': return 'times';
                case 'warning': return 'filter';
                case 'info': return 'envelope';
                default: return 'envelope';
            }
        }

        return {
            toastStore,
            alertClass,
            iconName,
        }
    }
});
</script>

<style scoped>
.toast-enter-active {
    transition: all 0.3s ease;
}
.toast-leave-active {
    transition: all 0.2s ease;
}
.toast-enter-from {
    opacity: 0;
    transform: translateX(100%);
}
.toast-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
</style>
