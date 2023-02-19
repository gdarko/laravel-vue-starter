<template>
    <Panel :title="trans('users.labels.avatar_settings')">
        <form @submit.prevent="onSubmit">
            <FileInput name="file" :label="trans('users.labels.avatar')" v-model="form.file" @clear="form.file = ''" accept="image/*" class="mb-4"></FileInput>
            <Button :label="trans('global.buttons.upload')"/>
        </form>
    </Panel>
</template>

<script>
import {reactive, defineComponent} from "vue";
import {useAlertStore, useAuthStore} from "@/stores";
import {trans} from "@/helpers/i18n";
import Button from "@/views/components/input/Button";
import FileInput from "@/views/components/input/FileInput";
import Panel from "@/views/components/Panel";

export default defineComponent({
    emits: ['done', 'error'],
    components: {
        Panel,
        FileInput,
        Button
    },
    setup(props, {emit}) {

        const alertStore = useAlertStore();
        const authStore = useAuthStore();
        const form = reactive({
            file: null,
        })

        function onChange(event) {
            alertStore.clear();
            form.file = event.target.files[0];
        }

        function onSubmit() {

            authStore.updateAvatar(authStore.user.id, {'avatar': form.file}).catch((error) => {
                emit('error');
            });

            emit('done');
        }

        return {
            onSubmit,
            onChange,
            form,
            trans
        }
    }
});
</script>
