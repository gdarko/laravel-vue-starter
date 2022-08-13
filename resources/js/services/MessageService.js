import * as API from "@/services/API";

export default {
    get(page) {
        return API.apiClient.get(`/messages/?page=${page}`);
    },
    store(payload) {
        return API.apiClient.post("/messages", payload);
    },
    paginate(link) {
        return API.apiClient.get(link);
    },
};
