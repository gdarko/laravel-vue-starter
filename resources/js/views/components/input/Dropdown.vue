<template>
    <div :style="style" :class="$props.class">
        <label :for="name" class="text-sm text-gray-500" :class="{ 'sr-only': !showLabel }" v-if="label">
            {{ label }}<span class="text-red-600" v-if="$props.required">*</span>
        </label>
        <select :id="name" :value="modelValue" :required="required" @input="onInput" class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option v-if="placeholder" disabled>{{ placeholder }}</option>
            <option v-for="(item, index) in options" :value="index">{{ item }}</option>
        </select>
    </div>
</template>

<script>

import {defineComponent} from "vue";

export default defineComponent({
    name: "Dropdown",
    inheritAttrs: false,
    props: {
        class: String,
        style: [String, Object],
        name: {
            type: String,
            required: true,
        },
        options: {
            required: true,
        },
        label: {
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
        placeholder: {
            type: String,
            default: null,
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
