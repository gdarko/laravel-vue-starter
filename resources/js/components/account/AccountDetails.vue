<template>
    <form @submit.prevent="updateUser">
        <FlashMessage :message="message" :error="error" @closed="error = null; message = null" class="mb-4"/>
        <BaseInput type="text" label="Name" name="name" v-model="name" class="mb-2"/>
        <BaseInput type="email" label="Email" name="email" v-model="email" autocomplete="email" placeholder="luke@jedi.com" class="mb-4"/>
        <BaseButton type="submit" text="Update"/>
    </form>
</template>

<script>
import {mapGetters} from "vuex";
import {getError} from "@/utils/helpers";
import BaseButton from "@/components/utils/BaseButton";
import BaseInput from "@/components/utils/BaseInput";
import FlashMessage from "@/components/utils/FlashMessage";
import AuthService from "@/services/AuthService";

export default {
    name: "AccountDetails",
    components: {
        BaseButton,
        BaseInput,
        FlashMessage,
    },
    data() {
        return {
            name: null,
            email: null,
            error: null,
            message: null,
        };
    },
    computed: {
        ...mapGetters("auth", ["authUser"]),
    },
    methods: {
        updateUser() {
            this.error = null;
            this.message = null;
            const payload = {
                name: this.name,
                email: this.email,
            };
            AuthService.updateUser(payload)
                .then(() => this.$store.dispatch("auth/getCurrentUser"))
                .then((response) => (this.message = 'Profile updated successfully.'))
                .catch((error) => (this.error = getError(error)));
        },
    },
    mounted() {
        this.name = this.authUser.name;
        this.email = this.authUser.email;
    },
};
</script>
