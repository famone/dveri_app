
import axios from 'axios'

const goods = {
	namespaced: true,
	state: {
		user: null
	},

	getters: {
		GET_USER(state) {
			if (sessionStorage.getItem('user')) {
				const user = JSON.parse(sessionStorage.getItem('user'));
				return user;
			}
			else {
				return state.user;
			}
		}
	},

	mutations: {
		SET_USER(state, user) {
			state.user = user;
			sessionStorage.setItem('user', JSON.stringify(user));
		},
		DELETE_USER(state) {
			state.user = null
		}
	},

	actions: {
		async login({ commit }, payload) {
			try {
				const { data } = await axios.post(`https://door.webink.site/wp-json/jwt-auth/v1/token`, payload)
				commit('SET_USER', data)
			}

			catch (e) {
				reject(e.response);
			}

		},

		async validate({ getters }) {


			// let user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).data.token : state.user.data.token

			const user = getters.GET_USER;

			return await axios({
				url: `https://door.webink.site/wp-json/jwt-auth/v1/token/validate`,
				method: 'post',
				headers: {
					'Authorization': `Bearer ${user.token}`
				}
			})
		}
	},
}

export default goods


