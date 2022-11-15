import BaseService from "@/services/BaseService";
import axios from "@/plugins/axios";

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
        return this.api.put(this.url + `/${id}`, data);
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
}
