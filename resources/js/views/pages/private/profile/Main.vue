<template>
    <Page>
        <div class="w-full xl:w-2/3 ml-auto mr-auto">
            <Overview class="mb-4" @change-avatar-started="isAvatarModalShowing = true;"/>
            <FormGeneral class="mb-4"/>
            <FormPassword class="mb-4"/>
        </div>
    </Page>

    <Modal :is-showing="isAvatarModalShowing" @close="isAvatarModalShowing = false;">
        <FormAvatar @error="isAvatarModalShowing = false;" @done="isAvatarModalShowing = false;" @success="onAvatarChange"/>
    </Modal>

</template>

<script>
import {computed, defineComponent, ref} from "vue";
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
import AuthService from "@/services/AuthService";
import {useAlertStore} from "@/stores";
import {getResponseError} from "@/helpers/api";
import Badge from "@/views/components/Badge";
import Button from "@/views/components/input/Button";

export default defineComponent({
    components: {
        Button,
        Badge,
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

        const authService = new AuthService();
        const alertStore = useAlertStore();
        const isAvatarModalShowing = ref(false);

        function onAvatarChange(data) {
            useAuthStore().getCurrentUser();
        }

        function onVerificationSend() {
            const {user} = useAuthStore();
            authService.sendVerification({user: user.id})
                .then((response) => (alertStore.success(trans('global.phrases.verification_sent'))))
                .catch((error) => (alertStore.error(getResponseError(error))));
        }

        return {
            onAvatarChange,
            onVerificationSend,
            isAvatarModalShowing,
            trans
        }
    }
});
</script>
