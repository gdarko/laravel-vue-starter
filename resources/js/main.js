import {createApp} from 'vue'

import router from "@/router";
import store from "@/store";
import i18n from "@/plugins/i18n";
import App from "@/pages/App.vue";

const app = createApp(App)
app.use(router);
app.use(store);
app.use(i18n);
app.mount('#app');
