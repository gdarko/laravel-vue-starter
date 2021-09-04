<template>
    <div>
        <button type="button" class="inline-flex items-center text-sm leading-6 font-medium rounded-md transition ease-in-out duration-150 cursor-not-allowed" disabled="">
            <SpinnerIcon/> {{ text }}
        </button>
    </div>
</template>

<script>
import SpinnerIcon from "@/components/icons/SpinnerIcon";

import {defineComponent} from "vue";

export default defineComponent({
    components: {
        SpinnerIcon
    },
    name: "Spinner",
    props: {
        text: {
            type: String,
            required: false,
            default: 'Loading',
        },
    }
});
</script>
