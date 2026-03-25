<template>
    <Panel>
        <div class="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            <div class="shrink-0">
                <div class="w-24 h-24 rounded-full overflow-hidden" v-if="authStore?.user?.avatar_thumb_url">
                    <img :src="authStore?.user?.avatar_thumb_url" :alt="authStore.user.full_name" class="w-full h-full object-cover"/>
                </div>
                <Avatar v-else class="w-24 h-24"/>
            </div>
            <div class="text-center sm:text-left">
                <h2 class="text-2xl font-bold mb-1">
                    {{ authStore.user.full_name }}
                    <Badge theme="success" class="ml-2 align-middle" v-if="authStore.user.email_verified_at">
                        {{ trans('users.status.verified') }}
                    </Badge>
                </h2>
                <p class="text-base-content/60 text-sm mb-1">
                    <Icon name="envelope" class="h-4 w-4 inline-block -mt-0.5"/> {{ authStore.user.email }}
                </p>
                <p class="text-base-content/40 text-sm">
                    {{ trans('global.phrases.member_since', {date: authStore.user.created_at}) }}
                </p>
                <div class="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Button @click.prevent="onChangeAvatar" theme="success" :label="trans('global.buttons.change_avatar')"/>
                    <form @submit.prevent="onVerificationSend" v-if="!authStore.user.email_verified_at">
                        <Button type="submit" :label="trans('users.status.ask_verify')"/>
                    </form>
                </div>
            </div>
        </div>
    </Panel>
</template>

<script>
import AuthService from "@/services/AuthService";
import {getResponseError} from "@/helpers/api";

import {trans} from "@/helpers/i18n";

import {computed, defineComponent} from 'vue'
import {useAuthStore} from "@/stores/auth";
import {useToastStore} from "@/stores/toast";
import Avatar from "@/views/components/icons/Avatar";
import Button from "@/views/components/input/Button";
import Icon from "@/views/components/icons/Icon";
import Panel from "@/views/components/Panel";
import Badge from "@/views/components/Badge";

export default defineComponent({
    components: {
        Panel,
        Badge,
        Avatar,
        Button,
        Icon
    },
    emits: ['change-avatar-started'],
    setup(props, {emit}) {
        const authService = new AuthService();
        const toastStore = useToastStore();
        const authStore = useAuthStore()

        function onVerificationSend() {
            authService.sendVerification({user: authStore.user.id})
                .then((response) => (toastStore.success(trans('global.phrases.verification_sent'))))
                .catch((error) => (toastStore.error(getResponseError(error))));
        }

        function onChangeAvatar() {
            emit('change-avatar-started');
        }

        return {
            authStore,
            onVerificationSend,
            onChangeAvatar,
            trans,
        }
    }
});
</script>
