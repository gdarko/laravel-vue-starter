<template>
    <transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-show="$props.isShowing" class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20">
                <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
                </div>
                <div class="m-8 inline-block align-middle w-full max-w-2xl transform transition-all">
                    <button v-if="$props.showClose" aria-label="close" class="absolute z-10 bg-white rounded-full py-2 px-2 -top-5 -right-5 cursor-pointer focus:outline-none" @click.prevent="onClose">
                        <svg class="h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                    <div>
                        <template v-if="$props.isLoading">
                            <div class="pt-10 pb-6 text-center">
                                <Spinner/>
                            </div>
                        </template>
                        <slot v-else></slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import {defineComponent} from "vue";
import Panel from "@/views/components/Panel.vue";
import TextInput from "@/views/components/input/TextInput.vue";
import Button from "@/views/components/input/Button.vue";
import Spinner from "@/views/components/icons/Spinner.vue";

export default defineComponent({
    components: {Spinner, Button, TextInput, Panel},
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
