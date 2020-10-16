import VueRouter from 'vue-router'
import Vue from 'vue'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import store from './store'

// export default new VueRouter({
// 	routes: [
// 		{
// 			path: '/',
// 			component: Home,
// 			meta: {
// 		      requiresAuth: true
// 		    }
// 		},
// 		{
// 			path: '/login',
// 			component: Login
// 		}
// 	],
// 	mode: 'history',
// 	scrollBehavior (to, from, savedPosition) {
//   		return { x: 0, y: 0 }
// 	}
// })


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
    // this route requires auth, check if user is logged in
    // if not, redirect to login page.
    if (!store.goods.state.user) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      // we have a state.user object but
      // we need to check if the token is still valid
      try{
        const { status } = await store.dispatch('goods/validate')
        // user is logged in with a valid token
        next()
      }catch(e){
        // the token is invalid so we will have the user login again
        // clear the token and user info
        store.commit('goods/DELETE_USER')
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    }
  } else {
    // this is not a protected route
    next()
  }
})

export default router

