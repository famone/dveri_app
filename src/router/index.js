import VueRouter from 'vue-router'
import routes from './routes';

import store from '../store'

const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});

// router.beforeEach((to, from, next) => {
//     // if (to.matched.some(record => record.meta.requiresAuth)) {

//     if (!store.getters["auth/getAuthenticated"]) {
//         if (to.path !== '/login') {
//             next({ path: '/login' })
//         }
//     } else {
//         next();
//         // try {
//         //     // const { status } = await store.dispatch('goods/validate');
//         //     // console.log('1');
//         //     next()
//         // } catch (e) {
//         //     console.log('2');
//         //     store.commit('goods/DELETE_USER')
//         //     next({ path: '/login' })
//         // }
//     }
//     // } else {
//     //     next()
//     // }
// })

export default router
