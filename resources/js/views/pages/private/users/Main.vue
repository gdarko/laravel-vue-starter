<template>
    <div class="p-5 xl:px-0">
        <SimpleTable v-if="table" :headers="table.headers" :records="table.records" :pagination="table.pagination" @page-changed="goToPage">
            <template v-slot:content-id="props">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <img v-if="props.item.avatar" :src="props.item.avatar_url" class="h-10 w-10 rounded-full" alt=""/>
                        <AvatarIcon v-else class="w-10 h-10 text-gray-400 rounded-full"/>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                            {{ props.item.name }}
                        </div>
                        <div class="text-sm text-gray-500">
                            {{ props.item.email }}
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:content-status="props">
                <span v-if="props.item.emailVerified" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{{ trans('users.status.verified') }}</span>
                <span v-else class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">{{ trans('users.status.not_verified') }}</span>
            </template>
            <template v-slot:content-role="props">
                {{ props.item.isAdmin ? trans('users.roles.admin') : trans('users.roles.regular') }}
            </template>
        </SimpleTable>
    </div>
</template>

<script>

import MailIcon from "@/views/icons/MailIcon";
import AvatarIcon from "@/views/icons/AvatarIcon";
import UserService from "@/services/UserService";
import {getError} from "@/modules/helpers";
import SimpleTable from "@/views/utils/SimpleTable";

import {trans} from "@/modules/i18n";

import {useRoute, useRouter} from 'vue-router'
import {ref, watch, computed, onMounted, defineComponent, reactive} from 'vue';

export default defineComponent({
    components: {
        SimpleTable,
        MailIcon,
        AvatarIcon
    },
    setup() {
        const route = useRoute();
        const router = useRouter();

        const currentPage = computed(() => {
            let page = route.query.page;
            return page ? page : 1;
        });

        const state = reactive({
            error: false,
            loading: true,
        })
        const table = reactive({
            headers: {
                id: trans('users.labels.name'),
                status: trans('users.labels.status'),
                role: trans('users.labels.role'),
            },
            pagination: {
                meta: null,
                links: null,
            },
            records: null,
        })

        function goToPage(page) {
            state.loading = false;
            const query = {...route.query, page: page};
            router.replace({query});
        }

        function fetchPage(page) {
            state.loading = true;
            page = page || currentPage.value;
            UserService.get(page)
                .then((response) => {
                    table.records = response.data.data;
                    table.pagination.meta = response.data.meta;
                    table.pagination.links = response.data.links;
                })
                .catch((error) => {
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
            table,
            goToPage,
            trans
        }

    },
});
</script>
