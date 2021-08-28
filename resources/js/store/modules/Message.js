import {getError} from "@/utils/helpers";
import MessageService from "@/services/MessageService";

export const namespaced = true;

function setPaginatedMessages(commit, response) {
    commit("SET_MESSAGES", response.data.data);
    commit("SET_META", response.data.meta);
    commit("SET_LINKS", response.data.links);
    commit("SET_LOADING", false);
}

export const state = {
    messages: [],
    meta: null,
    links: null,
    loading: false,
    error: null,
};

export const mutations = {
    SET_MESSAGES(state, messages) {
        state.messages = messages;
    },
    SET_META(state, meta) {
        state.meta = meta;
    },
    SET_LINKS(state, links) {
        state.links = links;
    },
    SET_LOADING(state, loading) {
        state.loading = loading;
    },
    SET_ERROR(state, error) {
        state.error = error;
    },
};

export const actions = {
    getMessages({commit}, page) {
        commit("SET_LOADING", true);
        MessageService.getMessages(page)
            .then((response) => {
                setPaginatedMessages(commit, response);
            })
            .catch((error) => {
                commit("SET_LOADING", false);
                commit("SET_ERROR", getError(error));
            });
    },
    postMessage({commit}, payload) {
        return MessageService.postMessage(payload).then((response) => {
            setPaginatedMessages(commit, response);
        });
    },
    paginateMessages({commit}, link) {
        commit("SET_LOADING", true);
        MessageService.paginateMessages(link)
            .then((response) => {
                setPaginatedMessages(commit, response);
            })
            .catch((error) => {
                commit("SET_LOADING", false);
                commit("SET_ERROR", getError(error));
            });
    },
};

export const getters = {
    messages: (state) => {
        return state.messages;
    },
    meta: (state) => {
        return state.meta;
    },
    links: (state) => {
        return state.links;
    },
    loading: (state) => {
        return state.loading;
    },
    error: (state) => {
        return state.error;
    },
};
