import BaseService from "@/services/BaseService";
import axios from "@/plugins/axios";

import {useAlertStore} from "@/stores";
import {getResponseError} from "@/helpers/api";

import {useGlobalStateStore} from "@/stores";

export default abstract class ModelService extends BaseService {

    constructor() {
        super();
        this.setupAPI(axios.defaults.baseURL + '/api');
    }

    public create() {
        return this.get(this.url + `/create`, {});
    }

    public find(object_id) {
        return this.get(this.url + `/${object_id}`, {});
    }

    public edit(object_id) {
        return this.get(this.url + `/${object_id}/edit`, {});
    }

    public store(payload) {
        let data = this.transformPayloadForSubmission(payload);
        return this.post(this.url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
    }

    public update(object_id, payload) {
        let data = this.transformPayloadForSubmission(payload);
        return this.patch(this.url + `/${object_id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
    }

    public delete(object_id) {
        return super.delete(this.url + `/${object_id}`, {});
    }

    public index(params = {}) {
        let path = this.url;
        let query = new URLSearchParams(params).toString();
        if (query) {
            path += '?' + query
        }
        return this.get(path, {});
    }

    public handleUpdate(ui_element_id, object_id, data) {
        const alertStore = useAlertStore();
        const globalUserState = useGlobalStateStore();
        globalUserState.loadingElements[ui_element_id] = true;
        return this.update(object_id, data).then((response) => {
            let answer = response.data;
            alertStore.success(answer.message);
        }).catch((error) => {
            alertStore.error(getResponseError(error));
        }).finally(() => {
            globalUserState.loadingElements[ui_element_id] = false;
        })
    }

    public handleCreate(ui_element_id, data) {
        const alertStore = useAlertStore();
        const globalUserState = useGlobalStateStore();
        globalUserState.setElementLoading(ui_element_id, true);
        return this.store(data).then((response) => {
            let answer = response.data;
            alertStore.success(answer.message);
        }).catch((error) => {
            alertStore.error(getResponseError(error));
        }).finally(() => {
            globalUserState.setElementLoading(ui_element_id, false);
        })
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
