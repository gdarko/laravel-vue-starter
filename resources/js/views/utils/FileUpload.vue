<template>
    <form @submit.prevent="onSubmit">
        <Alert v-if="state.message || state.error" class="mb-3" :message="state.message" :error="state.error" @closed="clearAlert"/>
        <div class="mb-4">
            <label for="file" class="text-sm text-gray-500 mb-5">{{ label }}</label>
            <input type="file" :accept="fileTypes" @change="onChange" id="file"/>
        </div>
        <Button :text="button"/>
    </form>
</template>

<script>
import apiUtils from "@/utils/api";
import FileService from "@/services/FileService";
import Button from "@/views/utils/Button";
import Alert from "@/views/utils/Alert";

import {reactive, defineComponent} from "vue";

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
        Button,
        Alert,
    },
    setup(props, {emit}) {
        const form = reactive({
            file: null,
        })
        const state = reactive({
            message: null,
            error: null,
        })

        function clearAlert() {
            state.message = null;
            state.error = null;
        }
        function onChange(event) {
            clearAlert();
            form.file = event.target.files[0];
        }
        function onSubmit() {
            const payload = {};
            const formData = new FormData();
            formData.append("file", form.file);
            payload.file = formData;
            payload.endpoint = this.endpoint;
            clearAlert();
            FileService.upload(payload).then(() => {
                state.message = "File uploaded.";
                emit("done");
            }).catch((error) => {
                state.message = null;
                state.error = apiUtils.getError(error)
            });
        }

        return {
            onSubmit,
            onChange,
            clearAlert,
            state,
            form,
        }
    }
});
</script>
