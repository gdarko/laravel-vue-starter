<template>
    <form @submit.prevent="onFormSubmit">
        <FormAlert class="mb-4"></FormAlert>
        <TextInput type="text" :label="trans('users.labels.first_name')" name="name" v-model="form.first_name" class="mb-2"/>
        <TextInput type="text" :label="trans('users.labels.middle_name')" name="name" v-model="form.middle_name" class="mb-2"/>
        <TextInput type="text" :label="trans('users.labels.last_name')" name="name" v-model="form.last_name" class="mb-2"/>
        <TextInput type="email" :label="trans('users.labels.email')" name="email" v-model="form.email" autocomplete="email" class="mb-4"/>
        <Button type="submit" :text="trans('global.buttons.save')"/>
    </form>
</template>

<script>
import Button from "@/views/utils/Button";
import TextInput from "@/views/utils/TextInput";
import Alert from "@/views/utils/Alert";
import AuthService from "@/services/AuthService";

import apiUtils from "@/utils/api";
import {trans} from "@/utils/i18n";

import {defineComponent, reactive, computed, onMounted} from "vue";
import {useAuthStore} from "@/stores/auth";
import {useAlertStore} from "@/stores";
import FormAlert from "@/views/utils/FormAlert";


export default defineComponent({
    components: {
        FormAlert,
        Button,
        TextInput,
        Alert,
    },

    setup: function () {

        const alertStore = useAlertStore();
        const authStore = useAuthStore();
        const form = reactive({
            first_name: null,
            last_name:null,
            middle_name:null,
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
            AuthService.updateUser(form)
                .then(() => authStore.getCurrentUser())
                .then((response) => (alertStore.success(trans('global.phrases.profile_updated'))))
                .catch((error) => (alertStore.error(apiUtils.getError(error))));
        }

        return {
            onFormSubmit,
            form,
            trans,
        }
    },
});
</script>
