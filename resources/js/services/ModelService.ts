import BaseService from "@/services/BaseService";
import axios from "@/plugins/axios";

import {useAlertStore} from "@/stores";
import {getResponseError} from "@/helpers/api";

export default abstract class ModelService extends BaseService {

    constructor() {
        super();
        this.setupAPI(axios.defaults.baseURL + '/api');
    }

    public create(id = null) {
        return this.get(this.url + `/create`, {}, id);
    }

    public find(object_id, id = null) {
        return this.get(this.url + `/${object_id}`, {}, id);
    }

    public edit(object_id, id = null) {
        return this.get(this.url + `/${object_id}/edit`, {}, id);
    }

    public store(payload, id = null) {
        let data = this.transformPayloadForSubmission(payload);
        return this.post(this.url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        },id)
    }

    public update(object_id, payload, id = null) {
        let data = this.transformPayloadForSubmission(payload);
        data.append('_method', 'patch');
        return this.post(this.url + `/${object_id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        }, id);
    }

    public delete(object_id, id = null) {
        return super.delete(this.url + `/${id}`, {}, id);
    }

    public index(params = {}, id = null) {
        let path = this.url;
        let query = new URLSearchParams(params).toString();
        if (query) {
            path += '?' + query
        }
        return this.get(path, {}, id);
    }

    public handleUpdate(object_id, form, id = null) {
        const alertStore = useAlertStore();
        return this.update(object_id, form, id).then((response) => {
            let answer = response.data;
            alertStore.success(answer.message);
        }).catch((error) => {
            alertStore.error(getResponseError(error));
        });
    }

    public handleCreate(form, id = null) {
        const alertStore = useAlertStore();
        return this.store(form, id).then((response) => {
            let answer = response.data;
            alertStore.success(answer.message);
        }).catch((error) => {
            alertStore.error(getResponseError(error));
        });
    }

    public transformPayloadForSubmission(payload) {
        let data = new FormData();
        for (let key in payload) {
            let val = payload[key];
            if (Array.isArray(val)) {
                for (let index in val) {
                    data.append(key + '[]', val[index]);
                }
            } else {
                data.append(key, val);
            }
        }
        return data;
    }
}
