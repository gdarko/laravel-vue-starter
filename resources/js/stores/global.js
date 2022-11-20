import {defineStore} from 'pinia';

export const useGlobalStateStore = defineStore({
    id: 'global_state',
    state: () => ({
        loading: {},
    }),
    actions: {
        setLoading(element, isLoading) {
            if(!element || !element.length) {
                return;
            }
            this.loading[element] = isLoading;
        },
        isLoading(element) {
            return this.loading.hasOwnProperty(element) && this.loading[element];
        }

    }
});
