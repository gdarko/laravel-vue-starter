import {createStore} from 'vuex'
import * as auth from "@/store/modules/Auth";
import * as user from "@/store/modules/User";
import * as message from "@/store/modules/Message";

const store = createStore({
    strict: true,
    modules: {
        auth,
        user,
        message,
    },
})

export default store;

