const Analitics = () => import('../pages/Analitics');
const Orders = () => import('../pages/Orders');
const Catalog = () => import('../pages/Catalog/Catalog');
const Users = () => import('../pages/Users');
const Home = () => import('../pages/Home');
const Login = () => import('../pages/Login');
const Neworder = () => import('../pages/Neworder');
const Directories = () => import('../pages/Directories');
const Edit_order = () => import('../pages/Edit_order');
const Edit_model = () => import('../pages/Edit_model');
const NewDoor = () => import('../pages/NewDoor');
const Archive = () => import('../pages/Archive');
const InstallationSchedule = () => import('../pages/InstallationSchedule');


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
    component: Users,
  },
  {
    path: '/neworder',
    component: Neworder
  },
  {
    path: '/archive',
    component: Archive
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
    component: Edit_model,
    props: true
  },
  {
    path: '/new_door',
    component: NewDoor,
  },

  {
    path: '/installation-shedule',
    component: InstallationSchedule,
  },
]

export default routes;