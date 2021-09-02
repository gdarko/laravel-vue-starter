<template>
    <div class="p-5 xl:px-0">
        <div class="max-w-xl m-auto">
            <form @submit.prevent="postMessage" class="mb-4">
                <TextInput type="message" label="Message" name="message" v-model="body" class="mb-4"/>
                <div class="flex justify-end mb-2 mt-2">
                    <Button type="submit" text="Message"/>
                </div>
                <Alert :error="error" @closed="error = null;"/>
            </form>
            <article class="p-5 bg-white rounded shadow relative">
                <ul>
                    <li v-for="(message, index) in records" :key="message.id" :class="['flex', 'py-3', 'space-x-2', 'border-b']">
                        <div>
                            <img v-if="message.user.avatar" :src="message.user.avatar" class="w-10 h-10 rounded-full" alt=""/>
                            <AvatarIcon class="w-10 h-10 text-gray-400 rounded-full" v-else/>
                        </div>
                        <div>
                            <div class="flex space-x-2">
                                <span class="font-bold">{{ message.user.name }}</span>
                                <span class="text-gray-400">{{ message.createdAt }}</span>
                            </div>
                            <div class="text-gray-600">{{ message.body }}</div>
                        </div>
                    </li>
                </ul>
                <Alert :error="error" v-if="error" key="error" @closed="error = null;"/>
                <Pager v-if="pagination" class="mt-6 mb-6" :page-count="pagination.meta.last_page" :value="pagination.meta.current_page" @input="updatePage"/>

            </article>

        </div>
        <footer class="py-5 text-center">
            <p class="text-gray-400">
                Let's build something fun. </p>
        </footer>
    </div>
</template>

<script>
import {getError} from "@/utils/helpers";

import Alert from "@/components/utils/Alert";
import AvatarIcon from "@/components/icons/AvatarIcon";
import Spinner from "@/components/utils/Spinner";
import Pager from "@/components/utils/Pager";
import MessageService from "@/services/MessageService";
import TextInput from "@/components/utils/TextInput";
import Button from "@/components/utils/Button";
import SpinnerIcon from "../icons/SpinnerIcon";

export default {
    name: "Messages",
    components: {SpinnerIcon, Pager, Spinner, Alert, AvatarIcon, TextInput, Button},
    data() {
        return {
            body: null,
            loading: true,
            error: null,
            records: null,
            pagination: null
        }
    },
    mounted() {
        this.fetchPage();
    },
    watch: {
        '$route.query.page'() {
            this.fetchPage();
        }
    },
    methods: {
        updatePage(page) {
            this.$router.replace({query: {...this.$route.query, page: page}});
        },
        fetchPage(page) {
            page = page || (parseInt(this.$route.query.page) || 1);
            this.loading = true;
            MessageService.getMessages(page)
                .then((response) => {
                    this.records = response.data.data;
                    this.pagination = {
                        meta: response.data.meta,
                        links: response.data.links,
                    }
                    this.loading = false;
                })
                .catch((error) => {
                    this.error = getError(error);
                });
        },
        async postMessage() {
            const payload = {
                body: this.body,
            };
            MessageService.postMessage(payload).then((response) => {
                this.error = null;
                this.body = null;
                this.fetchPage()
            }).catch((error) => {
                this.error = getError(error);
            })
        },
    }
};
</script>
