<template>
    <Panel>
        <div class="flex">
            <div class="w-1/5 px-2">
                <img v-if="user.avatar_url" :src="user.avatar_url" class="w-full rounded-full" :alt="user.full_name"/>
                <div v-else class="rounded-full">
                    <Avatar></Avatar>
                </div>
            </div>
            <div class="w-4/5 px-6 pt-2">
                <div class="items-center">
                    <ul class="mt-2">
                        <li class="mb-1 text-2xl font-bold">{{ user.full_name }}
                            <Badge type="success" class="inline" v-if="user.email_verified">
                                {{ trans('users.status.verified') }}
                            </Badge>
                        </li>
                        <li class="text-gray-700"><i class="fa fa-envelope"></i> {{ user.email }}</li>
                        <li class="mt-5 text-gray-500">{{trans('global.phrases.member_since', {date: user.created_at}) }}</li>
                    </ul>
                    <div class="mt-4">
                        <Button @click.prevent="onChangeAvatar" type="success" :text="trans('global.buttons.change_avatar')"/>
                        <form @submit.prevent="onVerificationSend" class="inline-block ml-3" v-if="!user.email_verified">
                            <Button type="submit" :text="trans('users.status.ask_verify')"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Panel>
</template>

<script>
import AuthService from "@/services/AuthService";
import {getResponseError} from "@/helpers/api";

import {trans} from "@/helpers/i18n";

import {defineComponent} from 'vue'
import {useAuthStore} from "@/stores/auth";
import {useAlertStore} from "@/stores";
import Avatar from "@/views/components/icons/Avatar";
import Button from "@/views/components/input/Button";
import Panel from "@/views/components/Panel";
import Badge from "@/views/components/Badge";

export default defineComponent({
    components: {
        Panel,
        Badge,
        Avatar,
        Button
    },
    emits: ['changeAvatar'],
    setup(props, {emit}) {
        const authService = new AuthService();
        const alertStore = useAlertStore();
        const {user} = useAuthStore()

        function onVerificationSend() {
            authService.sendVerification({user: user.id})
                .then((response) => (alertStore.success("Email verification link sent.")))
                .catch((error) => (alertStore.error(getResponseError(error))));
        }

        function onChangeAvatar() {
            emit('changeAvatar');
        }

        return {
            user,
            onVerificationSend,
            onChangeAvatar,
            trans,
        }
    }
});
</script>
