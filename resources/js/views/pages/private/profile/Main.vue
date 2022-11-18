<template>
    <Page>
        <div class="w-full lg:w-1/2 ml-auto mr-auto">
            <ProfileOverview class="mb-4" @change-avatar="isAvatarModalShowing = true;"/>
            <ProfileForm class="mb-4"/>
            <PasswordForm class="mb-4"/>
        </div>
    </Page>

    <Modal :showing="isAvatarModalShowing" @close="isAvatarModalShowing = false;">
        <AvatarForm @error="isAvatarModalShowing = false;" @done="isAvatarModalShowing = false;"/>
    </Modal>

</template>

<script>
import {defineComponent, ref} from "vue";
import {trans} from "@/helpers/i18n";
import {useAuthStore} from "@/stores/auth";
import PasswordForm from "@/views/pages/private/profile/PasswordForm";
import ProfileForm from "@/views/pages/private/profile/ProfileForm";
import ProfileOverview from "@/views/pages/private/profile/ProfileOverview";
import AvatarForm from "@/views/pages/private/profile/AvatarForm";
import Page from "@/views/layouts/Page";
import Modal from "@/views/components/Modal";
import Panel from "@/views/components/Panel";
import Avatar from "@/views/components/icons/Avatar";

export default defineComponent({
    components: {
        Avatar,
        Panel,
        Modal,
        Page,
        ProfileOverview,
        ProfileForm,
        PasswordForm,
        AvatarForm,
    },
    setup() {
        const store = useAuthStore()
        const isAvatarModalShowing = ref(false);

        function reloadAvatar() {
            store.getCurrentUser();
        }
        return {
            isAvatarModalShowing,
            reloadAvatar,
            trans
        }
    }
});
</script>
