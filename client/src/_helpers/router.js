import { createRouter, createWebHistory } from 'vue-router';
import { authenticationService } from '../_services/authentication.service';
import LoginPage from '../components/LoginPage.vue';
import MainPage from '../components/MainPage.vue';
import PredictPage from '../components/PredictPage.vue';
import UsersTablePage from '../components/admin/UsersTablePage.vue';
import Role from './role';

// Meta with `authorize` param - mean that user must be logged in 
// in order to use certain page

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/menu',
    name: 'MainPage',
    component: MainPage,
    meta: { authorize: [] },
  },
  {
    path: '/predict',
    name: 'PredictPage',
    component: PredictPage,
    meta: { authorize: [] },
  },
  {
    path: '/users-table-page',
    name: 'UsersTablePage',
    component: UsersTablePage,
    meta: { authorize: [Role.Admin] },
  },
  // In other cases - redirect to enter page
  // In vue2.x its simple: path: '*'
  // In vue3.x you should write same as below
  // { path: '/:catchAll(.*)', name: 'NotFound', redirect: '/' },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // If user do not log in - redirect to login page
  const { authorize } = to.meta;
  const currentUser = authenticationService.currentUserValue;

  if (authorize){
    if (!currentUser){
      // User is not logint - redirect to enter page
      return next({ path: '/', query: {returnUrl: to.path} });
    }

    // Login by certain role
    if (authorize.length && !authorize.includes(currentUser.role)){
      // Role is not authorised - redirect to enter page
      return next({ path: '/' });
    }
  }

  next();

});


export default router;
