<template>
    <form @submit.prevent="onSubmit">
        <Page :id="page.id" :title="page.title" :breadcrumbs="page.breadcrumbs" :actions="page.actions">
            <Panel :id="page.id + '-panel'">
                <TextInput class="mb-4" type="text" :required="true" name="first_name" v-model="form.first_name" :label="trans('users.labels.first_name')"/>
                <TextInput class="mb-4" type="text" :required="true" name="last_name" v-model="form.last_name" :label="trans('users.labels.last_name')"/>
                <TextInput class="mb-4" type="text" name="middle_name" v-model="form.middle_name" :label="trans('users.labels.middle_name')"/>
                <TextInput class="mb-4" type="email" :required="true" name="email" v-model="form.email" :label="trans('users.labels.email')"/>
                <Dropdown class="mb-4" multiple="multiple" :server="'roles'" :server-per-page="15" :required="true" name="type" v-model="form.roles" :label="trans('users.labels.role')"/>
                <FileInput class="mb-4" name="avatar" v-model="form.avatar" accept="image/*" :label="trans('users.labels.avatar')" @click="form.avatar = ''"></FileInput>
                <TextInput class="mb-4" type="password" name="password" v-model="form.password" :label="trans('users.labels.password')"/>
            </Panel>
        </Page>
    </form>
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

export default defineComponent({
    components: {
        FileInput,
        Panel,
        Alert,
        Dropdown,
        TextInput,
        Button,
        Page
    },
    setup() {
        let id = null;
        const {user} = useAuthStore();
        const route = useRoute();
        const form = reactive({
            first_name: '',
            last_name: '',
            middle_name: '',
            email: '',
            roles: [],
            avatar: '',
            password: '',
        });

        const isLoading = ref(true);

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
            service.edit(route.params.id, page.id + '-panel').then((response) => {
                id = response.data.model.id;
                fillObject(form, response.data.model);
            })
        });

        function onSubmit() {
            service.handleUpdate(id, reduceProperties(form, 'roles', 'id'), page.id + '-panel');
            return false;
        }

        return {
            trans,
            user,
            form,
            onSubmit,
            page
        }
    }
})
</script>

<style scoped>

</style>
