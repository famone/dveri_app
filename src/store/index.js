import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import auth from './auth'
import ui from './ui'

export default new Vuex.Store({
	modules: {
		auth,
		ui
	}
})