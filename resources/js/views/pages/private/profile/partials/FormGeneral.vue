<template>
    <Panel :title="trans('users.labels.general_settings')">
        <form @submit.prevent="onFormSubmit">
            <TextInput type="text" :required="true" :label="trans('users.labels.first_name')" name="first_name" v-model="form.first_name" class="mb-2"/>
            <TextInput type="text" :required="true" :label="trans('users.labels.last_name')" name="last_name" v-model="form.last_name" class="mb-2"/>
            <TextInput type="text" :label="trans('users.labels.middle_name')" name="middle_name" v-model="form.middle_name" class="mb-2"/>
            <TextInput type="email" :required="true" :label="trans('users.labels.email')" name="email" v-model="form.email" autocomplete="email" class="mb-4"/>
            <Button type="submit" :label="trans('global.buttons.update')"/>
        </form>
    </Panel>
</template>

<script>
import AuthService from "@/services/AuthService";
import {trans} from "@/helpers/i18n";
import {defineComponent, reactive, onMounted} from "vue";
import {getResponseError} from "@/helpers/api";
import {useAuthStore} from "@/stores/auth";
import {useAlertStore} from "@/stores";
import Button from "@/views/components/input/Button";
import TextInput from "@/views/components/input/TextInput";
import Panel from "@/views/components/Panel";

export default defineComponent({
    components: {
        Panel,
        Button,
        TextInput,
    },

    setup: function () {

        const authService = new AuthService();
        const alertStore = useAlertStore();
        const authStore = useAuthStore();
        const form = reactive({
            first_name: null,
            last_name: null,
            middle_name: null,
            email: null,
        })

        onMounted(() => {
            if (!authStore.user) {
                return;
            }
            form.first_name = authStore.user.first_name;
            form.last_name = authStore.user.last_name;
            form.middle_name = authStore.user.middle_name;
            form.email = authStore.user.email;
        })

        function onFormSubmit() {
            authService.updateUser(form)
                .then(() => authStore.getCurrentUser())
                .then((response) => (alertStore.success(trans('global.phrases.profile_updated'))))
                .catch((error) => (alertStore.error(getResponseError(error))));
        }

        return {
            onFormSubmit,
            form,
            trans,
        }
    },
});
</script>
