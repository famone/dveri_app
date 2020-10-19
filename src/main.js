import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueTheMask from 'vue-the-mask'
import Vuelidate from 'vuelidate'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)




import 'swiper/css/swiper.css'

Vue.use(VueRouter)
Vue.use(VueTheMask)
Vue.use(Vuelidate)
Vue.use(require('vue-cookies'))
import ru from 'vuetify/es5/locale/ru'

const user = JSON.parse(localStorage.getItem("user"))
store.dispatch("auth/VALIDATE", user);

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  vuetify: new Vuetify({
    lang: {
      locales: { ru },
      current: 'ru'
    }
  }),
})