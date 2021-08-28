<template>
    <form @submit.prevent="postMessage">
        <BaseInput type="message" label="Message" name="message" v-model="body" class="mb-4"/>
        <div class="flex justify-end mb-2 mt-2">
            <BaseButton type="submit" text="Message"/>
        </div>
        <FlashMessage :error="error" @closed="error = null;"/>
    </form>
</template>

<script>
import {getError} from "@/utils/helpers";
import BaseButton from "@/components/utils/BaseButton";
import BaseInput from "@/components/utils/BaseInput";
import FlashMessage from "@/components/utils/FlashMessage";

export default {
    name: "MessageForm",
    components: {
        BaseButton,
        BaseInput,
        FlashMessage,
    },
    data() {
        return {
            body: null,
            error: null,
        };
    },
    methods: {
        async postMessage() {
            try {
                const payload = {
                    body: this.body,
                };
                this.error = null;
                await this.$store.dispatch("message/postMessage", payload);
                this.body = null;
            } catch (error) {
                this.error = getError(error);
            }
        },
    },
};
</script>
