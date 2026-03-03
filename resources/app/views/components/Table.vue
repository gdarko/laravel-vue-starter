<template>
    <div class="card bg-base-100 shadow-sm border border-base-300/50 overflow-x-auto mb-8">
        <table class="table">
            <thead>
            <tr>
                <th v-for="(item, i) in headers">
                    <slot :name="'header-'+i">
                        <span class="inline-flex items-center gap-1">
                            {{ item }}
                            <span v-if="sorting.hasOwnProperty(i) && sorting[i]" class="inline-flex flex-col gap-0.5 ml-0.5">
                                <button @click.prevent="onSortChange(i, 'asc')" :class="sortControlClasses(i, 'asc')" class="cursor-pointer hover:text-primary sort-arrow-up"></button>
                                <button @click.prevent="onSortChange(i, 'desc')" :class="sortControlClasses(i, 'desc')" class="cursor-pointer hover:text-primary sort-arrow-down"></button>
                            </span>
                        </span>
                    </slot>
                </th>
                <th v-if="actions" class="text-right">
                    <slot name="actions">{{ trans('global.actions.name') }}</slot>
                </th>
            </tr>
            </thead>
            <tbody v-if="records && records.length && !$props.isLoading">
            <tr v-for="(record, i) in records" class="hover">
                <td v-for="(header, j) in headers">
                    <slot :item="record" :name="'content-'+j">
                        {{ record && record.hasOwnProperty(j) ? record[j] : '' }}
                    </slot>
                </td>
                <td v-if="actions" class="text-right">
                    <slot :name="'actions-'+j" v-for="(action, j) in actions">
                        <router-link v-if="action.hasOwnProperty('to') && action.to" :to="getActionPage(action, record)" :class="getActionClass(action)" :title="action.name">
                            <Icon v-if="action.icon" :name="action.icon" class="h-5 w-5 inline-block"/>
                            <span v-if="(!action.hasOwnProperty('showName') || action.showName)" v-html="action.name"></span>
                        </router-link>
                        <a v-else :class="getActionClass(action)" @click="onActionClick({action: action, item: record})" :title="action.name">
                            <Icon v-if="action.icon" :name="action.icon" class="h-5 w-5 inline-block"/>
                            <span v-if="(!action.hasOwnProperty('showName') || action.showName)" v-html="action.name"></span>
                        </a>
                    </slot>
                </td>
            </tr>
            </tbody>
            <tbody v-else-if="$props.isLoading">
            <tr v-for="row in 5" :key="'skeleton-'+row">
                <td v-for="(header, j) in headers" :key="'skeleton-cell-'+row+'-'+j">
                    <div class="skeleton h-4 rounded" :class="j === 0 ? 'w-32' : 'w-24'"></div>
                </td>
                <td v-if="actions" class="text-right">
                    <div class="skeleton h-4 w-12 rounded inline-block"></div>
                </td>
            </tr>
            </tbody>
            <tbody v-else>
            <tr>
                <td :colspan="headersLength" class="text-center py-10 text-base-content/40">
                    {{ trans('global.phrases.no_records') }}
                </td>
            </tr>
            </tbody>
        </table>
    </div>

    <Pager v-if="lastPage && lastPage > 1 && !$props.isLoading" :page-count="lastPage" :value="currentPage" @input="onPagerInput"/>

</template>

<script>
import {trans} from "@/helpers/i18n";
import {computed, defineComponent, reactive} from "vue";
import Pager from "@/views/components/Pager";
import Spinner from "@/views/components/icons/Spinner";
import Icon from "@/views/components/icons/Icon";

export default defineComponent({
    components: {Spinner, Pager, Icon},
    emits: ['pageChanged', 'action', 'sort'],
    props: {
        id: {
            type: String,
            default: "",
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
        isLoading: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, {emit}) {

        const currentSort = reactive({column: null, direction: 'ASC'});

        const headersLength = computed(() => {
            let total = 0;
            for (let i in props.headers) {
                total++;
            }
            if (props.actions) {
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
            let classes = 'btn btn-ghost btn-sm';
            if (action.hasOwnProperty('danger') && action.danger) {
                classes += ' text-error'
            }
            return classes;
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
                return 'text-primary'
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
            currentPage,
            lastPage,
            getActionClass,
            getActionPage,
            onActionClick,
            onPagerInput,
            onSortChange,
            sortControlClasses,
            headersLength,
            trans,
        }
    }
});
</script>
<style scoped>
.sort-arrow-up {
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 5px solid currentColor;
    opacity: 0.4;
}
.sort-arrow-down {
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid currentColor;
    opacity: 0.4;
}
.sort-arrow-up.text-primary,
.sort-arrow-down.text-primary {
    opacity: 1;
}
</style>
