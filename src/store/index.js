import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import goods from './goods'

export default new Vuex.Store({
	modules: {
		goods
	}
}) 