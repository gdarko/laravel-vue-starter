<template>
    <div v-if="user">
        <transition name="fade">
            <img v-if="user.avatar" :src="user.avatar" class="w-16 h-16 rounded-full lg:w-20 lg:h-20" alt=""/>
        </transition>
        <ul>
            <li class="mb-1 font-bold">{{ user.name }}</li>
            <li>Email: {{ user.email }}</li>
            <li v-if="user.emailVerified" class="text-green-500 mt-2">
                Email Verified
            </li>
        </ul>
        <div v-if="!user.emailVerified" class="mt-4">
            <Alert :message="state.message" :error="state.error" @closed="state.message = null; state.error = null" class="mb-4"/>
            <form @submit.prevent="onVerificationSend">
                <Button type="submit" text="Verify Email"/>
            </form>
        </div>
    </div>
</template>

<script>
import {getError} from "@/utils/helpers";
import AuthService from "@/services/AuthService";
import Alert from "@/components/utils/Alert";
import Button from "@/components/utils/Button";

import {useAuth} from "@/modules/auth";
import {reactive, defineComponent} from 'vue'

export default defineComponent({
    name: "AccountInfo",
    components: {
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
                .catch((error) => (state.error = getError(error)));
        }

        return {
            state,
            user,
            onVerificationSend
        }
    }
});
</script>
