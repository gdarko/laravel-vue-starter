<template>
    <span class="badge" :class="classes"><slot></slot></span>
</template>

<script>

import {computed, defineComponent} from "vue";

export default defineComponent({
    props: {
        theme: {
            type: String,
            default: "success",
        },
    },
    setup(props) {
        const classes = computed(() => {
            switch (props.theme) {
                case 'success':
                    return 'badge-success';
                case 'info':
                    return 'badge-info';
                case 'warning':
                    return 'badge-warning';
                case 'danger':
                case 'alert':
                case 'error':
                    return 'badge-error';
                default:
                    return 'badge-primary';
            }
        })

        return {
            classes
        }
    }
});
</script>
