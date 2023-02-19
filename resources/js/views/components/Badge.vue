<template>
    <span class="text-sm font-medium mr-2 px-2.5 py-0.5 rounded" :class="classes"><slot></slot></span>
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
            let value = '';
            if (props.hasOwnProperty('class')) {
                value += props.class;
            }
            switch (props.theme) {
                case 'success':
                    value = 'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900';
                    break;
                case 'info':
                    value = 'bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-900';
                    break;
                case 'warning':
                    value = 'bg-orange-100 text-orange-800 dark:bg-orange-200 dark:text-orange-900';
                    break;
                case 'danger':
                case 'alert':
                case 'error':
                    value = 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900';
                    break;
                default:
                    value = 'bg-theme-100 text-theme-800 dark:bg-theme-200 dark:text-theme-900';
                    break;
            }
            return value;
        })

        return {
            classes
        }
    }
});
</script>
