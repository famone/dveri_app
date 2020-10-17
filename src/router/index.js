import VueRouter from 'vue-router'
import routes from './routes';

import store from '../store'
import { or } from 'vuelidate/lib/validators';

const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});

router.beforeEach((to, from, next) => {
    if (store.getters["auth/getAuthenticated"]) {
        next()
    }
    else {
        if (to.path != "/login") {
            next("/login")
        }
        else {
            next()
        }
    }
})

export default router
