
import axios from 'axios'

const auth = {
    namespaced: true,
    state: {
        user: null,
        token: null
    },

    getters: {
        getUser(state) {
            return state.user
        },
        getAuthenticated(state) {
            return state.token && state.user
        }
    },

    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },

        SET_USER(state, user) {
            state.user = user;
        },
    },

    actions: {
        async AUTH_REQUEST({ commit, dispatch }, payload) {
            try {
                const { data } = await axios.post(`https://door.webink.site/wp-json/jwt-auth/v1/token`, payload)
                return dispatch('VALIDATE', data)
            }
            catch (err) {
                const snackbar = {
                    state: true,
                    content: err.message,
                    color: 'error',
                    timeout: 2000
                };

                dispatch("ui/UPDATE_SNACKBAR", snackbar, { root: true })
            }
        },

        async VALIDATE({ commit, state }, user) {
            if (user) {
                commit("SET_TOKEN", user.token);
                commit("SET_USER", user);
            }

            if (!state.user) {
                return
            }

            try {
                const response = await axios({
                    url: `https://door.webink.site/wp-json/jwt-auth/v1/token/validate`,
                    method: 'post',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                localStorage.setItem("user", JSON.stringify(user));
                commit("SET_TOKEN", user.token);
                commit("SET_USER", user);
            }
            catch (err) {
                localStorage.removeItem("user");
                commit("SET_TOKEN", null);
                commit("SET_USER", null);
            }
        },

        async SIGN_OUT({ commit }) {
            localStorage.removeItem("user");
            commit("SET_TOKEN", null);
            commit("SET_USER", null);
        }
    },
}

export default auth
