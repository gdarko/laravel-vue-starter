import * as API from "@/services/API";

export default {
    create() {
        return API.apiClient.get(`/users/create`);
    },
    find(id) {
        return API.apiClient.get(`/users/${id}`);
    },
    edit(id) {
        return API.apiClient.get(`/users/${id}/edit`);
    },
    store(payload) {
        return API.apiClient.post("/users", payload);
    },
    update(id, payload) {
        return API.apiClient.put(`/users/${id}`, payload);
    },
    delete(id) {
        return API.apiClient.delete(`/users/${id}`);
    },
    index(params = {}) {
        let path = '/users'
        let query = new URLSearchParams(params).toString();
        if (query) {
            path += '?' + query
        }
        return API.apiClient.get(path);
    },
    paginate(link) {
        return API.apiClient.get(link);
    }
};
