<template>
    <div :style="style" :class="$props.class">
        <label :for="name" class="text-sm text-gray-500" :class="{ 'sr-only': !showLabel }" v-if="label">
            {{ label }}<span class="text-red-600" v-if="$props.required">*</span>
        </label>
        <vSelect :filtering="$props.server === null" :id="$props.name" :name="$props.name" :multiple="$props.multiple ? 'multiple' : false" :options="selectOptions" :required="required" v-model="value" @placeholder="$props.placeholder" @search="handleSearch">
            <li slot="list-footer" class="pagination" v-if="$props.server">
                <button @click="currentOffset -= $props.serverPerPage">Prev</button>
                <button @click="currentOffset += $props.serverPerPage">Next</button>
            </li>
        </vSelect>
    </div>
</template>

<script>

import {computed, defineComponent, ref, onBeforeMount} from "vue";

import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import SearchService from "@/services/SearchService";

export default defineComponent({
    components: {vSelect},
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
        }
    },
    emits: ['update:modelValue', 'input'],
    setup(props, {emit}) {

        let selectOptionsArr = ref(props.options);
        let currentOffset = ref(0);
        let lastResponses = {};

        const selectOptions = computed(() => {
            let val = [];
            for (let i in selectOptionsArr.value) {
                if (typeof selectOptionsArr.value[i] === 'object') {
                    val[i] = selectOptionsArr.value[i];
                } else {
                    val[i] = {label: selectOptionsArr.value[i], value: i};
                }
            }
            return val;
        });

        const value = computed({
            get() {
                return props.modelValue;
            },
            set(newValue) {
                let input = newValue;
                emit("update:modelValue", input);
                emit('input', input);
            },
        })

        function handleSearch(search, loading) {
            if (!props.server) {
                return;
            }
            if(loading) {
                loading(true);
            }
            const service = new SearchService(props.server);
            let nextPage = lastResponses.hasOwnProperty(search)
            && lastResponses[search].hasOwnProperty('meta')
            && lastResponses[search].meta.hasOwnProperty('current_page') ? lastResponses[search].meta.current_page + 1 : 1;
            service.begin(search, nextPage, props.serverPerPage).then((response) => {
                if(loading) {
                    loading(true);
                }
                lastResponses[search] = response.data;
                selectOptionsArr.value = [];
                for (let i in response.data.data) {
                    selectOptionsArr.value[response.data.data[i].id] = {
                        label: response.data.data[i].title,
                        value: response.data.data[i].id
                    }
                }
            }).catch((error) => {
                if(loading) {
                    loading(false);
                }
            })
        }

        onBeforeMount(() => {
            if(props.server) {
                handleSearch("");
            }
        })

        return {
            value,
            selectOptions,
            handleSearch,
            currentOffset
        }
    }
});
</script>

<style scoped>
.pagination {
    display: flex;
    margin: 0.25rem 0.25rem 0;
}
.pagination button {
    flex-grow: 1;
}
.pagination button:hover {
    cursor: pointer;
}
</style>
