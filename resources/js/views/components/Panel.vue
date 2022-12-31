<template>
    <div class="shadow overflow-hidden border-b border-gray-200 mb-8 sm:rounded-lg">
        <div class="min-w-full divide-y divide-gray-200">
            <div v-if="$props.title" class="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $props.title }}
            </div>
            <div class="whitespace-nowrap bg-white" :class="$props.bodyPadding ? 'px-6 py-4' : ''">
                <template v-if="isElementLoading">
                    <div class="pt-10 pb-6 text-center">
                        <Spinner/>
                    </div>
                </template>
                <slot v-else></slot>
            </div>
        </div>
    </div>
</template>

<script>
import {computed, defineComponent} from "vue";
import Spinner from "@/views/components/icons/Spinner";
import {useGlobalStateStore} from "@/stores";
import {storeToRefs} from "pinia";

export default defineComponent({
    components: {Spinner},
    props: {
        id: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            default: "",
        },
        isLoading: {
            type: Boolean,
            default: false,
        },
        bodyPadding: {
            type: Boolean,
            default: true,
        }
    },
    setup(props) {

        const isElementLoading = computed(() => {
            return useGlobalStateStore().loadingElements[props.id] || props.isLoading;
        });

        return {
            isElementLoading
        }
    }
})
</script>
