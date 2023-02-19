<template>
    <Page>
        <div class="w-full xl:w-2/3 ml-auto mr-auto">
            <Overview class="mb-4" @change-avatar="isAvatarModalShowing = true;"/>
            <FormGeneral class="mb-4"/>
            <FormPassword class="mb-4"/>
        </div>
    </Page>

    <Modal :is-showing="isAvatarModalShowing" @close="isAvatarModalShowing = false;">
        <FormAvatar @error="isAvatarModalShowing = false;" @done="isAvatarModalShowing = false;"/>
    </Modal>

</template>

<script>
import {defineComponent, ref} from "vue";
import {trans} from "@/helpers/i18n";
import {useAuthStore} from "@/stores/auth";
import FormPassword from "@/views/pages/private/profile/partials/FormPassword";
import FormGeneral from "@/views/pages/private/profile/partials/FormGeneral";
import FormAvatar from "@/views/pages/private/profile/partials/FormAvatar";
import Overview from "@/views/pages/private/profile/partials/Overview";
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
        Overview,
        FormGeneral,
        FormPassword,
        FormAvatar,
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
