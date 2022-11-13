<template>
    <div v-if="user">
        <transition name="fade">
            <img v-if="user.avatar" :src="user.avatar_url" class="w-16 h-16 rounded-full lg:w-20 lg:h-20" alt=""/>
            <span v-else class="w-16 h-16 rounded-full lg:w-20 lg:h-20"><AvatarIcon></AvatarIcon></span>
        </transition>
        <ul class="mt-2">
            <li class="mb-1 font-bold">{{ user.full_name }}</li>
            <li>Email: {{ user.email }}</li>
            <li v-if="user.email_verified" class="text-green-500 mt-2">
                {{ trans('users.status.verified') }}
            </li>
        </ul>
        <div v-if="!user.email_verified" class="mt-4">
            <FormAlert class="mb-4"/>
            <form @submit.prevent="onVerificationSend">
                <Button type="submit" :text="trans('users.status.ask_verify')"/>
            </form>
        </div>
    </div>
</template>

<script>
import apiUtils from "@/utils/api";
import AuthService from "@/services/AuthService";
import Alert from "@/views/utils/Alert";
import Button from "@/views/utils/Button";

import {trans} from "@/utils/i18n";

import {defineComponent} from 'vue'
import AvatarIcon from "@/views/icons/AvatarIcon";
import {useAuthStore} from "@/stores/auth";
import FormAlert from "@/views/utils/FormAlert";
import {useAlertStore} from "@/stores";

export default defineComponent({
    components: {
        FormAlert,
        AvatarIcon,
        Alert,
        Button
    },
    setup() {
        const alertStore = useAlertStore();
        const {user} = useAuthStore()

        function onVerificationSend() {
            AuthService.sendVerification({user: user.id})
                .then((response) => (alertStore.success("Email verification link sent.")))
                .catch((error) => (alertStore.error(apiUtils.getError(error))));
        }

        return {
            user,
            onVerificationSend,
            trans
        }
    }
});
</script>
