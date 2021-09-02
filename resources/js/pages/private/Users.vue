<template>
    <div class="p-5 xl:px-0">

        <SimpleTable :headers="headers" :records="records" :pagination="pagination" @on-page-change="fetchPage">
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
import Alert from "@/components/utils/Alert";
import AvatarIcon from "@/components/icons/AvatarIcon";
import Pagination from "@/components/utils/Pagination";
import Spinner from '@/components/utils/Spinner';
import UserService from "@/services/UserService";
import {getError} from "@/utils/helpers";
import SimpleTable from "@/components/utils/SimpleTable";

export default {
    name: "UsersView",
    components: {SimpleTable, Alert, Pagination, MailIcon, AvatarIcon, Spinner},
    data() {
        return {
            error: null,
            loading: true,

            headers: {
                id: 'Name',
                status: 'Status',
                role: 'Role',
            },
            records: null,
            pagination: {
                meta: null,
                links: null,
            }
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
        fetchPage(page) {
            this.loading = true;
            page = page || (parseInt(this.$route.query.page) || 1);
            UserService.getUsers(page)
                .then((response) => {
                    this.records = response.data.data;
                    this.pagination = {
                        meta: response.data.meta,
                        links: response.data.links,
                    }
                    if (page > 1) {
                        const query = {...this.$route.query, page: page};
                        this.$router.replace({query});
                    }
                    this.loading = false;
                })
                .catch((error) => {
                    this.error = getError(error);
                });
        }
    }
};
</script>
