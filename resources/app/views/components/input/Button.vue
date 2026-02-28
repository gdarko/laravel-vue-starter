<template>
    <router-link v-if="$props.to" :class="classes" :to="$props.to">
        <template v-if="$props.icon"><Icon :name="$props.icon" class="mr-1 h-4 w-4"/></template>
        {{ $props.label }}
    </router-link>
    <button v-else :type="type" :class="classes" @click="onClick" :disabled="disabled">
        <template v-if="$props.icon"><Icon :name="$props.icon" class="mr-1 h-4 w-4"/></template>
        {{ $props.label }}
    </button>
</template>

<script>

import {computed, defineComponent} from "vue";
import Icon from "@/views/components/icons/Icon";

export default defineComponent({
    components: {Icon},
    props: {
        label: {
            type: String,
            default: "Submit",
        },
        type: {
            type: String,
            default: "submit",
        },
        icon: {
            type: String,
            default: "",
        },
        class: {
            type: String,
            default: "",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        theme: {
            type: String,
            default: ""
        },
        to: {
            type: String,
            default: null,
        }
    },
    emits: ['click'],
    setup(props, {emit}) {

        function onClick(event) {
            emit('click', event);
        }

        const classes = computed(() => {
            let value = 'btn btn-sm';
            switch (props.theme) {
                case 'success':
                    value += ' btn-success';
                    break;
                case 'info':
                    value += ' btn-info';
                    break;
                case 'warning':
                    value += ' btn-warning';
                    break;
                case 'danger':
                case 'error':
                    value += ' btn-error';
                    break;
                case 'outline':
                    value += ' btn-outline btn-primary';
                    break;
                default:
                    value += ' btn-primary';
                    break;
            }

            if (props.class) {
                value += ' ' + props.class;
            }

            return value;
        });

        return {
            onClick,
            classes
        }
    }
});
</script>
