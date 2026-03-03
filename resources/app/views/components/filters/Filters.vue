<template>
    <div class="card bg-base-100 shadow-sm border border-base-300/50 mb-4">
        <div class="card-body p-4 md:p-5">
            <div class="flex items-center justify-between mb-3">
                <h4 class="text-sm font-semibold text-base-content/70">
                    <Icon name="filter" class="h-3.5 w-3.5 inline-block -mt-0.5 mr-1"/>
                    Filters
                </h4>
                <button class="btn btn-ghost btn-xs text-base-content/50 hover:text-error" @click="onClear">
                    <Icon name="times" class="h-3 w-3"/>
                    {{ $props.clear_text }}
                </button>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import {defineComponent} from "vue";
import {trans} from "@/helpers/i18n";
import Icon from "@/views/components/icons/Icon";

export default defineComponent({
    components: {Icon},
    props: {
        clear_text: {
            type: String,
            required: false,
            default: trans('global.phrases.clear_filters'),
        }
    },
    emits: ['clear'],
    setup(props, {emit}) {

        function onClear() {
            emit("clear");
        }

        return {
            onClear,
            trans
        }
    }
});
</script>
