import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (
    to.meta.requiresAuth &&
    !useAuthStore().user &&
    !useAuthStore().token &&
    !useAuthStore().isAuthenticated
  ) {
    next('/')
  } else if (to.name === 'home' && useAuthStore().isAuthenticated) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
