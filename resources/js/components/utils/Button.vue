<template>
    <button :type="type" @click="onClick" class="px-3 py-1.5 border border-transparent text-sm rounded shadow-sm text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-center transition">
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
