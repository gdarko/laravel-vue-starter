<template>
    <form @submit.prevent="onFormSubmit">
        <Alert :message="state.message" :error="state.error" @closed="state.error = null; state.message = null" class="mb-4"/>
        <TextInput type="text" :label="trans('users.labels.name')" name="name" v-model="form.name" class="mb-2"/>
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
import {useAuth} from '@/modules/auth';
import {trans} from "@/modules/i18n";

import {defineComponent, reactive, computed, onMounted} from "vue";
import {useStore} from 'vuex';


export default defineComponent({
    name: "AccountDetails",
    components: {
        Button,
        TextInput,
        Alert,
    },

    setup: function () {

        const store = useStore();
        const {user} = useAuth();
        const state = reactive({
            message: null,
            error: null,
        })
        const form = reactive({
            name: null,
            email: null,
        })

        onMounted(() => {
            if (!user) {
                return;
            }
            form.name = user.value.name;
            form.email = user.value.email;
        })

        function onFormSubmit() {
            state.error = null;
            state.message = null;
            AuthService.updateUser(form)
                .then(() => store.dispatch("auth/getCurrentUser"))
                .then((response) => (state.message = 'Profile updated successfully.'))
                .catch((error) => (state.error = apiUtils.getError(error)));
        }

        return {
            onFormSubmit,
            state,
            form,
            trans,
        }
    },
});
</script>
