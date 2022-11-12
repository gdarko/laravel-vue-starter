<template>
    <div v-if="user">
        <transition name="fade">
            <img v-if="user.avatar" :src="user.avatar_url" class="w-16 h-16 rounded-full lg:w-20 lg:h-20" alt=""/>
            <span v-else class="w-16 h-16 rounded-full lg:w-20 lg:h-20"><AvatarIcon></AvatarIcon></span>
        </transition>
        <ul class="mt-2">
            <li class="mb-1 font-bold">{{ user.name }}</li>
            <li>Email: {{ user.email }}</li>
            <li v-if="user.emailVerified" class="text-green-500 mt-2">
                {{ trans('users.status.verified') }}
            </li>
        </ul>
        <div v-if="!user.emailVerified" class="mt-4">
            <Alert :message="state.message" :error="state.error" @closed="state.message = null; state.error = null" class="mb-4"/>
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

import {useAuth} from "@/modules/auth";
import {trans} from "@/modules/i18n";

import {reactive, defineComponent} from 'vue'
import AvatarIcon from "@/views/icons/AvatarIcon";

export default defineComponent({
    components: {
        AvatarIcon,
        Alert,
        Button
    },
    setup() {
        const {user} = useAuth()
        const state = reactive({
            message: null,
            error: null,
        })

        function onVerificationSend() {
            state.message = null;
            state.error = null;
            AuthService.sendVerification({user: user.id})
                .then((response) => (state.message = "Email verification link sent."))
                .catch((error) => (state.error = apiUtils.getError(error)));
        }

        return {
            state,
            user,
            onVerificationSend,
            trans
        }
    }
});
</script>
