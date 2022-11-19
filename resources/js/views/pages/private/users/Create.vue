<template>
    <Page :title="trans('global.pages.users')" :back-to="'/panel/users/list'">
        <Panel :title="trans('users.labels.new_record')">
            <form @submit.prevent="onSubmit">
                <div class="mb-4">
                    <TextInput type="text" :required="true" name="first_name" v-model="form.first_name" :label="trans('users.labels.first_name')"/>
                </div>
                <div class="mb-4">
                    <TextInput type="text" :required="true" name="last_name" v-model="form.last_name" :label="trans('users.labels.last_name')"/>
                </div>
                <div class="mb-4">
                    <TextInput type="text" name="middle_name" v-model="form.middle_name" :label="trans('users.labels.middle_name')"/>
                </div>
                <div class="mb-4">
                    <TextInput type="email" :required="true" name="email" v-model="form.email" :label="trans('users.labels.email')"/>
                </div>
                <div class="mb-4">
                    <Dropdown multiple="multiple" :server="'roles'" :server-per-page="5" :required="true" name="type" v-model="form.role" :label="trans('users.labels.role')"/>
                </div>
                <div class="mb-4">
                    <FileInput name="avatar" v-model="form.avatar" accept="image/*" :label="trans('users.labels.avatar')" @click="form.avatar = ''"></FileInput>
                </div>
                <div class="mb-4">
                    <TextInput type="password" :required="true" name="password" v-model="form.password" :label="trans('users.labels.password')"/>
                </div>
                <div class="mb-4">
                    <Button type="submit" icon="fa fa-floppy-o" :text="trans('global.buttons.submit')"/>
                </div>
            </form>
        </Panel>
    </Page>
</template>

<script>
import {defineComponent, onBeforeMount, reactive} from "vue";
import {trans} from "@/helpers/i18n";
import {useAuthStore} from "@/stores/auth";
import Button from "@/views/components/input/Button";
import TextInput from "@/views/components/input/TextInput";
import Dropdown from "@/views/components/input/Dropdown";
import Alert from "@/views/components/Alert";
import Panel from "@/views/components/Panel";
import Page from "@/views/layouts/Page";
import FileInput from "@/views/components/input/FileInput";
import UserService from "@/services/UserService";
import {fillObject} from "@/helpers/data";

export default defineComponent({
    components: {FileInput, Panel, Alert, Dropdown, TextInput, Button, Page},
    setup() {
        const {user} = useAuthStore();
        const form = reactive({
            first_name: '',
            last_name: '',
            middle_name: '',
            email: '',
            role: '',
            avatar: '',
            password: '',
        });
        const properties = reactive({
            roles: [],
        });
        const service = new UserService();

        onBeforeMount(() => {
            service.create().then((response) => {
                fillObject(properties, response.data.properties)
            })
        });

        function onSubmit() {
            service.handleCreate(form, (data) => {
                for (let i in form) {
                    form[i] = null;
                }
            });
            return false;
        }

        return {
            trans,
            user,
            form,
            properties,
            onSubmit,
        }
    }
})
</script>

<style scoped>

</style>
