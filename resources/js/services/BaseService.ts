import axios from "@/plugins/axios"
import type {AxiosInstance} from "axios";

import {useGlobalStateStore} from "@/stores";

export default abstract class BaseService {

    api: AxiosInstance;
    url: string;

    protected globalStateStore;

    constructor() {
        this.globalStateStore = useGlobalStateStore();
    }

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
            }
        )
    }

    protected post(url, data, config = {}, id = null) {
        const self = this;
        self.globalStateStore.setLoading(id, true);
        return this.api.post(url, data, config).finally(() => {
            setTimeout(() => {
                self.globalStateStore.setLoading(id, false);
            },200)
        })
    }

    protected get(url, config = {}, id = null) {
        const self = this;
        self.globalStateStore.setLoading(id, true);
        return this.api.get(url, config).finally(() => {
            setTimeout(() => {
                self.globalStateStore.setLoading(id, false);
            },200)
        })
    }

    protected delete(url, config = {}, id = null) {
        const self = this;
        self.globalStateStore.setLoading(id, true);
        return this.api.delete(url, config).finally(() => {
            setTimeout(() => {
                self.globalStateStore.setLoading(id, false);
            },200)
        })
    }
}

