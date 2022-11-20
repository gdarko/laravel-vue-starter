<template>
    <div class="shadow overflow-hidden border-b border-gray-200 mb-8 sm:rounded-lg">
        <div class="min-w-full divide-y divide-gray-200">
            <div v-if="$props.title" class="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $props.title }}
            </div>
            <div class="whitespace-nowrap bg-white" :class="$props.bodyPadding ? 'px-6 py-4' : ''">
                <template v-if="isLoading">
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
import {defineComponent, computed} from "vue";
import Spinner from "@/views/components/icons/Spinner";
import {useGlobalStateStore} from "@/stores";

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
        disableLoading: {
            type: Boolean,
            default: false,
        },
        bodyPadding: {
            type: Boolean,
            default: true,
        }
    },
    setup(props) {
        const globalStateStore = useGlobalStateStore();
        const isLoading = computed(() => {
            return !props.disableLoading && globalStateStore.loading[props.id];
        })
        return {
            isLoading
        }
    }
})
</script>
