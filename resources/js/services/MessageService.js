import * as API from "@/services/API";

export default {
    index(params) {
        let path = '/messages'
        let query = new URLSearchParams(params).toString();
        if (query) {
            path += '?' + query
        }
        return API.apiClient.get(path);
    },
    store(payload) {
        return API.apiClient.post("/messages", payload);
    },
    paginate(link) {
        return API.apiClient.get(link);
    },
};
