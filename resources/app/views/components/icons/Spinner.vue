<template>
    <div class="inline-flex flex-col items-center gap-2">
        <span class="loading loading-spinner loading-md text-primary"></span>
        <span v-if="text" :class="{'block w-full': textNewLine}" class="text-sm">{{ text }}</span>
    </div>
</template>

<script>
import {defineComponent} from "vue";
import {trans} from "@/helpers/i18n"

export default defineComponent({
    name: "Spinner",
    props: {
        text: {
            type: String,
            required: false,
            default: trans('global.phrases.loading'),
        },
        textNewLine: {
            type: Boolean,
            required: false,
            default: true,
        },
    }
});
</script>
