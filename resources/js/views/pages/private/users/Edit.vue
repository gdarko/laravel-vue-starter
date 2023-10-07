<template>
    <Page :title="page.title" :breadcrumbs="page.breadcrumbs" :actions="page.actions" @action="onAction" :is-loading="page.loading">
        <Panel>
            <Form id="edit-user" @submit.prevent="onSubmit">
                <TextInput class="mb-4" type="text" :required="true" name="first_name" v-model="form.first_name" :label="trans('users.labels.first_name')"/>
                <TextInput class="mb-4" type="text" :required="true" name="last_name" v-model="form.last_name" :label="trans('users.labels.last_name')"/>
                <TextInput class="mb-4" type="text" name="middle_name" v-model="form.middle_name" :label="trans('users.labels.middle_name')"/>
                <TextInput class="mb-4" type="email" :required="true" name="email" v-model="form.email" :label="trans('users.labels.email')"/>
                <Dropdown class="mb-4" multiple="multiple" :server="'roles/search'" :server-per-page="15" :required="true" name="type" v-model="form.roles" :label="trans('users.labels.role')"/>
                <FileInput class="mb-4" name="avatar" v-model="form.avatar" accept="image/*" :label="trans('users.labels.avatar')" @click="form.avatar = ''"></FileInput>
                <TextInput class="mb-4" type="password" name="password" v-model="form.password" :label="trans('users.labels.password')"/>
            </Form>
        </Panel>
    </Page>
</template>

<script>
import {defineComponent, onBeforeMount, reactive, ref} from "vue";
import {trans} from "@/helpers/i18n";
import {fillObject, reduceProperties} from "@/helpers/data"
import {useRoute} from "vue-router";
import {useAuthStore} from "@/stores/auth";
import {toUrl} from "@/helpers/routing";
import UserService from "@/services/UserService";
import Button from "@/views/components/input/Button";
import TextInput from "@/views/components/input/TextInput";
import Dropdown from "@/views/components/input/Dropdown";
import Alert from "@/views/components/Alert";
import Panel from "@/views/components/Panel";
import Page from "@/views/layouts/Page";
import FileInput from "@/views/components/input/FileInput";
import Form from "@/views/components/Form";

export default defineComponent({
    components: {
        Form,
        FileInput,
        Panel,
        Alert,
        Dropdown,
        TextInput,
        Button,
        Page
    },
    setup() {
        const {user} = useAuthStore();
        const route = useRoute();
        const form = reactive({
            first_name: '',
            last_name: '',
            middle_name: '',
            email: '',
            roles: [],
            avatar: null,
            password: '',
        });

        const page = reactive({
            id: 'edit_user',
            title: trans('global.pages.users_edit'),
            filters: false,
            loading: true,
            breadcrumbs: [
                {
                    name: trans('global.pages.users'),
                    to: toUrl('/users/list'),
                },
                {
                    name: trans('global.pages.users_edit'),
                    active: true,
                }
            ],
            actions: [
                {
                    id: 'back',
                    name: trans('global.buttons.back'),
                    icon: "fa fa-angle-left",
                    to: toUrl('/users/list'),
                    theme: 'outline',
                },
                {
                    id: 'submit',
                    name: trans('global.buttons.update'),
                    icon: "fa fa-save",
                    type: 'submit'
                }
            ]
        });

        const service = new UserService();

        onBeforeMount(() => {
            service.edit(route.params.id).then((response) => {
                fillObject(form, response.data.model);
                page.loading = false;
            })
        });

        function onAction(data) {
            switch(data.action.id) {
                case 'submit':
                    onSubmit();
                    break;
            }
        }

        function onSubmit() {
            service.handleUpdate('edit-user', route.params.id, reduceProperties(form, ['roles'], 'id'));
            return false;
        }

        return {
            trans,
            user,
            form,
            onSubmit,
            onAction,
            page
        }
    }
})
</script>

<style scoped>

</style>
