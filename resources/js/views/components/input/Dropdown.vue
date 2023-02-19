<template>
    <div :style="style" :class="$props.class">
        <label :for="name" class="text-sm text-gray-500" :class="{ 'sr-only': !showLabel }" v-if="label">
            {{ label }}<span class="text-red-600" v-if="$props.required">*</span>
        </label>
        <Multiselect track-by="id" label="title" v-model="value" :id="$props.name" :name="$props.name" :disabled="disabled" :placeholder="$props.placeholder" :options="selectOptions" :multiple="$props.multiple" :searchable="!!$props.server" :loading="isLoading" :internal-search="false" :clear-on-select="true" :close-on-select="true" :max-height="400" :show-no-results="false" :hide-selected="true" open-direction="bottom" @search-change="handleSearch">
        </Multiselect>
    </div>
</template>

<script>

import {computed, defineComponent, ref} from "vue";

import SearchService from "@/services/SearchService";
import Multiselect from 'vue-multiselect';

export default defineComponent({
    components: {Multiselect},
    inheritAttrs: false,
    props: {
        class: String,
        style: [String, Object],
        name: {
            type: String,
            required: true,
        },
        options: {
            required: false,
        },
        label: {
            type: String,
            default: "",
        },
        modelValue: {
            type: [Object, String],
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
            default: false
        },
        placeholder: {
            type: String,
            default: null,
        },
        multiple: {
            type: [Boolean, String, Number],
            default: false,
        },
        server: {
            type: String,
            default: null,
        },
        serverPerPage: {
            type: Number,
            default: 5
        },
        serverSearchMinCharacters: {
            type: Number,
            default: 3
        }
    },
    emits: ['update:modelValue', 'input'],
    setup(props, {emit}) {

        let selectOptionsArr = ref(props.options);
        let isLoading = ref(false);

        const selectOptions = computed(() => {
            let val = [];
            for (let i in selectOptionsArr.value) {
                if (typeof selectOptionsArr.value[i] === 'object') {
                    val.push({id: selectOptionsArr.value[i].id, title: selectOptionsArr.value[i].title});
                } else {
                    val.push(selectOptionsArr.value[i])
                }
            }
            return val;
        });

        const value = computed({
            get() {
                return props.modelValue;
            },
            set(newValue) {
                emit("update:modelValue", newValue);
                emit('input', value);
            },
        })

        function handleSearch(search) {
            if (!props.server) {
                return;
            }
            if(search.length < props.serverSearchMinCharacters) {
                return;
            }
            const service = new SearchService(props.server);
            isLoading.value = true;
            service.begin(search, 1, props.serverPerPage).then((response) => {
                selectOptionsArr.value = [];
                for (let i in response.data.data) {
                    selectOptionsArr.value.push({id: response.data.data[i].id, title: response.data.data[i].title});
                }
                isLoading.value = false;
            }).catch((error) => {
                isLoading.value = false;
            })
        }


        return {
            value,
            selectOptions,
            handleSearch,
            isLoading,
        }
    }
});
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style lang="scss">
.multiselect__input {
    max-width: 300px !important;
    border: 0 !important;
}
.multiselect__input:focus, .multiselect__input:active, .multiselect__input:hover {
    border: 0 !important;
    outline: none !important;
    outline-offset: 0 !important;
    box-shadow: none !important;
}
</style>
