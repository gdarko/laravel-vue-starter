<template>
    <div class="p-5 xl:px-0">
        <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            <AccountInfo class="p-5 bg-white border rounded shadow"/>
            <AccountDetails class="p-5 bg-white border rounded shadow"/>
            <AccountPassword class="p-5 bg-white border rounded shadow"/>
            <FileUpload class="p-5 bg-white border rounded shadow"
                label="Upload Avatar"
                :fileTypes="['image/*']"
                endpoint="/users/auth/avatar"
                @done="reloadAvatar()"/>
        </div>
    </div>
</template>

<script>
import AccountInfo from "@/components/account/AccountInfo";
import AccountDetails from "@/components/account/AccountDetails";
import AccountPassword from "@/components/account/AccountPassword";
import FileUpload from "@/components/utils/FileUpload";

import {defineComponent} from "vue";
import {useStore} from 'vuex';

export default defineComponent({
    name: "UserView",
    components: {
        AccountInfo,
        AccountDetails,
        AccountPassword,
        FileUpload,
    },
    setup() {
        const store = useStore();
        function reloadAvatar() {
            store.dispatch("auth/getCurrentUser");
        }
        return {
            reloadAvatar
        }
    }
});
</script>
