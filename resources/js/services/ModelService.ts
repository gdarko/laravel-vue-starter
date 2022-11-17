import BaseService from "@/services/BaseService";
import axios from "@/plugins/axios";

import {useAlertStore} from "@/stores";

export default abstract class ModelService extends BaseService {

    constructor() {
        super();
        this.setupAPI(axios.defaults.baseURL + '/api');
    }

    public create() {
        return this.api.get(this.url + `/create`);
    }

    public find(id) {
        return this.api.get(this.url + `/${id}`);
    }

    public edit(id) {
        return this.api.get(this.url + `/${id}/edit`);
    }

    public store(payload) {

        let data = new FormData();
        for (let i in payload) {
            data.append(i, payload[i]);
        }
        return this.api.post(this.url, data);
    }

    public update(id, payload) {
        let data = new FormData();
        for (let i in payload) {
            data.append(i, payload[i]);
        }
        data.append('_method', 'patch');
        return this.api.post(this.url + `/${id}`, data);
    }

    public delete(id) {
        return this.api.delete(this.url + `/${id}`);
    }

    public index(params = {}) {
        let path = this.url;
        let query = new URLSearchParams(params).toString();
        if (query) {
            path += '?' + query
        }
        return this.api.get(path);
    }

    public paginate(link) {
        return this.api.get(link);
    }

    public handleUpdate(model, form, onSuccess, onError) {
        const alertStore = useAlertStore();
        if (!model || !model.hasOwnProperty('id')) {
            return false;
        }
        this.update(model.id, form).then((response) => {
            let answer = response.data;
            alertStore.success(answer.message);
            if (onSuccess) {
                onSuccess(answer);
            }
        }).catch((error) => {
            if (error.response.data.hasOwnProperty('errors')) {
                alertStore.error(error.response.data.errors);
            }
            if (onError) {
                onError(error);
            }
        });
    }

    public handleCreate(form, onSuccess, onError) {
        const alertStore = useAlertStore();
        this.store(form).then((response) => {
            let answer = response.data;
            alertStore.success(answer.message);
            if (onSuccess) {
                onSuccess(answer);
            }
        }).catch((error) => {
            if (error.response.data.hasOwnProperty('errors')) {
                alertStore.error(error.response.data.errors);
            }
            if (onError) {
                onError(error);
            }
        });
    }
}
