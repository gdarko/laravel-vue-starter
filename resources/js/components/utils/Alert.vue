<template>
    <div v-if="(message || error)">

        <div v-if="message" class="bg-green-100 border border-green-400 text-green-700 px-4 py-4 rounded relative text-sm" role="alert">
            <strong class="font-bold mr-2">Success!</strong>
            <span class="block sm:inline">{{ message }}</span>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" @click="this.removeMessage">
                <CloseIcon/>
            </span>
        </div>

        <div v-if="error && getType(error) === 'string'" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm" role="alert">
            <strong class="font-bold mr-2">Argh!</strong>
            <span class="block sm:inline">{{ error }}</span>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" @click="this.removeMessage">
                <CloseIcon/>
            </span>
        </div>

        <div v-if="getType(error) === 'object'" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm" role="alert">
            <strong class="font-bold mr-2">Argh!</strong>
            <span class="block sm:inline">Please fix the following problems:</span>
            <ul class="mt-2 list-disc pl-5" key="error-list">
                <li v-for="key in errorKeys" :key="key">
                    {{ getError(key) }}
                </li>
            </ul>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" @click="this.removeMessage">
                <CloseIcon/>
            </span>
        </div>

    </div>
</template>

<script>
import CloseIcon from "@/components/icons/CloseIcon";
export default {
    name: "Alert",
    components: {CloseIcon},
    inheritAttrs: true,
    props: {
        message: {
            type: String,
            default: null,
        },
        error: {
            type: [Object, String],
            default: null,
        },
    },
    computed: {
        errorKeys() {
            if (!this.error || this.getType(this.error) === "string") {
                return null;
            }
            return Object.keys(this.error);
        },
    },
    methods: {
        getError(key) {
            return this.error[key][0];
        },
        getType(obj) {
            return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
        },
        removeMessage() {
            this.$emit('closed')
        }
    }
};
</script>
