<template>
    <div class="card bg-base-100 shadow border border-base-300/50 mb-8">
        <div class="card-body" :class="$props.bodyPadding ? '' : 'p-0'">
            <h3 v-if="$props.title" class="card-title text-xs uppercase tracking-wider text-base-content/60">{{ $props.title }}</h3>
            <template v-if="isElementLoading">
                <div class="py-10 text-center">
                    <Spinner/>
                </div>
            </template>
            <slot v-else></slot>
        </div>
    </div>
</template>

<script>
import {computed, defineComponent} from "vue";
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
