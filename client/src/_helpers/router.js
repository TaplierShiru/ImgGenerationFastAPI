import { createRouter, createWebHistory } from 'vue-router';
import { authenticationService } from '../_services/authentication.service';
import LoginPage from '../components/LoginPage.vue';
import MainPage from '../components/MainPage.vue';
import HelpPage from '../components/HelpPage.vue';
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
    path: '/help',
    name: 'HelpPage',
    component: HelpPage,
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

router.beforeEach((to) => {
  // If user do not log in - redirect to login page
  const { authorize } = to.meta;
  const currentUser = authenticationService.currentUserValue;

  if (authorize){
    if (!currentUser){
      // User is not logint - redirect to enter page
      return { path: '/', query: { returnUrl: to.path}};
    }

    // Login by certain role
    if (authorize.length && !authorize.includes(currentUser.role)){
      // Role is not authorised - redirect to enter page
      return { path: '/' };
    }
  }
  // If user is logIn before and go to enter page - redirect him to menu page
  // Dodge loop redirection via checking to.path, 
  // i.e. can be case where to.path == '/menu' and user again redirect to '/menu'
  // which will cause infinity loop, so dodge that using the last comparison
  if (currentUser && to.path == '/'){
    return { path: '/menu'};
  }

});


export default router;
