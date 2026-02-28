<template>
    <div :style="style" :class="$props.class">
        <label :for="name" class="label" :class="{ 'sr-only': !showLabel }" v-if="label">
            <span class="label-text">{{ label }}<span class="text-error" v-if="$props.required">*</span></span>
        </label>
        <input v-if="type !== 'textarea'"
               :id="name"
               :type="type"
               :value="modelValue"
               :required="required"
               :disabled="disabled"
               @input="onInput"
               :placeholder="placeholder"
               :autocomplete="autocomplete"
               class="input input-bordered w-full"/>
        <textarea v-else
            :id="name"
            :value="modelValue"
            :required="required"
            :disabled="disabled"
            @input="onInput"
            :placeholder="placeholder"
            :autocomplete="autocomplete"
            class="textarea textarea-bordered w-full"></textarea>
    </div>
</template>

<script>

import {defineComponent} from "vue";

export default defineComponent({
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
        modelValue: {
            default: "",
            type: [String, Number],
        },
        type: {
            type: String,
            default: "text",
        },
        showLabel: {
            type: Boolean,
            default: true,
        },
        required: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: null,
        },
        autocomplete: {
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
