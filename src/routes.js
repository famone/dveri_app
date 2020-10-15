import VueRouter from 'vue-router'


export default new VueRouter({
	routes: [
	],
	mode: 'history',
	scrollBehavior (to, from, savedPosition) {
  		return { x: 0, y: 0 }
	}
})
