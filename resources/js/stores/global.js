import {defineStore} from 'pinia';

export const useGlobalStateStore = defineStore({
    id: 'global_state',
    state: () => {
        return {
            loadingElements: {},
            isUILoading: false,
        }
    },
    actions: {
        setUILoading(isLoading) {
            this.isUILoading = isLoading;
        },
        isUILoading() {
            return this.isUILoading;
        },
        setElementLoading(element, isLoading) {
            if (!element || !element.length) {
                return;
            }
            this.loadingElements[element] = isLoading;
            this.setUILoading(isLoading);
        }
    }
});
