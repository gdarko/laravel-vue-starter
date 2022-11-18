<template>
    <router-link v-if="$props.type === 'route'" :class="$props.class" :to="$props.to"><template v-if="$props.icon"><i class="mr-1" :class="$props.icon"></i></template> {{ $props.text }}</router-link>
    <a v-else-if="$props.type === 'url'" :class="$props.class" :href="$props.to"><template v-if="$props.icon"><i class="mr-1" :class="$props.icon"></i></template> {{$props.text}}</a>
    <button v-else :type="type" @click="onClick" :class="$props.class">
        <template v-if="$props.icon"><i class="mr-1" :class="$props.icon"></i></template> {{ text }}
    </button>
</template>

<script>

import {defineComponent} from "vue";

export default defineComponent({
    props: {
        type: {
            type: String,
            default: "submit",
        },
        text: {
            type: String,
            default: "Submit",
        },
        icon: {
            type: String,
            default: "",
        },
        class: {
            type: String,
            default: "px-4 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-theme-600 hover:bg-theme-800 focus:bg-theme-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-800 text-center transition",
        },
        to: {
            type: String,
            default: '#',
        }
    },
    setup(props, {emit}) {
        function onClick(event) {
            emit('click', event);
        }

        return {
            onClick
        }
    }
});
</script>
