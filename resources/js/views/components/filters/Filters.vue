<template>
    <div class="relative z-10 p-4 md:p-8 bg-gray-200 rounded mb-2">
        <label class="absolute text-sm leading-snug text-gray-900 cursor-pointer hover:text-gray-700 top-2.5 right-3.5" @click="onClear">{{ $props.clear_text }}</label>
        <slot></slot>
    </div>
</template>

<script>
import {defineComponent} from "vue";
import {trans} from "@/helpers/i18n";

export default defineComponent({
    props: {
        clear_text: {
            type: String,
            required: false,
            default: trans('global.phrases.clear_filters'),
        }
    },
    emits: ['clear'],
    setup(props, {emit}) {

        function onClear() {
            emit("clear");
        }

        return {
            onClear,
            trans
        }
    }
});
</script>
