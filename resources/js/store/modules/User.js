import {getError} from "@/utils/helpers";
import UserService from "@/services/UserService";

export const namespaced = true;

function setPaginatedUsers(commit, response) {
    commit("SET_USERS", response.data.data);
    commit("SET_META", response.data.meta);
    commit("SET_LINKS", response.data.links);
    commit("SET_LOADING", false);
}

export const state = {
    users: [],
    meta: null,
    links: null,
    loading: false,
    error: null,
};

export const mutations = {
    SET_USERS(state, users) {
        state.users = users;
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
    getUsers({commit}, page) {
        commit("SET_LOADING", true);
        UserService.getUsers(page)
            .then((response) => {
                setPaginatedUsers(commit, response);
            })
            .catch((error) => {
                commit("SET_LOADING", false);
                commit("SET_ERROR", getError(error));
            });
    },
    paginateUsers({commit}, link) {
        commit("SET_LOADING", true);
        UserService.paginateUsers(link)
            .then((response) => {
                setPaginatedUsers(commit, response);
            })
            .catch((error) => {
                commit("SET_LOADING", false);
                commit("SET_ERROR", getError(error));
            });
    },
};

export const getters = {
    users: (state) => {
        return state.users;
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
