<template>
    <div aria-label="Pagination" class="flex items-center justify-between py-4">
        <p class="text-sm text-gray-500">
            Page {{ meta.current_page }} of {{ meta.last_page }} </p>
        <div class="flex">
            <button rel="first" type="button" @click="firstPage" v-if="links.prev" class="px-2.5 py-1.5 m-1 text-sm text-pink-400 border rounded hover:text-pink-500">
                First
            </button>
            <button rel="prev" type="button" @click="prevPage" :class="{ 'rounded-r': !links.next }" v-if="links.prev" class="px-2.5 py-1.5 m-1 text-sm text-pink-400 border rounded hover:text-pink-500">
                Previous
            </button>
            <button rel="next" type="button" @click="nextPage" :class="{ 'rounded-l': !links.prev }" v-if="links.next" class="px-2.5 py-1.5 m-1 text-sm text-pink-400 border rounded hover:text-pink-500">
                Next
            </button>
            <button rel="last" type="button" @click="lastPage" v-if="links.next" class="px-2.5 py-1.5 m-1 text-sm text-pink-400 border rounded hover:text-pink-500">
                Last
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        meta: {
            type: Object,
            required: true,
        },
        links: {
            type: Object,
            required: true,
        },
    },
    methods: {
        firstPage() {
            this.$emit('page-change', 1);
        },
        prevPage() {
            this.$emit('page-change', this.meta.current_page - 1);
        },
        nextPage() {
            this.$emit('page-change', this.meta.current_page + 1);
        },
        lastPage() {
            this.$emit('page-change', this.meta.last_page);
        },
    },
};
</script>
