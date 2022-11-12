<template>
    <div class="shadow border-b border-gray-200 mb-8 sm:rounded-lg overflow-auto">
        <table class="w-full divide-y divide-gray-200 table-auto">
            <thead class="bg-gray-50">
            <tr>
                <th v-for="(item, i) in headers" scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <slot :name="'header-'+i">{{ item }}</slot>
                </th>
                <th v-if="actions" scope="col" class="relative px-6 py-3">
                    <slot name="actions"></slot>
                </th>
            </tr>
            </thead>
            <tbody v-if="records && records.length" class="bg-white divide-y divide-gray-200">
            <tr v-for="(record, i) in records">
                <td v-for="(header, j) in headers" class="px-6 py-4 whitespace-nowrap">
                    <slot :item="record" :name="'content-'+j">{{ record && record.hasOwnProperty(j) ? record[j] : '' }}</slot>
                </td>
                <td v-if="actions" class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <slot :name="'actions-'+j" v-for="(action, j) in actions">
                        <router-link v-if="action.hasOwnProperty('to') && action.to" :to="getActionPage(action, record)" :class="getActionClass(action)" :title="action.name">
                            <i v-if="action.icon" :class="action.icon"></i>
                            <span v-if="(!action.hasOwnProperty('showName') || action.showName)">{{ action.name }}</span>
                        </router-link>
                        <a v-else :class="getActionClass(action)" @click="onActionClick({action: action, item: record})" :title="action.name">
                            <i v-if="action.icon" :class="action.icon"></i>
                            <span v-if="(!action.hasOwnProperty('showName') || action.showName)">{{ action.name }}</span>
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

        function getActionPage(action, record) {
            if (!action.hasOwnProperty('to')) {
                return '#';
            }
            for (let key in record) {
                if (action.to.indexOf('{' + key + '}') !== -1) {
                    return action.to.replace('{' + key + '}', record[key]);
                }
            }
            return action.to;
        }

        function getActionClass(action) {

            let classes = 'uppercase cursor-pointer text-lg';
            if (Object.keys(props.actions).length > 1) {
                classes += ' mr-3';
            }

            if (action.hasOwnProperty('danger') && action.danger) {
                classes += ' text-danger-400'
            }

            return classes;
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
            getActionClass,
            getActionPage,
            onActionClick,
            onPagerInput,
            trans,
            emit
        }
    }
});
</script>
