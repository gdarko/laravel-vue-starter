<template>
    <div v-if="authUser">
        <transition name="fade">
            <img v-if="authUser.avatar" :src="authUser.avatar" class="w-16 h-16 rounded-full lg:w-20 lg:h-20" alt=""/>
        </transition>
        <ul>
            <li class="mb-1 font-bold">{{ authUser.name }}</li>
            <li>Email: {{ authUser.email }}</li>
            <li v-if="authUser.emailVerified" class="text-green-500 mt-2">
                Email Verified
            </li>
        </ul>
        <div v-if="!authUser.emailVerified" class="mt-4">
            <Alert :message="message" :error="error" @closed="error = null; message = null" class="mb-4"/>
            <form @submit.prevent="sendVerification">
                <Button type="submit" text="Verify Email"/>
            </form>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import {getError} from "@/utils/helpers";
import AuthService from "@/services/AuthService";
import Alert from "@/components/utils/Alert";
import Button from "@/components/utils/Button";

export default {
    name: "AccountInfo",
    components: {
        Alert,
        Button
    },
    data() {
        return {
            error: null,
            message: null,
        };
    },
    computed: {
        ...mapGetters("auth", ["authUser"]),
    },
    methods: {
        sendVerification() {
            this.error = null;
            this.message = null;
            const payload = {
                user: this.authUser.id,
            };
            AuthService.sendVerification(payload)
                .then((response) => (this.message = "Email verification link sent."))
                .catch((error) => (this.error = getError(error)));
        },
    },
};
</script>
