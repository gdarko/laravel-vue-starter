<template>
    <Teleport to="body">
        <dialog class="modal" :class="{'modal-open': $props.isShowing}">
            <div class="modal-box max-w-lg relative">
                <button v-if="$props.showClose" class="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 z-10" @click.prevent="onClose">✕</button>
                <template v-if="$props.isLoading">
                    <div class="py-16 text-center">
                        <Spinner/>
                    </div>
                </template>
                <template v-else>
                    <h3 v-if="$props.title" class="font-bold text-lg mb-4 pr-8">{{ $props.title }}</h3>
                    <slot></slot>
                </template>
            </div>
            <form method="dialog" class="modal-backdrop" @click="onClose">
                <button>close</button>
            </form>
        </dialog>
    </Teleport>
</template>

<script>
import {defineComponent} from "vue";
import Spinner from "@/views/components/icons/Spinner.vue";

export default defineComponent({
    components: {Spinner},
    emits: ['update:isShowing', 'close'],
    props: {
        title: {
            type: String,
            default: '',
        },
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
