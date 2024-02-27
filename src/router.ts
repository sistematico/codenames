import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { name: 'Home', path: '/', component: () => import('@/views/index.vue') }
]

export const router = createRouter({ history: createWebHashHistory(), routes })