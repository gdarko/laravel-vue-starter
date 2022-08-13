<template>
    <div class="shadow overflow-hidden border-b border-gray-200 mb-8 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
                <th v-for="(item, i) in headers" scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <slot :name="'header-'+i">{{ item }}</slot>
                </th>
                <th v-if="actions && actions.length > 0" scope="col" class="relative px-6 py-3">
                    <slot name="actions"></slot>
                </th>
            </tr>
            </thead>
            <tbody v-if="records && records.length" class="bg-white divide-y divide-gray-200">
            <tr v-for="(record, i) in records">
                <td v-for="(header, j) in headers" class="px-6 py-4 whitespace-nowrap">
                    <slot :item="record" :name="'content-'+j">{{
                            record && record.hasOwnProperty(j) ? record[j] : ''
                        }}
                    </slot>
                </td>
                <td v-for="(action, j) in actions" class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <slot :name="'actions-'+i+'-'+j">
                        <a :class="actionClass(j)" @click="onActionClick({action: j, item: record})">
                            {{ action }}
                        </a>
                    </slot>
                </td>
            </tr>
            </tbody>
            <tbody v-else>
            <tr>
                <td :colspan="headers.length">{{ trans('global.phrases.no_records') }}</td>
            </tr>
            </tbody>

        </table>
    </div>

    <Pager v-if="lastPage" :page-count="lastPage" :value="currentPage" @input="onPagerInput"/>

</template>

<script>
import Pager from "@/views/utils/Pager";
import {trans} from "@/modules/i18n";

import {computed, defineComponent} from "vue";

export default defineComponent({
    name: "SimpleTable",
    components: {Pager},
    emits: ['pageChanged', 'action'],
    props: {
        headers: {
            type: [Array, Object],
            default: [],
        },
        records: {
            type: [Array, Object],
            default: [],
        },
        actions: {
            type: [Array, Object],
            default: [],
        },
        pagination: {
            type: Object,
            default: {
                meta: {
                    current_page: 1,
                    last_page: 1,
                },
                links: null,
            },
        }
    },
    setup(props, {emit}) {

        function getPaginationMeta(key) {
            var value = null;
            if (props.pagination) {
                if (props.pagination.hasOwnProperty('meta') && props.pagination.meta) {
                    if (props.pagination.meta.hasOwnProperty(key)) {
                        value = props.pagination.meta[key];
                    }
                }
            }
            return value;
        }

        function actionClass(action) {
            return 'uppercase';
        }
        function onPagerInput(page) {
            emit('pageChanged', page);
        }
        function onActionClick(params) {
            emit('action', params)
        }
        const currentPage = computed(() => {
            return getPaginationMeta('current_page');
        })
        const lastPage = computed(() => {
            return getPaginationMeta('last_page')
        })

        return {
            currentPage,
            lastPage,
            actionClass,
            onActionClick,
            onPagerInput,
            trans
        }
    }
});
</script>
