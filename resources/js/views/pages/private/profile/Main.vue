<template>
    <div class="p-5 xl:px-0">
        <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            <ProfileOverview class="p-5 bg-white border rounded shadow"/>
            <ProfileForm class="p-5 bg-white border rounded shadow"/>
            <PasswordForm class="p-5 bg-white border rounded shadow"/>
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
import {trans} from "@/helpers/i18n";
import {useAuthStore} from "@/stores/auth";
import PasswordForm from "@/views/pages/private/profile/PasswordForm";
import ProfileForm from "@/views/pages/private/profile/ProfileForm";
import ProfileOverview from "@/views/pages/private/profile/ProfileOverview";
import FileUpload from "@/views/components/input/FileUpload";

export default defineComponent({
    components: {
        ProfileOverview,
        ProfileForm,
        PasswordForm,
        FileUpload,
    },
    setup() {
        const store = useAuthStore()
        function reloadAvatar() {
            store.getCurrentUser();
        }
        return {
            reloadAvatar,
            trans
        }
    }
});
</script>
