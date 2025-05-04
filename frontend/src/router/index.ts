import { createRouter, createWebHistory } from 'vue-router'
import GuestLayout from '@/layouts/GuestLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      meta: { layout: GuestLayout },
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      meta: { layout: GuestLayout },
      component: () => import('@/views/Register.vue'),
    },
    {
      path: '/',
      name: 'Home',
      meta: { layout: AuthLayout },
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/profile',
      name: 'Profile',
      meta: { layout: AuthLayout },
      component: () => import('@/views/Profile.vue'),
    },
    {
      path: '/history',
      name: 'History',
      meta: { layout: AuthLayout },
      component: () => import('@/views/History.vue'),
    },
  ],
})

// Auth guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  // Якщо маршрут вимагає авторизації і токена немає, перенаправляємо на сторінку логіну
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    // Якщо користувач вже авторизований, перенаправляємо його на профіль чи головну
    if (to.path === '/login' || to.path === '/register') {
      if (token) {
        next('/profile'); // Якщо користувач вже має токен, перенаправляємо на сторінку профілю
      } else {
        next(); // Якщо ні, дозволяємо доступ до сторінок логіну/реєстрації
      }
    } else {
      next(); // Інші маршрути не блокуються
    }
  }
});

export default router
