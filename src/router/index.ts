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
    {
      path: '/policy-rules',
      name: 'policy-rules',
      component: () => import('@/views/PolicyRulesView.vue'),
    },
    {
      path: '/test-form1',
      name: 'test-form1',
      component: () => import('@/views/TestForm1View.vue'),
    },
  ],
})

export default router
