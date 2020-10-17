
const ui = {
    namespaced: true,
    state: {
        snackbar: {
            state: false,
            content: '',
            color: '',
            timeout: null
        },
    },

    getters: {
        getSnackbar(state) {
            return state.snackbar
        },
    },

    mutations: {
        SET_SNACKBAR(state, payload) {
            state.snackbar = payload;
        },
    },

    actions: {
        UPDATE_SNACKBAR({ commit }, payload) {
            commit("SET_SNACKBAR", payload)
        }
    },
}

export default ui
