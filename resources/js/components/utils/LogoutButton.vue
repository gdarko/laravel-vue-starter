<template>
    <button type="button" @click="logout" class="inline-flex items-center space-x-2">
        <span class="hidden sm:inline">Logout</span>
        <LogoutIcon class="w-6 h-6 text-white"/>
    </button>
</template>

<script>
import LogoutIcon from "@/components/icons/LogoutIcon";

export default {
    components: {LogoutIcon},
    name: "LogoutButton",
    methods: {
        logout() {
            this.$store.dispatch("auth/logout");
        },
    },
};
</script>
