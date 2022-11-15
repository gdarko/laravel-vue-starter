<template>
    <Page :title="trans('global.pages.users')" :back-to="'/users'">
        <DefaultPanel :title="trans('users.labels.edit_record')">
            <form @submit.prevent="onSubmit">
                <div class="mb-4">
                    <TextInput type="text" :required="true" name="first_name" v-model="form.first_name" :label="trans('users.labels.first_name')"/>
                </div>
                <div class="mb-4">
                    <TextInput type="text" name="middle_name" v-model="form.middle_name" :label="trans('users.labels.middle_name')"/>
                </div>
                <div class="mb-4">
                    <TextInput type="text" :required="true" name="last_name" v-model="form.last_name" :label="trans('users.labels.last_name')"/>
                </div>
                <div class="mb-4">
                    <TextInput type="email" :required="true" name="email" v-model="form.email" :label="trans('users.labels.email')"/>
                </div>
                <div class="mb-4">
                    <Dropdown :required="true" name="type" v-model="form.role" :label="trans('users.labels.role')" :options="properties.roles"/>
                </div>
                <div class="mb-4">
                    <TextInput type="password" name="password" v-model="form.password" :label="trans('users.labels.password')"/>
                </div>
                <div class="mb-4">
                    <Button type="submit" icon="fa fa-floppy-o" :text="trans('global.buttons.submit')"/>
                </div>
            </form>
        </DefaultPanel>
    </Page>
</template>

<script>
import {defineComponent, onBeforeMount, reactive} from "vue";
import {trans} from "@/helpers/i18n";
import UserService from "@/services/UserService";
import {useRoute} from "vue-router";
import {useAuthStore} from "@/stores/auth";
import {useAlertStore} from "@/stores";
import Button from "@/views/components/input/Button";
import TextInput from "@/views/components/input/TextInput";
import Dropdown from "@/views/components/input/Dropdown";
import DefaultAlert from "@/views/components/alerts/DefaultAlert";
import DefaultPanel from "@/views/components/panels/DefaultPanel";
import Page from "@/views/layouts/Page";

export default defineComponent({
    components: {DefaultPanel, DefaultAlert, Dropdown, TextInput, Button, Page},
    setup() {
        let model = null;
        const alertStore = useAlertStore();
        const {user} = useAuthStore();
        const route = useRoute();
        const form = reactive({
            id: null,
            first_name: null,
            last_name: null,
            middle_name: null,
            email: null,
            role: null,
            avatar: null,
            password: null,
        })
        let properties = reactive({
            roles: []
        });


        let service = new UserService();

        onBeforeMount(() => {
            service.edit(route.params.id).then((response) => {
                model = response.data.model;
                for (let i in form) {
                    if (model.hasOwnProperty(i)) {
                        form[i] = model[i];
                    }
                }
                for (let i in properties) {
                    if (response.data.properties.hasOwnProperty(i)) {
                        properties[i] = response.data.properties[i];
                    }
                }
            })
        });

        function onSubmit() {
            if (!model.hasOwnProperty('id')) {
                return false;
            }
            service.update(model.id, form).then((response) => {
                let answer = response.data;
                alertStore.success(answer.message);
            }).catch((error) => {
                if (error.response.data.hasOwnProperty('errors')) {
                    alertStore.error(error.response.data.errors);
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
