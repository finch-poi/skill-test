import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/policy-rules',
      name: 'policy-rules',
      component: () => import('@/views/PolicyRulesView.vue'),
    },
    {
      path: '/form-test-1',
      name: 'form-test-1',
      component: () => import('@/views/FormTest1View.vue'),
    },
    {
      path: '/document-test-1',
      name: 'document-test-1',
      component: () => import('@/views/DocumentTest1View.vue'),
    },
  ],
})

export default router
