import axios from 'axios'

axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-Locale'] = localStorage.hasOwnProperty('locale') ? localStorage.locale : 'en';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios;
