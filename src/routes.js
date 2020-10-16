import VueRouter from 'vue-router'
import Vue from 'vue'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import store from './store'


const routes = [
		{
			path: '/',
			component: Home,
			meta: {
		      requiresAuth: true
		    }
		},
		{
			path: '/login',
			component: Login
		}
	]

const router = new VueRouter({
  routes,
  mode: 'history',
	scrollBehavior (to, from, savedPosition) {
  		return { x: 0, y: 0 }
	}
})


router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
<<<<<<< HEAD
    // this route requires auth, check if user is logged in
    // if not, redirect to login page.
    if (!store.goods.state.user) {
=======

    if (!store.state.goods.user){
>>>>>>> 8a919d5bf58e4edf6b7fae4ce21d3589ad6f9d31
      next({
        path: '/login'
      })
    } else { 
      try{
        const { status } = await store.dispatch('goods/validate') 
        next()
      }catch(e){
        store.commit('goods/DELETE_USER')
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    }
  } else {
    next()
  }
})

export default router

