import Analitics from '../pages/Analitics';
import Orders from '../pages/Orders';
import Catalog from '../pages/Catalog/Catalog';
import Users from '../pages/Users';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Neworder from '../pages/Neworder';
import Directories from '../pages/Directories'
import Edit_order from '../pages/Edit_order.vue'
import Edit_model from '../pages/Edit_model.vue'

const routes = [
  {
    path: '/',
    component: Home,
    // meta: {
    //   requiresAuth: true
    // }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/analitics',
    component: Analitics
  },
  {
    path: '/orders',
    component: Orders
  },
  {
    path: '/catalog',
    component: Catalog
  },
  {
    path: '/users',
    component: Users
  },
  {
    path: '/neworder',
    component: Neworder
  },
  {
    path: '/directories',
    component: Directories
  },
  {
    path: '/edit_order/:id',
    component: Edit_order
  },
  {
    path: '/edit_model/:id',
    component: Edit_model
  }
]

export default routes;