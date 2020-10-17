import Analitics from '../pages/Analitics';
import Orders from '../pages/Orders';
import Catalog from '../pages/Catalog/Catalog';
import Users from '../pages/Users';
import Home from '../pages/Home';
import Login from '../pages/Login';

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
]

export default routes;