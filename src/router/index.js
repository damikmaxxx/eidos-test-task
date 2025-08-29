import { createRouter, createWebHistory } from 'vue-router'
import Sessions from '../views/Sessions.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/sessions',
      component: () => import('../views/Sessions.vue'),
    },
    {
      path: '/sessions',
      name: 'Sessions',
      component: () => import('../views/Sessions.vue'),
    },
  ],
})

export default router
