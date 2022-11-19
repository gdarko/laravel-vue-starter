<template>
    <div class="mb-4 w-full flex items-center" v-if="((slots.hasOwnProperty('header-filters') && slots['header-filters']) || $props.title) || isSearchEnabled">
        <div class="w-3/4 xs:w-full pull-left" v-if="(slots.hasOwnProperty('header-filters') && slots['header-filters']) || $props.title">
            <slot v-if="slots.hasOwnProperty('header-filters') && slots['header-filters']" name="header-filters"></slot>
            <h2 class="bold text-2xl" v-else-if="$props.title" v-html="$props.title"></h2>
        </div>
        <div class="w-1/4 xs:w-full pull-right" v-if="isSearchEnabled">
            <form class="relative w-full">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                <input v-model="inputSearch" type="search" class="block w-full px-10 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-theme-500 focus:border-theme-500" required>
                <button @click.prevent="onSearchSubmit" type="submit" class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-theme-600 rounded-r-lg border border-theme-700 hover:bg-theme-800 focus:ring-4 focus:outline-none focus:ring-theme-300 dark:bg-theme-600 dark:hover:bg-theme-700 dark:focus:ring-theme-800">
                    {{ trans('global.buttons.search') }}
                </button>
            </form>
        </div>
    </div>

    <div class="w-full shadow border-b border-gray-200 mb-8 sm:rounded-lg overflow-auto">
        <table class="w-full divide-y divide-gray-200 table-auto">
            <thead class="bg-gray-50">
            <tr>
                <th v-for="(item, i) in headers" scope="col" class="align-middle px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <slot :name="'header-'+i">
                        <div class="leading-loose inline-block">{{ item }}</div>
                        <div class="sort-arrows inline-block text-center absolute" v-if="sorting.hasOwnProperty(i) && sorting[i]">
                            <span @click.prevent="onSortChange(i, 'asc')" :class="sortControlClasses(i, 'asc')" class="w-full block cursor-pointer font-normal hover:font-bold focus:font-bold hover:text-theme-600 focus:text-theme-600 dark:hover:text-theme-500 dark:focus:text-theme-500"><i class="fa fa-caret-up"></i></span>
                            <span @click.prevent="onSortChange(i, 'desc')" :class="sortControlClasses(i, 'desc')" class="w-full block cursor-pointer font-normal hover:font-bold focus:font-bold hover:text-theme-600 focus:text-theme-600 dark:hover:text-theme-500 dark:focus:text-theme-500"><i class="fa fa-caret-down"></i></span>
                        </div>
                    </slot>
                </th>
                <th v-if="actions" scope="col" class="align-middle px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <slot name="actions">{{ trans('global.actions.name') }}</slot>
                </th>
            </tr>
            </thead>
            <tbody v-if="records && records.length && !$props.loading" class="bg-white divide-y divide-gray-200">
            <tr v-for="(record, i) in records">
                <td v-for="(header, j) in headers" class="px-6 py-4 whitespace-nowrap text-sm">
                    <slot :item="record" :name="'content-'+j">{{
                            record && record.hasOwnProperty(j) ? record[j] : ''
                        }}
                    </slot>
                </td>
                <td v-if="actions" class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <slot :name="'actions-'+j" v-for="(action, j) in actions">
                        <router-link v-if="action.hasOwnProperty('to') && action.to" :to="getActionPage(action, record)" :class="getActionClass(action)" :title="action.name">
                            <i v-if="action.icon" :class="action.icon"></i>
                            <span v-if="(!action.hasOwnProperty('showName') || action.showName)">{{
                                    action.name
                                }}</span>
                        </router-link>
                        <a v-else :class="getActionClass(action)" @click="onActionClick({action: action, item: record})" :title="action.name">
                            <i v-if="action.icon" :class="action.icon"></i>
                            <span v-if="(!action.hasOwnProperty('showName') || action.showName)">{{
                                    action.name
                                }}</span>
                        </a>
                    </slot>
                </td>
            </tr>
            </tbody>
            <tbody v-else>
            <tr>
                <td :colspan="headersLength" class="p-5 text-center">
                    <template v-if="$props.loading">
                        <Spinner></Spinner>
                    </template>
                    <template v-else>
                        {{ trans('global.phrases.no_records') }}
                    </template>
                </td>
            </tr>
            </tbody>
        </table>
    </div>

    <Pager v-if="lastPage && !$props.loading" :page-count="lastPage" :value="currentPage" @input="onPagerInput"/>

</template>

<script>
import {trans} from "@/helpers/i18n";
import {computed, defineComponent, reactive, ref, useSlots} from "vue";
import Pager from "@/views/components/Pager";
import Spinner from "@/views/components/icons/Spinner";

export default defineComponent({
    components: {Spinner, Pager},
    emits: ['pageChanged', 'action', 'search', 'sort'],
    props: {
        title: {
            type: [String],
            default: ''
        },
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
        search: {
            type: [Array, Object],
            default: null,
        },
        sorting: {
            type: [Object],
            default: {}
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
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, {emit}) {

        const slots = useSlots();
        const inputSearch = ref("")
        const currentSort = reactive({column: null, direction: 'ASC'});

        const isSearchEnabled = computed(() => {
            let enabled = true;
            if (props.search && props.search.hasOwnProperty('enabled') && !props.search.enabled) {
                enabled = false;
            }
            return enabled;
        })

        const headersLength = computed(() => {
            let total = 0;
            for (let i in props.headers) {
                total++;
            }
            if(props.actions) {
                total++;
            }
            return total;
        })

        function getPaginationMeta(key) {
            let value = null;
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

        function onSearchSubmit() {
            emit('search', inputSearch.value);
        }

        function onPagerInput(page) {
            emit('pageChanged', page);
        }

        function onActionClick(params) {
            emit('action', params)
        }

        function onSortChange(column, direction) {
            if (currentSort.column === column && currentSort.direction === direction) {
                clearSorting();
            } else {
                currentSort.column = column;
                currentSort.direction = direction;
            }
            emit('sort', {column: currentSort.column, direction: currentSort.direction});
        }

        function sortControlClasses(column, direction) {
            if (currentSort.column === column && currentSort.direction === direction) {
                return 'text-theme-500'
            }
            return '';
        }

        function clearSorting() {
            currentSort.column = null;
            currentSort.direction = null;
        }

        const currentPage = computed(() => {
            return getPaginationMeta('current_page');
        })
        const lastPage = computed(() => {
            return getPaginationMeta('last_page')
        })

        return {
            slots,
            currentPage,
            lastPage,
            getActionClass,
            getActionPage,
            isSearchEnabled,
            onActionClick,
            onPagerInput,
            onSearchSubmit,
            onSortChange,
            inputSearch,
            sortControlClasses,
            headersLength,
            trans,
            emit
        }
    }
});
</script>
<style>
.sort-arrows {
    font-size: 1.2em;
    line-height: 0.7;
    width: 30px;
}

.sort-arrows i.fa {
    line-height: 0.1;
}

.sort-arrows .fa {
    font-size: 15px;
}
</style>
