<template>
    <Page :title="page.title" :breadcrumbs="page.breadcrumbs" :actions="page.actions" @action="onPageAction">

        <template #filters v-if="filters">

        </template>

        <template #default>
            <DataTable :id="page.id" v-if="table" :headers="table.headers" :sorting="table.sorting" :actions="table.actions" :records="table.records" :pagination="table.pagination" @page-changed="onTablePageChange" @action="onTableAction" @sort="onTableSort">
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
                    <span v-if="props.item.email_verified_at" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" v-html="trans('users.status.verified')"></span>
                    <span v-else class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800" v-html="trans('users.status.not_verified')"></span>
                </template>
                <template v-slot:content-role="props">
                    {{
                        props.item.roles.map((entry) => {
                            return entry.title
                        }).join(', ')
                    }}
                </template>
            </DataTable>
        </template>
    </Page>
</template>

<script>

import {trans} from "@/helpers/i18n";
import UserService from "@/services/UserService";
import {watch, onMounted, defineComponent, reactive, ref} from 'vue';
import {useAlertStore} from "@/stores";
import alertHelpers from "@/helpers/alert";
import {getResponseError, prepareQuery} from "@/helpers/api";
import Page from "@/views/layouts/Page";
import DataTable from "@/views/components/DataTable";
import Avatar from "@/views/components/icons/Avatar";
import {toUrl} from "@/helpers/routing";

export default defineComponent({
    components: {
        Page,
        DataTable,
        Avatar
    },
    setup() {
        const alertStore = useAlertStore();
        const mainQuery = reactive({
            page: 1,
            search: '',
            sort: '',
        });

        let filters = ref(false);

        const page = reactive({
            id: 'list_users',
            title: trans('global.pages.users'),
            filters: false,
            breadcrumbs: [
                {
                    name: trans('global.pages.users'),
                    to: toUrl('/users'),
                    active: true,
                }
            ],
            actions: [
                {
                    id: 'filters',
                    name: trans('global.buttons.filters'),
                    icon: "fa fa-filter",
                    theme: 'outline',
                },
                {
                    id: 'new',
                    name: trans('global.buttons.add_new'),
                    icon: "fa fa-plus",
                    to: toUrl('/users/create')
                }
            ]
        });

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
                    to: toUrl('/users/{id}/edit')
                },
                delete: {
                    id: 'delete',
                    name: trans('global.actions.delete'),
                    icon: "fa fa-trash",
                    showName: false,
                    danger: true,
                }
            },
            records: null
        })

        const service = new UserService();

        function onTableSort(params) {
            mainQuery.sort = params;
        }

        function onTablePageChange(page) {
            mainQuery.page = page;
        }

        function onTableAction(params) {
            switch (params.action.id) {
                case 'delete':
                    alertHelpers.confirmDanger(function () {
                        service.delete(params.item.id).then(function (response) {
                            fetchPage(mainQuery);
                        });
                    })
                    break;
            }
        }

        function onPageAction(params) {
            switch (params.action.id) {
                case 'filters':
                    filters.value = !filters.value;
                    break;
            }
        }

        function fetchPage(params) {
            table.records = [];
            service
                .index(prepareQuery(params), page.id)
                .then((response) => {
                    table.records = response.data.data;
                    table.pagination.meta = response.data.meta;
                    table.pagination.links = response.data.links;
                })
                .catch((error) => {
                    alertStore.error(getResponseError(error));
                });
        }

        watch(mainQuery, (newTableState) => {
            fetchPage(mainQuery);
        });

        onMounted(() => {
            fetchPage(mainQuery);
        });

        return {
            trans,
            page,
            table,
            filters,
            onTablePageChange,
            onTableAction,
            onTableSort,
            onPageAction
        }

    },
});
</script>
