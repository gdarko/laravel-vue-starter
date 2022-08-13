<template>
    <div class="p-5 xl:px-0">
        <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            <ProfileOverview class="p-5 bg-white border rounded shadow"/>
            <ProfileForm class="p-5 bg-white border rounded shadow"/>
            <ProfilePassword class="p-5 bg-white border rounded shadow"/>
            <FileUpload class="p-5 bg-white border rounded shadow"
                :label="trans('users.labels.ask_upload_avatar')"
                :button="trans('global.buttons.save')"
                :fileTypes="['image/*']"
                endpoint="/users/auth/avatar"
                @done="reloadAvatar()"/>
        </div>
    </div>
</template>

<script>

import {defineComponent} from "vue";
import {useStore} from 'vuex';
import {trans} from "@/modules/i18n";

import {default as ProfileOverview} from "@/views/pages/private/profile/Overview";
import {default as ProfileForm} from "@/views/pages/private/profile/Form";
import {default as ProfilePassword} from "@/views/pages/private/profile/Password";
import FileUpload from "@/views/utils/FileUpload";

export default defineComponent({
    components: {
        ProfileForm,
        ProfileOverview,
        ProfilePassword,
        FileUpload,
    },
    setup() {
        const store = useStore();
        function reloadAvatar() {
            store.dispatch("auth/getCurrentUser");
        }
        return {
            reloadAvatar,
            trans
        }
    }
});
</script>
