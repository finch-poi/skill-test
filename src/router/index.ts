import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/policy-rules',
      name: 'policy-rules',
      component: () => import('@/views/PolicyRulesView.vue'),
    },
  ],
})

export default router
