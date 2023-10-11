import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useUserStore } from '../stores/user';

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  userStore.loadingSession = true;
  const user = await userStore.currentUser();
  if (user) {
    next();
  } else {
    next('/login');
  }
  userStore.loadingSession = false;
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: requireAuth,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginSection.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterSection.vue'),
    },
  ],
});

export default router;
