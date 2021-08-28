import axios from "@/plugins/axios"
import store from "@/store/index";

export const apiClient = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

/*
 * Add a response interceptor
 */
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        if (
            error.response &&
            [401, 419].includes(error.response.status) &&
            store.getters["auth/authUser"] &&
            !store.getters["auth/guest"]
        ) {
            store.dispatch("auth/logout");
        }
        return Promise.reject(error);
    }
);
