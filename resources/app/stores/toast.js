import {defineStore} from 'pinia';

let toastId = 0;

export const useToastStore = defineStore('toast', {
    state: () => ({
        toasts: [],
    }),
    actions: {
        success(message) {
            this._add(message, 'success');
        },
        error(message) {
            this._add(message, 'error');
        },
        info(message) {
            this._add(message, 'info');
        },
        warning(message) {
            this._add(message, 'warning');
        },
        _add(message, type, duration = 5000) {
            // Flatten validation error objects into strings
            let text = message;
            if (Array.isArray(message)) {
                text = message.join(', ');
            } else if (typeof message === 'object' && message !== null) {
                text = Object.values(message).flat().join(', ');
            }
            const id = ++toastId;
            this.toasts.push({id, text, type});
            setTimeout(() => this.remove(id), duration);
        },
        remove(id) {
            this.toasts = this.toasts.filter(t => t.id !== id);
        },
    }
});
