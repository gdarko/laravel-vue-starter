import {createStore} from 'vuex'
import * as auth from "@/store/modules/Auth";

const store = createStore({
    strict: true,
    modules: {
        auth
    },
})

export default store;

