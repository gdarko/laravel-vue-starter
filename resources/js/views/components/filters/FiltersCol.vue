<template>
    <div class="relative w-full text-left">
        <label v-if="$props.name" class="flex text-sm not-italic items-center font-medium text-gray-800 whitespace-nowrap justify-between">
            <span>{{ $props.name }} <span class="text-sm text-red-500" v-if="$props.required">*</span></span>
        </label>
        <div class="flex flex-col mt-1">
            <slot></slot>
        </div>
    </div>
</template>

<!--<div tabindex="-1" class="p-0 relative mx-auto w-full flex items-center justify-end box-border cursor-pointer border border-gray-200 rounded-md bg-white text-sm leading-snug outline-none max-h-10 w-full" label-value="name">
<input type="text" class="w-full absolute inset-0 outline-none appearance-none box-border border-0 text-sm font-sans bg-white rounded-md pl-3.5">
</div>-->

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
            required:false,
            default:false,
        }
    }
});
</script>
