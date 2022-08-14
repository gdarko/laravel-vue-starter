<template>
    <button :type="type" @click="onClick" :class="$props.class">
        {{ text }}
    </button>
</template>

<script>

import {defineComponent} from "vue";

export default defineComponent({
    name: "Button",
    props: {
        type: {
            type: String,
            default: "submit",
        },
        text: {
            type: String,
            default: "Submit",
        },
        class: {
            type: String,
            default: "px-4 py-1.5 border border-transparent text-sm rounded-xl shadow-sm text-white bg-theme-600 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-500 text-center transition",
        },
    },
    setup(props, {emit}) {
        function onClick(event) {
            emit('click', event.target.value);
        }
        return {
            onClick
        }
    }
});
</script>
