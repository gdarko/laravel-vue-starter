<template>
    <div class="p-5 xl:px-0">
        <div class="max-w-xl m-auto">
            <form @submit.prevent="onFormSubmit" class="mb-4">
                <TextInput type="message" :label="trans('messages.name')" name="message" v-model="form.body" class="mb-4"/>
                <div class="flex justify-end mb-2 mt-2">
                    <Button type="submit" :text="trans('global.buttons.send')"/>
                </div>
                <Alert :error="state.error" @closed="state.error = null;"/>
            </form>
            <article class="p-5 bg-white rounded shadow relative" v-if="table.records && table.records.length">
                <ul>
                    <li v-for="(message, index) in table.records" :key="message.id" :class="['flex', 'py-3', 'space-x-2', 'border-b']">
                        <div>
                            <img v-if="message.user.avatar" :src="message.user.avatar_url" class="w-10 h-10 rounded-full" alt=""/>
                            <AvatarIcon v-else class="w-10 h-10 text-gray-400 rounded-full"/>
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
                <Alert v-if="state.error" key="error" :error="state.error" @closed="state.error = null;"/>
                <Pager v-if="table.pagination && table.pagination.meta.last_page > 1" :page-count="table.pagination.meta.last_page" :value="table.pagination.meta.current_page" class="mt-6 mb-6" @input="goToPage"/>
            </article>
        </div>
        <footer class="py-5 text-center">
            <p class="text-gray-400">{{ trans('global.phrases.inspire') }}</p>
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
import SpinnerIcon from "@/components/icons/SpinnerIcon";

import {reactive, onMounted, watch, computed, defineComponent} from 'vue';
import {useRoute, useRouter} from "vue-router";

import {trans} from "@/modules/i18n";

export default defineComponent({
    name: "Dashboard",
    components: {
        SpinnerIcon,
        Pager,
        Spinner,
        Alert,
        AvatarIcon,
        TextInput,
        Button
    },
    setup() {
        const form = reactive({
            body: null,
        })
        const state = reactive({
            loading: true,
            error: null,
        })
        const table = reactive({
            records: null,
            pagination: {
                meta: null,
                links: null
            }
        })
        const route = useRoute();
        const router = useRouter();

        const currentPage = computed(() => {
            let page = route.query.page;
            return page ? page : 1;
        });

        function goToPage(page) {
            state.loading = false;
            const query = {...route.query, page: page};
            router.replace({query});
        }

        function fetchPage(page) {
            state.loading = true;
            page = page || currentPage.value;
            MessageService.getMessages(page).then((response) => {
                table.records = response.data.data;
                table.pagination.meta = response.data.meta;
                table.pagination.links = response.data.links;
            }).catch((error) => {
                state.error = getError(error);
            });
        }

        function onFormSubmit() {
            MessageService.postMessage({body: form.body}).then((response) => {
                state.error = null;
                form.body = null;
                fetchPage()
            }).catch((error) => {
                state.error = getError(error);
            });
        }

        onMounted(() => {
            fetchPage(route.query.page ? route.query.page : 1)
        })

        watch(route, (newV, oldV) => {
            let page = newV.query.page ? newV.query.page : 1;
            fetchPage(page);
        })

        return {
            onFormSubmit,
            goToPage,
            fetchPage,
            form,
            state,
            table,
            trans
        }
    }
});
</script>
