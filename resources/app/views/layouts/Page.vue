<template>
    <div class="p-5 mt-4 xl:px-0">
        <Alert class="mb-4"/>
        <div class="flex flex-wrap justify-between mb-6">
            <div>
                <h2 class="font-bold text-2xl mb-3">{{ $props.title }}</h2>
                <div class="breadcrumbs text-sm" v-if="$props.breadcrumbs.length > 0">
                    <ul>
                        <li>
                            <router-link :to="toUrl('/dashboard')">
                                <Icon name="home" class="h-4 w-4 mr-1"/>
                                {{ trans('global.pages.home') }}
                            </router-link>
                        </li>
                        <li v-for="(item, index) in $props.breadcrumbs">
                            <router-link v-if="index < ($props.breadcrumbs.length -1)" :to="item.to" v-html="item.name"/>
                            <span v-else class="text-base-content/60" v-text="item.name"></span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="flex items-center gap-2" v-if="$props.actions.length > 0">
                <slot v-for="(action, j) in $props.actions" :name="'page-actions-'+action.id">
                    <Button v-if="action.hasOwnProperty('to') && action.to" :to="action.to" :title="action.name" :icon="action.hasOwnProperty('icon') ? action.icon : null" :theme="action.hasOwnProperty('theme') ? action.theme : null" :label="action.name"/>
                    <Button v-else @click="onPageActionClick({action: action})" :title="action.name" :icon="action.hasOwnProperty('icon') ? action.icon : null" :theme="action.hasOwnProperty('theme') ? action.theme : null" :label="action.name"/>
                </slot>
            </div>
        </div>
        <slot name="filters"></slot>
        <div class="grid grid-cols-1">
            <template v-if="isElementLoading">
                <div class="py-10 text-center">
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
import Icon from "@/views/components/icons/Icon";
import {useGlobalStateStore} from "@/stores";

export default defineComponent({
    name: "Page",
    components: {Alert, Button, Spinner, Icon},
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
