import {computed} from "vue";
import {useStore} from 'vuex';

export function useAuth() {
    const store = useStore();
    const user = computed(() => store.getters['auth/authUser']);
    return {
        user
    }
}
