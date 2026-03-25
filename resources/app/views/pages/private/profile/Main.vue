<template>
    <Page>
        <div class="w-full max-w-5xl ml-auto mr-auto">
            <!-- Profile header -->
            <div class="card bg-base-100 shadow border border-base-300/50 mb-6 overflow-hidden">
                <div class="bg-gradient-to-r from-primary to-teal-500 h-28 relative">
                    <div class="absolute -bottom-10 left-8">
                        <div class="relative group">
                            <div class="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-base-100 shadow-lg" v-if="authStore?.user?.avatar_thumb_url">
                                <img :src="authStore?.user?.avatar_thumb_url" :alt="authStore.user.full_name" class="w-full h-full object-cover"/>
                            </div>
                            <div v-else class="w-20 h-20 rounded-2xl ring-4 ring-base-100 shadow-lg overflow-hidden">
                                <Avatar class="w-full h-full"/>
                            </div>
                            <button @click="activeTab = 'avatar'" class="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                <Icon name="edit" class="h-5 w-5 text-white"/>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="pt-14 pb-5 px-8">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                            <h2 class="text-xl font-bold flex items-center gap-2">
                                {{ authStore.user.full_name }}
                                <Badge theme="success" v-if="authStore.user.email_verified_at">{{ trans('users.status.verified') }}</Badge>
                            </h2>
                            <p class="text-base-content/50 text-sm mt-0.5">
                                {{ authStore.user.email }}
                                <Badge v-if="!authStore.user.email_verified_at" theme="warning" class="ml-1 align-middle">{{ trans('users.status.not_verified') }}</Badge>
                            </p>
                        </div>
                        <div class="flex items-center gap-3">
                            <button v-if="!authStore.user.email_verified_at" @click.prevent="onVerificationSend" class="btn btn-outline btn-warning btn-xs">
                                <Icon name="envelope" class="h-3 w-3"/>
                                {{ trans('users.status.ask_verify') }}
                            </button>
                            <p class="text-base-content/30 text-xs">{{ trans('global.phrases.member_since', {date: authStore.user.created_at}) }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tabbed settings -->
            <div class="card bg-base-100 shadow border border-base-300/50">
                <div class="flex flex-col sm:flex-row min-h-[420px]">
                    <!-- Vertical tabs -->
                    <div class="sm:w-56 shrink-0 sm:border-r border-b sm:border-b-0 border-base-300/50 p-3 sm:p-4">
                        <ul class="flex sm:flex-col gap-1">
                            <li>
                                <button @click="activeTab = 'general'"
                                        class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
                                        :class="activeTab === 'general' ? 'bg-primary/10 text-primary' : 'text-base-content/60 hover:text-base-content hover:bg-base-200'">
                                    <Icon name="users" class="h-4 w-4"/>
                                    <span class="hidden sm:inline">{{ trans('users.labels.general_settings') }}</span>
                                    <span class="sm:hidden">General</span>
                                </button>
                            </li>
                            <li>
                                <button @click="activeTab = 'password'"
                                        class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
                                        :class="activeTab === 'password' ? 'bg-primary/10 text-primary' : 'text-base-content/60 hover:text-base-content hover:bg-base-200'">
                                    <Icon name="save" class="h-4 w-4"/>
                                    <span class="hidden sm:inline">{{ trans('users.labels.password_settings') }}</span>
                                    <span class="sm:hidden">Password</span>
                                </button>
                            </li>
                            <li>
                                <button @click="activeTab = 'avatar'"
                                        class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
                                        :class="activeTab === 'avatar' ? 'bg-primary/10 text-primary' : 'text-base-content/60 hover:text-base-content hover:bg-base-200'">
                                    <Icon name="cloud-upload" class="h-4 w-4"/>
                                    <span class="hidden sm:inline">{{ trans('users.labels.avatar_settings') }}</span>
                                    <span class="sm:hidden">Avatar</span>
                                </button>
                            </li>
                        </ul>
                    </div>

                    <!-- Tab content -->
                    <div class="flex-1 p-6 sm:p-8">
                        <!-- General tab -->
                        <div v-if="activeTab === 'general'">
                            <h3 class="text-lg font-semibold mb-1">{{ trans('users.labels.general_settings') }}</h3>
                            <p class="text-sm text-base-content/40 mb-6">Update your name and email address.</p>
                            <form @submit.prevent="onGeneralSubmit" class="space-y-4">
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <TextInput type="text" :required="true" :label="trans('users.labels.first_name')" name="first_name" v-model="generalForm.first_name"/>
                                    <TextInput type="text" :required="true" :label="trans('users.labels.last_name')" name="last_name" v-model="generalForm.last_name"/>
                                </div>
                                <TextInput type="text" :label="trans('users.labels.middle_name')" name="middle_name" v-model="generalForm.middle_name"/>
                                <TextInput type="email" :required="true" :label="trans('users.labels.email')" name="email" v-model="generalForm.email" autocomplete="email"/>
                                <div class="pt-2">
                                    <Button type="submit" :label="trans('global.buttons.update')"/>
                                </div>
                            </form>
                        </div>

                        <!-- Password tab -->
                        <div v-if="activeTab === 'password'">
                            <h3 class="text-lg font-semibold mb-1">{{ trans('users.labels.password_settings') }}</h3>
                            <p class="text-sm text-base-content/40 mb-6">Ensure your account uses a strong password.</p>
                            <form @submit.prevent="onPasswordSubmit" class="space-y-4">
                                <TextInput type="password" :required="true" :label="trans('users.labels.current_password')" name="current_password" v-model="passwordForm.currentPassword"/>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <TextInput type="password" :required="true" :label="trans('users.labels.new_password')" name="password" v-model="passwordForm.password"/>
                                    <TextInput type="password" :required="true" :label="trans('users.labels.confirm_password')" name="password_confirmation" v-model="passwordForm.passwordConfirm"/>
                                </div>
                                <div class="pt-2">
                                    <Button type="submit" :label="trans('global.buttons.update')"/>
                                </div>
                            </form>
                        </div>

                        <!-- Avatar tab -->
                        <div v-if="activeTab === 'avatar'">
                            <h3 class="text-lg font-semibold mb-1">{{ trans('users.labels.avatar_settings') }}</h3>
                            <p class="text-sm text-base-content/40 mb-6">Upload a new profile photo.</p>
                            <form @submit.prevent="onAvatarSubmit" class="space-y-4">
                                <FileInput name="avatar" v-model="avatarForm.avatar" accept="image/*" :label="trans('users.labels.ask_upload_avatar')" @click="avatarForm.avatar = ''"/>
                                <div class="pt-2">
                                    <Button type="submit" :label="trans('global.buttons.upload')"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Page>
</template>

<script>
import {defineComponent, reactive, ref, onMounted} from "vue";
import {trans} from "@/helpers/i18n";
import {useAuthStore} from "@/stores/auth";
import {useToastStore} from "@/stores/toast";
import {getResponseError} from "@/helpers/api";
import AuthService from "@/services/AuthService";
import Page from "@/views/layouts/Page";
import Avatar from "@/views/components/icons/Avatar";
import Icon from "@/views/components/icons/Icon";
import Badge from "@/views/components/Badge";
import Button from "@/views/components/input/Button";
import TextInput from "@/views/components/input/TextInput";
import FileInput from "@/views/components/input/FileInput";

export default defineComponent({
    components: {
        Page, Avatar, Icon, Badge, Button, TextInput, FileInput,
    },
    setup() {

        const authService = new AuthService();
        const toastStore = useToastStore();
        const authStore = useAuthStore();
        const activeTab = ref('general');

        const generalForm = reactive({
            first_name: null,
            last_name: null,
            middle_name: null,
            email: null,
        });

        onMounted(() => {
            if (authStore.user) {
                generalForm.first_name = authStore.user.first_name;
                generalForm.last_name = authStore.user.last_name;
                generalForm.middle_name = authStore.user.middle_name;
                generalForm.email = authStore.user.email;
            }
        });

        function onGeneralSubmit() {
            authService.updateUser(generalForm)
                .then(() => authStore.getCurrentUser())
                .then(() => toastStore.success(trans('global.phrases.profile_updated')))
                .catch((error) => toastStore.error(getResponseError(error)));
        }

        const passwordForm = reactive({
            currentPassword: null,
            password: null,
            passwordConfirm: null,
        });

        function onPasswordSubmit() {
            authService.updatePassword({
                current_password: passwordForm.currentPassword,
                password: passwordForm.password,
                password_confirmation: passwordForm.passwordConfirm,
            })
                .then(() => {
                    toastStore.success(trans('global.phrases.password_updated'));
                    passwordForm.currentPassword = null;
                    passwordForm.password = null;
                    passwordForm.passwordConfirm = null;
                })
                .catch((error) => toastStore.error(getResponseError(error)));
        }

        const avatarForm = reactive({
            avatar: null,
        });

        function onAvatarSubmit() {
            if (!avatarForm.avatar) return;
            authStore.updateAvatar(authStore.user.id, {avatar: avatarForm.avatar})
                .then(() => {
                    avatarForm.avatar = null;
                    activeTab.value = 'general';
                });
        }

        function onVerificationSend() {
            authService.sendVerification({user: authStore.user.id})
                .then(() => toastStore.success(trans('global.phrases.verification_sent')))
                .catch((error) => toastStore.error(getResponseError(error)));
        }

        return {
            authStore,
            activeTab,
            generalForm,
            passwordForm,
            avatarForm,
            onGeneralSubmit,
            onPasswordSubmit,
            onAvatarSubmit,
            onVerificationSend,
            trans,
        }
    }
});
</script>
