import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'software-list',
      component: () => import('@/views/SoftwareListView.vue'),
    },
    {
      path: '/detail/:name',
      name: 'software-detail',
      component: () => import('@/views/SoftwareDetailView.vue'),
    },
  ],
})

export default router
