<template>
    <div class="p-5 mt-4 xl:px-0">
        <div class="grid grid-cols-2 mb-3">
            <div>
                <h2 class="bold text-2xl">{{ trans('global.pages.users') }}</h2>
            </div>
            <div>
                <div class="actions float-right">
                    <Button type="route" to="/users" skin="" :text="trans('global.buttons.back')"/>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1">
            <div class="shadow overflow-hidden border-b border-gray-200 mb-8 sm:rounded-lg">
                <div class="min-w-full divide-y divide-gray-200">
                    <div class="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {{ trans('users.labels.new_record') }}
                    </div>
                    <div class="px-6 py-4 whitespace-nowrap bg-white">

                        <Alert :message="state.message" :error="state.error" @closed="state.message = null; state.error = null" class="mb-4"/>

                        <form @submit.prevent="onSubmit">
                            <div class="mb-4">
                                <TextInput type="text" name="name" v-model="form.name" :label="trans('users.labels.name')"/>
                            </div>
                            <div class="mb-4">
                                <TextInput type="email" :rows="8" name="email" v-model="form.email" :label="trans('users.labels.email')"/>
                            </div>
                            <div class="mb-4">
                                <Dropdown name="type" v-model="form.role" :label="trans('users.labels.role')" :options="properties.roles"/>
                            </div>
                            <div class="mb-4">
                                <TextInput type="password" :rows="8" name="password" v-model="form.password" :label="trans('users.labels.password')"/>
                            </div>
                            <div class="mb-4">
                                <Button type="submit" :text="trans('global.buttons.submit')"/>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {defineComponent, onBeforeMount, reactive} from "vue";
import Button from "@/views/utils/Button";
import {trans} from "@/modules/i18n";
import Alert from "@/views/utils/Alert";
import TextInput from "@/views/utils/TextInput";
import Dropdown from "@/views/utils/Dropdown";
import {useAuth} from "@/modules/auth";
import UserService from "@/services/UserService";
import {useRoute, useRouter} from "vue-router";

export default defineComponent({
    components: {Dropdown, TextInput, Alert, Button},
    setup() {
        let model = null;
        const {user} = useAuth();
        const route = useRoute();
        const state = reactive({
            message: null,
            error: null,
        })
        const form = reactive({
            id:null,
            name: null,
            email: null,
            role: null,
            avatar: null,
            password: null,
        })
        let properties = reactive({
            roles: []
        });
        onBeforeMount(() => {
            UserService.edit(route.params.id).then((response) => {
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
            state.message = '';
            state.error = null;
            UserService.update(model.id, form).then((response) => {
                let answer = response.data;
                state.message = answer.message;
            }).catch((error) => {
                if (error.response.data.hasOwnProperty('errors')) {
                    state.error = error.response.data.errors;
                }
            });
            return false;
        }

        return {
            trans,
            user,
            state,
            form,
            properties,
            onSubmit,
        }
    }
})
</script>

<style scoped>

</style>
