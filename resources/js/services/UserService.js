import * as API from "@/services/API";

export default {
    find(userId) {
        return API.apiClient.get(`/users/${userId}`);
    },
    get(page) {
        return API.apiClient.get(`/users/?page=${page}`);
    },
    paginate(link) {
        return API.apiClient.get(link);
    },
};
