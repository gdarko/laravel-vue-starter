<template>
    <Page>
        <DataTable v-if="table" :title="trans('global.pages.users')" :headers="table.headers" :sorting="table.sorting" :actions="table.actions" :records="table.records" :pagination="table.pagination" :loading="table.isLoading" @page-changed="goToPage" @action="onAction" @search="onSearch" @sort="onSort">
            <template v-slot:content-id="props">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <img v-if="props.item.avatar_url" :src="props.item.avatar_url" class="h-10 w-10 rounded-full" alt=""/>
                        <Avatar v-else class="w-10 h-10 text-gray-400 rounded-full"/>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                            {{ props.item.full_name }}
                        </div>
                        <div class="text-sm text-gray-500">
                            {{ trans('users.labels.id') + ': ' + props.item.id }}
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:content-status="props">
                <span v-if="props.item.email_verified" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{{
                        trans('users.status.verified')
                    }}</span>
                <span v-else class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">{{
                        trans('users.status.not_verified')
                    }}</span>
            </template>
            <template v-slot:content-role="props">
                {{ props.item.is_admin ? trans('users.roles.admin') : trans('users.roles.regular') }}
            </template>
        </DataTable>
    </Page>
</template>

<script>

import {trans} from "@/helpers/i18n";
import UserService from "@/services/UserService";
import {useRoute, useRouter} from 'vue-router'
import {watch, computed, onMounted, defineComponent, reactive} from 'vue';
import {useAlertStore} from "@/stores";
import alertHelpers from "@/helpers/alert";
import {getResponseError, prepareQuery} from "@/helpers/api";
import Page from "@/views/layouts/Page";
import DataTable from "@/views/components/DataTable";
import Avatar from "@/views/components/icons/Avatar";

export default defineComponent({
    components: {
        Page,
        DataTable,
        Avatar
    },
    setup() {
        const route = useRoute();
        const router = useRouter();

        const alertStore = useAlertStore();

        const currentPage = computed(() => {
            let page = route.query.page;
            return page ? page : 1;
        });

        const tableState = reactive({
            search: '',
            sort: '',
        });

        const service = new UserService();

        const table = reactive({
            headers: {
                id: trans('users.labels.id_pound'),
                first_name: trans('users.labels.first_name'),
                last_name: trans('users.labels.last_name'),
                email: trans('users.labels.email'),
                status: trans('users.labels.status'),
                role: trans('users.labels.role'),
            },
            sorting: {
                first_name: true,
                last_name: true
            },
            pagination: {
                meta: null,
                links: null,
            },
            actions: {
                edit: {
                    id: 'edit',
                    name: trans('global.actions.edit'),
                    icon: "fa fa-edit",
                    showName: false,
                    to: '/users/{id}/edit'
                },
                delete: {
                    id: 'delete',
                    name: trans('global.actions.delete'),
                    icon: "fa fa-trash",
                    showName: false,
                    danger: true,
                }
            },
            records: null,
            isLoading: false,
        })

        function onSort(params) {
            tableState.sort = params;
        }

        function onSearch(value) {
            tableState.search = value;
        }

        function onAction(params) {
            switch (params.action.id) {
                case 'delete':
                    alertHelpers.confirmDanger(function () {
                        service.delete(params.item.id).then(function (response) {
                            fetchPage({page: currentPage.value});
                        });
                    })
                    break;
            }
        }

        function goToPage(page) {
            const query = {...route.query, page: page};
            router.replace({query});
        }

        function fetchPage(params) {
            table.records = [];
            table.isLoading = true;
            service
                .index(prepareQuery(params))
                .then((response) => {
                    table.records = response.data.data;
                    table.pagination.meta = response.data.meta;
                    table.pagination.links = response.data.links;
                    setTimeout(() => { table.isLoading = false; }, 200);
                })
                .catch((error) => {
                    alertStore.error(getResponseError(error));
                    setTimeout(() => { table.isLoading = false; }, 200);
                });
        }

        onMounted(() => {
            fetchPage({page: route.query.page ? route.query.page : 1})
        })

        watch(route, (newV, oldV) => {
            (newV.name === 'users') && fetchPage({page: newV.query.page ? newV.query.page : 1});
        })

        watch(tableState, (newTableState) => {
            fetchPage({page: 1, search: newTableState.search, sort: newTableState.sort});
        });

        return {
            table,
            goToPage,
            trans,
            onAction,
            onSearch,
            onSort
        }

    },
});
</script>
