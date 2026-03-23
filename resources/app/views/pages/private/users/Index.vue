<template>
    <Page :title="page.title" :breadcrumbs="page.breadcrumbs" :actions="page.actions" @action="onPageAction">

        <template #filters v-if="page.toggleFilters">
            <Filters @clear="onFiltersClear">
                <FiltersRow>
                    <FiltersCol>
                        <TextInput name="first_name" :label="trans('users.labels.first_name')" v-model="mainQuery.filters.first_name.value"></TextInput>
                    </FiltersCol>
                    <FiltersCol>
                        <TextInput name="last_name" :label="trans('users.labels.last_name')" v-model="mainQuery.filters.last_name.value"></TextInput>
                    </FiltersCol>
                    <FiltersCol>
                        <TextInput name="email" type="email" :label="trans('users.labels.email')" v-model="mainQuery.filters.email.value"></TextInput>
                    </FiltersCol>
                    <FiltersCol>
                        <Dropdown name="role" server="roles/search" :multiple="true" :label="trans('users.labels.role')" v-model="mainQuery.filters.role.value"></Dropdown>
                    </FiltersCol>
                </FiltersRow>
            </Filters>
        </template>

        <template #default>
            <Table :id="page.id" v-if="table" :headers="table.headers" :sorting="table.sorting" :actions="table.actions" :records="table.records" :pagination="table.pagination" :is-loading="table.loading" @page-changed="onTablePageChange" @action="onTableAction" @sort="onTableSort">
                <template v-slot:content-id="props">
                    <div class="flex items-center">
                        <div class="w-10 h-10 rounded-full overflow-hidden shrink-0" v-if="props.item.avatar_thumb_url">
                            <img :src="props.item.avatar_thumb_url" alt="" class="w-full h-full object-cover"/>
                        </div>
                        <Avatar v-else class="w-10 h-10 shrink-0 rounded-full"/>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-base-content">
                                {{ props.item.full_name }}
                            </div>
                            <div class="text-sm text-base-content/50">
                                {{ trans('users.labels.id') + ': ' + props.item.id }}
                            </div>
                        </div>
                    </div>
                </template>
                <template v-slot:content-status="props">
                    <span v-if="props.item.email_verified_at" class="badge badge-success" v-html="trans('users.status.verified')"></span>
                    <span v-else class="badge badge-error" v-html="trans('users.status.not_verified')"></span>
                </template>
                <template v-slot:content-role="props">
                    {{ props.item.roles.map((entry) => entry.title).join(', ') }}
                </template>
            </Table>
        </template>
    </Page>

    <!-- Drawer overlay -->
    <Transition name="fade">
        <div v-if="drawer.open" class="fixed inset-0 bg-black/30 z-30" @click="closeDrawer"></div>
    </Transition>

    <!-- Drawer panel -->
    <Transition name="slide-right">
        <div v-if="drawer.open" class="fixed top-0 right-0 h-full w-full max-w-lg bg-base-100 shadow-2xl z-40 flex flex-col">
            <!-- Drawer header -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-base-300/50">
                <h3 class="text-lg font-bold">{{ drawer.mode === 'create' ? trans('global.pages.users_create') : trans('global.pages.users_edit') }}</h3>
                <button class="btn btn-ghost btn-sm btn-circle" @click="closeDrawer">
                    <Icon name="times" class="h-4 w-4"/>
                </button>
            </div>

            <!-- Drawer body -->
            <div class="flex-grow overflow-y-auto p-6" v-if="!drawer.loading">
                <form :id="drawer.mode === 'create' ? 'create-user' : 'edit-user'" @submit.prevent="onDrawerSubmit">
                    <TextInput class="mb-4" type="text" :required="true" name="first_name" v-model="drawer.form.first_name" :label="trans('users.labels.first_name')"/>
                    <TextInput class="mb-4" type="text" :required="true" name="last_name" v-model="drawer.form.last_name" :label="trans('users.labels.last_name')"/>
                    <TextInput class="mb-4" type="text" name="middle_name" v-model="drawer.form.middle_name" :label="trans('users.labels.middle_name')"/>
                    <TextInput class="mb-4" type="email" :required="true" name="email" v-model="drawer.form.email" :label="trans('users.labels.email')"/>
                    <Dropdown class="mb-4" multiple="multiple" :server="'roles/search'" :server-per-page="15" :required="true" name="type" v-model="drawer.form.roles" :label="trans('users.labels.roles')"/>
                    <FileInput class="mb-4" name="avatar" v-model="drawer.form.avatar" accept="image/*" :label="trans('users.labels.avatar')" @click="drawer.form.avatar = ''"></FileInput>
                    <TextInput class="mb-4" type="password" :required="drawer.mode === 'create'" name="password" v-model="drawer.form.password" :label="trans('users.labels.password')"/>
                </form>
            </div>
            <div v-else class="flex-grow flex items-center justify-center">
                <Spinner/>
            </div>

            <!-- Drawer footer -->
            <div class="px-6 py-4 border-t border-base-300/50 flex justify-end gap-2">
                <button class="btn btn-ghost btn-sm" @click="closeDrawer">{{ trans('global.buttons.back') }}</button>
                <button class="btn btn-primary btn-sm" @click="onDrawerSubmit" :disabled="drawer.loading">
                    <Icon name="save" class="h-4 w-4 mr-1"/>
                    {{ drawer.mode === 'create' ? trans('global.buttons.save') : trans('global.buttons.update') }}
                </button>
            </div>
        </div>
    </Transition>
</template>

<script>

import {trans} from "@/helpers/i18n";
import UserService from "@/services/UserService";
import {watch, onMounted, defineComponent, reactive} from 'vue';
import {getResponseError, prepareQuery} from "@/helpers/api";
import {toUrl} from "@/helpers/routing";
import {useToastStore} from "@/stores/toast";
import alertHelpers from "@/helpers/alert";
import {fillObject, clearObject, reduceProperties} from "@/helpers/data";
import Page from "@/views/layouts/Page";
import Table from "@/views/components/Table";
import Avatar from "@/views/components/icons/Avatar";
import Icon from "@/views/components/icons/Icon";
import Spinner from "@/views/components/icons/Spinner";
import Filters from "@/views/components/filters/Filters";
import FiltersRow from "@/views/components/filters/FiltersRow";
import FiltersCol from "@/views/components/filters/FiltersCol";
import TextInput from "@/views/components/input/TextInput";
import FileInput from "@/views/components/input/FileInput";
import Dropdown from "@/views/components/input/Dropdown";

export default defineComponent({
    components: {
        Dropdown,
        TextInput,
        FileInput,
        FiltersCol,
        FiltersRow,
        Filters,
        Page,
        Table,
        Avatar,
        Icon,
        Spinner,
    },
    setup() {
        const service = new UserService();
        const toastStore = useToastStore();

        const mainQuery = reactive({
            page: 1,
            search: '',
            sort: '',
            filters: {
                first_name: { value: '', comparison: '=' },
                last_name: { value: '', comparison: '=' },
                role: { value: '', comparison: '=' },
                email: { value: '', comparison: '=' }
            }
        });

        const page = reactive({
            id: 'list_users',
            title: trans('global.pages.users'),
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
                    icon: "filter",
                    theme: 'outline',
                },
                {
                    id: 'new',
                    name: trans('global.buttons.add_new'),
                    icon: "plus",
                }
            ],
            toggleFilters: false,
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
                    icon: "edit",
                    showName: false,
                },
                delete: {
                    id: 'delete',
                    name: trans('global.actions.delete'),
                    icon: "trash",
                    showName: false,
                    danger: true,
                }
            },
            loading: false,
            records: null
        });

        // Drawer state
        const drawer = reactive({
            open: false,
            mode: 'create', // 'create' | 'edit'
            userId: null,
            loading: false,
            form: {
                first_name: '',
                last_name: '',
                middle_name: '',
                email: '',
                roles: [],
                avatar: null,
                password: '',
            }
        });

        function openCreateDrawer() {
            clearObject(drawer.form);
            drawer.form.roles = [];
            drawer.form.avatar = null;
            drawer.mode = 'create';
            drawer.userId = null;
            drawer.loading = false;
            drawer.open = true;
        }

        function openEditDrawer(id) {
            drawer.mode = 'edit';
            drawer.userId = id;
            drawer.loading = true;
            drawer.open = true;
            service.edit(id).then((response) => {
                fillObject(drawer.form, response.data.model);
                drawer.loading = false;
            });
        }

        function closeDrawer() {
            drawer.open = false;
        }

        function onDrawerSubmit() {
            const formId = drawer.mode === 'create' ? 'create-user' : 'edit-user';
            const payload = reduceProperties(drawer.form, ['roles'], 'id');
            if (drawer.mode === 'create') {
                service.handleCreate(formId, payload).then(() => {
                    closeDrawer();
                    fetchPage(mainQuery);
                });
            } else {
                service.handleUpdate(formId, drawer.userId, payload).then(() => {
                    closeDrawer();
                    fetchPage(mainQuery);
                });
            }
        }

        function onTableSort(params) {
            mainQuery.sort = params;
        }

        function onTablePageChange(page) {
            mainQuery.page = page;
        }

        function onTableAction(params) {
            switch (params.action.id) {
                case 'edit':
                    openEditDrawer(params.item.id);
                    break;
                case 'delete':
                    alertHelpers.confirmDanger(function () {
                        service.delete(params.item.id).then(function () {
                            fetchPage(mainQuery);
                        });
                    })
                    break;
            }
        }

        function onPageAction(params) {
            switch (params.action.id) {
                case 'filters':
                    page.toggleFilters = !page.toggleFilters;
                    break;
                case 'new':
                    openCreateDrawer();
                    break;
            }
        }

        function onFiltersClear() {
            let clonedFilters = mainQuery.filters;
            for(let key in clonedFilters) {
                clonedFilters[key].value = '';
            }
            mainQuery.filters = clonedFilters;
        }

        function fetchPage(params) {
            table.records = [];
            table.loading = true;
            let query = prepareQuery(params);
            service
                .index(query)
                .then((response) => {
                    table.records = response.data.data;
                    table.pagination.meta = response.data.meta;
                    table.pagination.links = response.data.links;
                    table.loading = false;
                })
                .catch((error) => {
                    toastStore.error(getResponseError(error));
                    table.loading = false;
                });
        }

        watch(mainQuery, () => {
            fetchPage(mainQuery);
        });

        onMounted(() => {
            fetchPage(mainQuery);
        });

        return {
            trans,
            page,
            table,
            drawer,
            mainQuery,
            onTablePageChange,
            onTableAction,
            onTableSort,
            onPageAction,
            onFiltersClear,
            openCreateDrawer,
            closeDrawer,
            onDrawerSubmit,
        }

    },
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
.slide-right-enter-active, .slide-right-leave-active {
    transition: transform 0.25s ease;
}
.slide-right-enter-from, .slide-right-leave-to {
    transform: translateX(100%);
}
</style>
