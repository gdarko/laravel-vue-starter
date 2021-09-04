<template>
    <div class="p-5 xl:px-0">
        <SimpleTable v-if="table" :headers="table.headers" :records="table.records" :pagination="table.pagination" @page-changed="fetchPage">
            <template v-slot:content-id="props">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <img v-if="props.item.avatar" :src="props.item.avatar" class="h-10 w-10 rounded-full" alt=""/>
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
                <span v-if="props.item.emailVerified" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                <span v-else class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Inactive</span>
            </template>
            <template v-slot:content-role="props">
                {{ props.item.isAdmin ? 'Admin' : 'Regular ' }}
            </template>
        </SimpleTable>
    </div>
</template>

<script>

import MailIcon from "@/components/icons/MailIcon";
import AvatarIcon from "@/components/icons/AvatarIcon";
import UserService from "@/services/UserService";
import {getError} from "@/utils/helpers";
import SimpleTable from "@/components/utils/SimpleTable";

import {useRoute, useRouter} from 'vue-router'
import {ref, watch, computed, onMounted, defineComponent} from 'vue';

export default defineComponent({
    name: "UsersView",
    components: {
        SimpleTable,
        MailIcon,
        AvatarIcon
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const currentPage = computed(() => route.params.hasOwnProperty('page') ? parseInt(route.params.page) : 1);
        let state = ref({
            isError: false,
            isLoading: true,
        })
        let table = ref({
            headers: {
                id: 'Name',
                status: 'Status',
                role: 'Role',
            },
            pagination: {
                meta: null,
                links: null,
            },
            records: null,
        })
        function goToPage(page) {
            state.value.isLoading = false;
            const query = {...route.query, page: page};
            router.replace({query});
        }
        function fetchPage(page) {
            state.value.isLoading = true;
            page = page || currentPage.value;
            UserService.getUsers(page)
                .then((response) => {
                    table.value.records = response.data.data;
                    table.value.pagination = {
                        meta: response.data.meta,
                        links: response.data.links,
                    }
                    goToPage(page);
                })
                .catch((error) => {
                    state.value.isError = getError(error);
                });
        }
        onMounted(fetchPage);
        watch(currentPage, (newVal, oldVal) => {
            fetchPage(newVal);
        })
        return {
            table,
            fetchPage
        }

    },
});
</script>
