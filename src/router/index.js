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
    let tokenValid = null;

    store.dispatch("auth/VALIDATE", store.getters["auth/getUser"]).then((response) => {
        if (response) {
            tokenValid = response.data.code === "jwt_auth_valid_token" ? true : false;
        }
        else tokenValid = false;

        console.log(tokenValid);

        if (tokenValid) {
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
    });
})

export default router
