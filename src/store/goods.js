
import axios from 'axios'

const goods = {
	namespaced: true,
	state: {
		user: null
  	},
	mutations: {
		SET_USER(state, user) {
      		state.user = user
    	}  	
	},
	actions: {
		login({ commit }, payload){
	      return new Promise(async (resolve, reject) => {
	        try {
	          const { data } = await axios.post(`https://door.webink.site/wp-json/jwt-auth/v1/token`, payload)
	          commit('SET_USER', data)
	          resolve(data)
	        }catch(e){
	          reject(e)
	        }
	      })
	    }
	},
	getters: {
  		
	}
}

export default goods


