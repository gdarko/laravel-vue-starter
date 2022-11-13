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

        <FormAlert class="mb-4"/>

        <div class="grid grid-cols-1">
            <div class="shadow overflow-hidden border-b border-gray-200 mb-8 sm:rounded-lg">
                <div class="min-w-full divide-y divide-gray-200">
                    <div class="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {{ trans('users.labels.new_record') }}
                    </div>
                    <div class="px-6 py-4 whitespace-nowrap bg-white">
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
import TextInput from "@/views/utils/TextInput";
import Dropdown from "@/views/utils/Dropdown";
import UserService from "@/services/UserService";

import {trans} from "@/modules/i18n";
import {useAuthStore} from "@/store/auth";
import FormAlert from "@/views/utils/FormAlert";
import {useAlertStore} from "@/store";

export default defineComponent({
    components: {FormAlert, Dropdown, TextInput, Button},
    setup() {
        const alertStore = useAlertStore();
        const {user} = useAuthStore();
        const form = reactive({
            name: null,
            email: null,
            role: null,
            avatar: null,
            password: null,
        })
        let properties = reactive({
            roles: [],
        });
        onBeforeMount(() => {
            UserService.create().then((response) => {
                for (let i in properties) {
                    if (response.data.properties.hasOwnProperty(i)) {
                        properties[i] = response.data.properties[i];
                    }
                }
            })
        });
        function onSubmit() {
            UserService.store(form).then((response) => {
                let answer = response.data;
                alertStore.success(answer.message);
                for (var i in form) {
                    form[i] = null;
                }
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
