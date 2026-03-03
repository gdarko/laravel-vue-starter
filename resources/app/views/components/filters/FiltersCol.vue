<template>
    <div class="w-full">
        <slot></slot>
    </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
    props: {
        name: {
            type: String,
            required: false,
            default: null,
        },
        required: {
            type: Boolean,
            required: false,
            default: false,
        }
    }
});
</script>
