import axios from "@/plugins/axios"
import type {AxiosInstance} from "axios";

export default abstract class BaseService {

    api: AxiosInstance;
    url: string;
    setupAPI(baseURL) {
        this.api = axios.create({
            baseURL:baseURL,
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
}

