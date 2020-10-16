
import axios from 'axios'

const auth = {
    namespaced: true,
    state: {
        user: null,
        token: localStorage.getItem('user-token') || '',
        status: "",
        authenticated: false
    },

    getters: {
        getUser: state => state.user,
        getAuthenticated: state => state.authenticated,
        authStatus: state => state.status,
    },

    mutations: {
        AUTH_LOADING: (state) => {
            state.status = 'loading'
        },
        AUTH_SUCCESS: (state, token) => {
            state.status = 'success'
            state.token = token
        },
        AUTH_ERROR: (state) => {
            state.status = 'error'
        },

        SET_USER(state, user) {
            state.user = user;
        },

        SET_AUTHENTICATED(state, payload) {
            state.authenticated = payload;
        }
    },

    actions: {
        async AUTH_REQUEST({ commit, dispatch }, payload) {
            commit("AUTH_LOADING");
            try {

                if (sessionStorage.getItem("token")) {
                    const token = JSON.parse(sessionStorage.getItem("token"));

                    commit("AUTH_SUCCESS", token);

                    dispatch("VALIDATE");
                }

                else {
                    const { data } = await axios.post(`https://door.webink.site/wp-json/jwt-auth/v1/token`, payload);


                    sessionStorage.setItem('user-token', JSON.stringify(data.token));

                    commit("AUTH_SUCCESS", data.token);
                    commit("SET_USER", data);
                    dispatch('VALIDATE')
                }
            }

            catch (err) {
                commit("AUTH_ERROR");
            }
        },

        async VALIDATE({ commit, getters }) {
            const requestState = null;

            const { status } = await axios({
                url: `https://door.webink.site/wp-json/jwt-auth/v1/token/validate`,
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${getters.token}`
                }
            });

            console.log(status);

            status === 200 ? requestState = true : requestState = false

            commit("SET_AUTHENTICATED", requestState)
        }
    },
}

export default auth
