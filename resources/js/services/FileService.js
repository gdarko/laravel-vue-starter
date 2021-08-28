import * as API from "@/services/API";

export default {
    uploadFile(payload) {
        return API.apiClient.post(payload.endpoint, payload.file);
    },
};
