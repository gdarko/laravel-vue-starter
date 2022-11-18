<template>
    <div class="shadow overflow-hidden border-b border-gray-200 mb-8 sm:rounded-lg">
        <div class="min-w-full divide-y divide-gray-200">
            <div class="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" v-if="$props.title">
                {{ $props.title }}
            </div>
            <div class="whitespace-nowrap bg-white" :class="$props.bodyPadding ? 'px-6 py-4' : ''">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
import {defineComponent} from "vue";
export default defineComponent({
    props: {
        title: {
            type: String,
            default: "",
        },
        bodyPadding: {
            type: Boolean,
            default: true,
        }
    }
})
</script>
