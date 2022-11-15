<template>
    <label v-if="$props.showLabel" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="file_input">{{ $props.label }}<span class="text-red-600" v-if="$props.required">*</span></label>
    <input class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" :aria-describedby="$props.name + '-info'" :id="$props.name" v-model="modelValue" :multiple="$props.multiple" @input="onInput" type="file">
    <p v-if="$props.info !== ''" class="mt-1 text-sm text-gray-500 dark:text-gray-300" :id="$props.name + '-info'">{{ $props.info }}</p>
</template>

<script>

import {defineComponent} from "vue";

export default defineComponent({
    name: "FileInput",
    inheritAttrs: false,
    props: {
        class: String,
        style: [String, Object],
        name: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            default: "",
        },
        info: {
            type: String,
            default: "",
        },
        modelValue: {
            type: [String, Number],
        },
        showLabel: {
            type: Boolean,
            default: true,
        },
        required: {
            type: Boolean,
            default: false,
        },
        multiple: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['update:modelValue'],
    setup(props, {emit}) {
        function onInput(event) {
            emit("update:modelValue", event.target.value);
        }

        return {
            onInput
        }
    }
});
</script>
