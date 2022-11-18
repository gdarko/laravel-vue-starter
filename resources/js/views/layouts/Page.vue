<template>

    <div class="p-5 mt-4 xl:px-0">

        <Alert class="mb-4"/>

        <div class="grid grid-cols-2 mb-3" v-if="$props.title || $props.backTo">
            <div v-if="$props.title">
                <h2 class="bold text-2xl">{{ $props.title }}</h2>
            </div>
            <div v-if="$props.backTo">
                <div class="actions float-right">
                    <Button type="route" :to="$props.backTo" icon="fa fa-chevron-left" :text="trans('global.buttons.back')"></Button>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import {defineComponent} from "vue";
import {trans} from "@/helpers/i18n";
import Button from "@/views/components/input/Button";
import Alert from "@/views/components/Alert";

export default defineComponent({
    name: "Page",
    components: {Alert, Button},
    props: {
        title: {
            type: String,
            default: "",
        },
        backTo: {
            type: String,
            default: "",
        },
    },
    setup() {
        return {
            trans
        }
    }
})
</script>
