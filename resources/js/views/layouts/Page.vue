<template>
    <div class="p-5 mt-4 xl:px-0">
        <Alert class="mb-4"/>
        <div class="flex flex-wrap justify-between mb-6">
            <div>
                <h2 class="bold text-2xl mb-3">{{ $props.title }}</h2>
                <!-- Breadcrumbs -->
                <nav class="flex" aria-label="Breadcrumb" v-if="$props.breadcrumbs.length > 0">
                    <ol class="inline-flex items-center space-x-1 md:space-x-3">
                        <li class="inline-flex items-center">
                            <router-link :to="toUrl('/dashboard')" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                <i class="fa fa-home mr-3"></i>
                                {{ trans('global.pages.home') }}
                            </router-link>
                        </li>
                        <li v-for="(item, index) in $props.breadcrumbs" :aria-current="index < ($props.breadcrumbs.length -1) ? 'page' : ''">
                            <div class="flex items-center">
                                <i class="fa fa-angle-right"></i>
                                <router-link v-if="index < ($props.breadcrumbs.length -1)" :to="item.to" class="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white" v-html="item.name"/>
                                <span v-else class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400" v-text="item.name"></span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            <div class="flex items-center" v-if="$props.actions.length > 0">
                <slot v-for="(action, j) in $props.actions" :name="'page-actions-'+action.id">
                    <Button v-if="action.hasOwnProperty('to') && action.to" :class="{'mr-3' : j < ($props.actions.length-1)}" :to="action.to" :title="action.name" :icon="action.hasOwnProperty('icon') ? action.icon : null" :theme="action.hasOwnProperty('theme') ? action.theme : null" :label="action.name"/>
                    <Button v-else @click="onPageActionClick({action: action})" :class="{'mr-3' : j < ($props.actions.length-1)}" :title="action.name" :icon="action.hasOwnProperty('icon') ? action.icon : null" :theme="action.hasOwnProperty('theme') ? action.theme : null" :label="action.name"/>
                </slot>
            </div>
        </div>
        <slot name="filters"></slot>
        <div class="grid grid-cols-1">
            <template v-if="isElementLoading">
                <div class="pt-10 pb-6 text-center">
                    <Spinner/>
                </div>
            </template>
            <slot v-else></slot>
        </div>
    </div>
</template>

<script>
import {computed, defineComponent} from "vue";
import {trans} from "@/helpers/i18n";
import {toUrl} from "@/helpers/routing";
import Button from "@/views/components/input/Button";
import Alert from "@/views/components/Alert";
import Spinner from "@/views/components/icons/Spinner";
import {useGlobalStateStore} from "@/stores";
import {storeToRefs} from "pinia";

export default defineComponent({
    name: "Page",
    components: {Alert, Button, Spinner},
    props: {
        id: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            default: "",
        },
        breadcrumbs: {
            type: Array,
            default: []
        },
        actions: {
            type: Array,
            default: []
        },
        isLoading: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['action'],
    setup(props, {emit}) {
        function onPageActionClick(data) {
            emit('action', data);
        }

        const isElementLoading = computed(() => {
            return useGlobalStateStore().loadingElements[props.id] || props.isLoading;
        });

        return {
            trans,
            toUrl,
            onPageActionClick,
            isElementLoading
        }
    }
})
</script>
