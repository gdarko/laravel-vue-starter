<template>
    <form @submit.prevent="updateUser">
        <Alert :message="message" :error="error" @closed="error = null; message = null" class="mb-4"/>
        <TextInput type="text" label="Name" name="name" v-model="name" class="mb-2"/>
        <TextInput type="email" label="Email" name="email" v-model="email" autocomplete="email" placeholder="luke@jedi.com" class="mb-4"/>
        <Button type="submit" text="Update"/>
    </form>
</template>

<script>
import {mapGetters} from "vuex";
import {getError} from "@/utils/helpers";
import Button from "@/components/utils/Button";
import TextInput from "@/components/utils/TextInput";
import Alert from "@/components/utils/Alert";
import AuthService from "@/services/AuthService";

export default {
    name: "AccountDetails",
    components: {
        Button,
        TextInput,
        Alert,
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
