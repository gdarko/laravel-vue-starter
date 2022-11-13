import axios from "@/plugins/axios"
import {useAuthStore} from "@/store/auth";

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
        const store = useAuthStore();
        if (
            error.response &&
            [401, 419].includes(error.response.status) &&
            store.user && !store.guest
        ) {
            store.logout();
        }
        return Promise.reject(error);
    }
);
