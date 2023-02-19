<template>
    <form>
        <template v-if="isElementLoading">
            <div class="pt-10 pb-6 text-center">
                <Spinner/>
            </div>
        </template>
        <slot v-else></slot>
    </form>
</template>
<script>

import {useGlobalStateStore} from "@/stores";
import Spinner from "@/views/components/icons/Spinner";
import {computed, defineComponent, watch} from "vue";

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
        }
    },
    setup(props) {

        const isElementLoading = computed(() => {
            return useGlobalStateStore().loadingElements[props.id] || props.isLoading;
        });

        return {
            isElementLoading,
        }
    }
})
</script>
