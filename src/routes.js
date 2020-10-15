import VueRouter from 'vue-router'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'

export default new VueRouter({
	routes: [
		{
			path: '/',
			component: Home
		},
		{
			path: '/login',
			component: Login
		}
	],
	mode: 'history',
	scrollBehavior (to, from, savedPosition) {
  		return { x: 0, y: 0 }
	}
})
