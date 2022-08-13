import * as API from "@/services/API";

export default {
    upload(payload) {
        return API.apiClient.post(payload.endpoint, payload.file);
    },
};
