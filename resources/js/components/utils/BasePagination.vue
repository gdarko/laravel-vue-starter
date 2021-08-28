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
        action: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            default: null,
        },
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
            this.$store.dispatch(this.action, this.links.first).then(() => {
                if (this.path) {
                    this.$router.push({
                        path: this.path,
                        query: {page: 1},
                    });
                }
            });
        },
        prevPage() {
            this.$store.dispatch(this.action, this.links.prev).then(() => {
                if (this.path) {
                    this.$router.push({
                        path: this.path,
                        query: {page: this.meta.current_page - 1},
                    });
                }
            });
        },
        nextPage() {
            this.$store.dispatch(this.action, this.links.next).then(() => {
                if (this.path) {
                    this.$router.push({
                        path: this.path,
                        query: {page: this.meta.current_page + 1},
                    });
                }
            });
        },
        lastPage() {
            this.$store.dispatch(this.action, this.links.last).then(() => {
                if (this.path) {
                    this.$router.push({
                        path: this.path,
                        query: {page: this.meta.last_page},
                    });
                }
            });
        },
    },
};
</script>
