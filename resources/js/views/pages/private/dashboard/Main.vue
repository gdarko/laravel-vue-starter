<template>
    <Page>
        <div class="w-1/2 m-auto">
            <form @submit.prevent="onFormSubmit" class="mb-4">
                <TextInput type="message" :label="trans('messages.name')" name="message" v-model="form.body" class="mb-4"/>
                <div class="flex justify-end mb-2 mt-2">
                    <Button type="submit" :text="trans('global.buttons.send')"/>
                </div>
            </form>
            <article class="p-5 bg-white rounded shadow relative" v-if="table.records && table.records.length">
                <ul>
                    <li v-for="(message, index) in table.records" :key="message.id" :class="['flex', 'py-3', 'space-x-2', index === table.records.length-1 ? '' : 'border-b']">
                        <div>
                            <img v-if="message.user.avatar" :src="message.user.avatar_url" class="w-10 h-10 rounded-full" alt=""/>
                            <Avatar v-else class="w-10 h-10 text-gray-400 rounded-full"/>
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
                <Pager v-if="table.pagination && table.pagination.meta.last_page > 1" :page-count="table.pagination.meta.last_page" :value="table.pagination.meta.current_page" class="mt-6 mb-6" @input="goToPage"/>
            </article>
        </div>
        <footer class="py-5 text-center">
            <p class="text-gray-400">{{ trans('global.phrases.inspire') }}</p>
        </footer>
    </Page>
</template>

<script>
import {reactive, onMounted, watch, computed, defineComponent} from 'vue';
import {useRoute, useRouter} from "vue-router";
import {trans} from "@/helpers/i18n";
import {useAlertStore} from "@/stores";
import MessageService from "@/services/MessageService";
import apiHelpers from "@/helpers/api";
import TextInput from "@/views/components/input/TextInput";
import Button from "@/views/components/input/Button";
import Avatar from "@/views/components/icons/Avatar";
import Spinner from "@/views/components/icons/Spinner";
import Pager from "@/views/components/tables/Pager";
import DefaultAlert from "@/views/components/alerts/DefaultAlert";
import Page from "@/views/layouts/Page";

export default defineComponent({
    components: {
        Page,
        DefaultAlert,
        Pager,
        Spinner,
        Avatar,
        TextInput,
        Button
    },
    setup() {

        const alertStore = useAlertStore();
        const messageService = new MessageService();

        const form = reactive({
            body: null,
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
            const query = {...route.query, page: page};
            router.replace({query});
        }

        function fetchPage(page) {
            page = page || currentPage.value;
            messageService.index({page: page}).then((response) => {
                table.records = response.data.data;
                table.pagination.meta = response.data.meta;
                table.pagination.links = response.data.links;
            }).catch((error) => {
                alertStore.error(apiHelpers.getError(error));
            });
        }

        function onFormSubmit() {
            messageService.store({body: form.body}).then((response) => {
                form.body = null;
                fetchPage()
            }).catch((error) => {
                alertStore.error(apiHelpers.getError(error));
            });
        }

        onMounted(() => {
            fetchPage(route.query.page ? route.query.page : 1)
        })

        watch(route, (newV, oldV) => {
            (newV.name === 'dashboard') && fetchPage(newV.query.page ? newV.query.page : 1);
        })

        return {
            onFormSubmit,
            goToPage,
            fetchPage,
            form,
            table,
            trans
        }
    }
});
</script>
