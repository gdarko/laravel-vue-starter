<template>
    <div v-if="user">
        <transition name="fade">
            <img v-if="user.avatar_url" :src="user.avatar_url" class="w-16 h-16 rounded-full lg:w-20 lg:h-20" alt=""/>
            <span v-else class="w-16 h-16 rounded-full lg:w-20 lg:h-20"><Avatar></Avatar></span>
        </transition>
        <ul class="mt-2">
            <li class="mb-1 font-bold">{{ user.full_name }}</li>
            <li>{{ trans('users.labels.email') }}: {{ user.email }}</li>
            <li v-if="user.email_verified" class="text-green-500 mt-2">
                {{ trans('users.status.verified') }}
            </li>
        </ul>
        <div v-if="!user.email_verified" class="mt-4">
            <DefaultAlert class="mb-4"/>
            <form @submit.prevent="onVerificationSend">
                <Button type="submit" :text="trans('users.status.ask_verify')"/>
            </form>
        </div>
    </div>
</template>

<script>
import AuthService from "@/services/AuthService";
import apiHelpers from "@/helpers/api";
import Button from "@/views/components/input/Button";

import {trans} from "@/helpers/i18n";

import {defineComponent} from 'vue'
import {useAuthStore} from "@/stores/auth";
import {useAlertStore} from "@/stores";
import Avatar from "@/views/components/icons/Avatar";
import DefaultAlert from "@/views/components/alerts/DefaultAlert";

export default defineComponent({
    components: {
        DefaultAlert,
        Avatar,
        Button
    },
    setup() {
        const authService = new AuthService();
        const alertStore = useAlertStore();
        const {user} = useAuthStore()

        function onVerificationSend() {
            authService.sendVerification({user: user.id})
                .then((response) => (alertStore.success("Email verification link sent.")))
                .catch((error) => (alertStore.error(apiHelpers.getError(error))));
        }

        return {
            user,
            onVerificationSend,
            trans
        }
    }
});
</script>
