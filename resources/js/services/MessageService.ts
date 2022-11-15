import ModelService from "@/services/ModelService";

export default class MessageService extends ModelService {
    constructor() {
        super();
        this.url = '/messages';
    }

}
