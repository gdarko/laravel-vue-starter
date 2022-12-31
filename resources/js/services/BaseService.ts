import axios from "@/plugins/axios"
import type {AxiosInstance} from "axios";

export default abstract class BaseService {

    api: AxiosInstance;
    url: string;

    setupAPI(baseURL) {
        this.api = axios.create({
            baseURL: baseURL,
            withCredentials: true,
        });
        this.api.interceptors.response.use(
            (response) => {
                return response;
            },
            function (error) {
                let data = window.localStorage.getItem('currentUser');
                if (
                    error.response &&
                    [401, 419].includes(error.response.status) &&
                    data
                ) {
                    let tmpAxios = axios.create({
                        withCredentials: true,
                    });
                    tmpAxios.post("/logout").then((r) => {
                        window.location.href = '/';
                    })
                }
                return Promise.reject(error);
            },
        )
    }

    protected post(url, data, config = {}) {
        return this.api.post(url, data, config);
    }

    protected put(url, data, config = {}) {
        if(data instanceof FormData) {
            data.append('_method', 'PUT');
        } else {
            data._method = 'PUT';
        }
        return this.api.post(url, data, config);
    }

    protected patch(url, data, config = {}) {
        if(data instanceof FormData) {
            data.append('_method', 'PATCH');
        } else {
            data._method = 'PATCH';
        }
        return this.api.post(url, data, config);
    }

    protected get(url, config = {}) {
        return this.api.get(url, config);
    }

    protected delete(url, config = {}) {
        return this.api.delete(url, config);
    }
}

