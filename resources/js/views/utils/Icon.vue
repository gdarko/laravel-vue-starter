<template>
    <i class="fa" :class="'fa-' + props.name + ' ' + props.class"></i>
</template>

<script>

import {defineComponent} from "vue";

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
        return {
            props
        }
    }
});
</script>
