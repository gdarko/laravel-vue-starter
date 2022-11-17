<template>
    <form @submit.prevent="onSubmit">
        <DefaultAlert class="mb-4"/>
        <div class="mb-4">
            <label for="file" class="text-sm text-gray-500 mb-5">{{ label }}</label>
            <input type="file" :accept="fileTypes" @change="onChange" id="file"/>
        </div>
        <Button :text="button"/>
    </form>
</template>

<script>
import {reactive, defineComponent} from "vue";
import {useAlertStore} from "@/stores";
import {trans} from "@/helpers/i18n";
import {getResponseError} from "@/helpers/api";
import FileService from "@/services/FileService";
import Button from "@/views/components/input/Button";
import DefaultAlert from "@/views/components/alerts/DefaultAlert";

export default defineComponent({
    name: "FileUpload",
    props: {
        fileTypes: {
            type: Array,
            default: null,
        },
        endpoint: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            default: "",
        },
        button: {
            type: String,
            default: "Upload"
        }
    },
    emits: ['done'],
    components: {
        DefaultAlert,
        Button
    },
    setup(props, {emit}) {

        const alertStore = useAlertStore();
        const form = reactive({
            file: null,
        })

        function onChange(event) {
            alertStore.clear();
            form.file = event.target.files[0];
        }

        function onSubmit() {
            const payload = {};
            const formData = new FormData();
            formData.append("file", form.file);
            payload.file = formData;
            payload.endpoint = this.endpoint;
            alertStore.clear();
            FileService.upload(payload).then(() => {
                alertStore.success(trans('global.phrases.file_uploaded'))
                emit("done");
            }).catch((error) => {
                alertStore.error(getResponseError(error));
            });
        }

        return {
            onSubmit,
            onChange,
            form,
        }
    }
});
</script>
