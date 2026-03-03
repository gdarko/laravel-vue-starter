<template>
    <dialog class="modal" :class="{'modal-open': $props.isShowing}">
        <div class="modal-box max-w-2xl">
            <button v-if="$props.showClose" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click.prevent="onClose">✕</button>
            <template v-if="$props.isLoading">
                <div class="py-10 text-center">
                    <Spinner/>
                </div>
            </template>
            <slot v-else></slot>
        </div>
        <form method="dialog" class="modal-backdrop" @click="onClose">
            <button>close</button>
        </form>
    </dialog>
</template>

<script>
import {defineComponent} from "vue";
import Spinner from "@/views/components/icons/Spinner.vue";

export default defineComponent({
    components: {Spinner},
    emits: ['update:isShowing', 'close'],
    props: {
        type: {
            type: String,
            default: 'simple',
        },
        isShowing: {
            type: Boolean,
            default: false
        },
        isLoading: {
            type: Boolean,
            default: false
        },
        showClose: {
            type: Boolean,
            default: true
        }
    },
    setup(props, {emit}) {
        function onClose() {
            emit('close')
        }
        return {
            onClose,
        }
    }
});
</script>
