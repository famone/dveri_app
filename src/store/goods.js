
import axios from 'axios'

const goods = {
	namespaced: true,
	state: {
		user: null
  	},
	mutations: {
		SET_USER(state, user) {
      		state.user = user
      		console.log(user)
    	},
    	DELETE_USER(state) {
      		state.user = null
    	}
	},
	actions: {
		login({ commit }, payload){
	      return new Promise(async (resolve, reject) => {
	        try {
	          const { data } = await axios.post(`https://door.webink.site/wp-json/jwt-auth/v1/token`, payload)
	          .then(data => {
	          	commit('SET_USER', data)
	          	resolve(data)
	          })
	          
	        }catch(e){
	        	
	          reject(e.data);
	        }
	      })
	      



	    },
	    validate({ state }) {
      return axios({
        url: `https://door.webink.site/wp-json/jwt-auth/v1/token/validate`, 
        method: 'post',
        headers: {
          'Authorization': `Bearer ${state.user.token}`
        }
      })
    }
	},
	getters: {
  		
	}
}

export default goods


