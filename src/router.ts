import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { name: 'Welcome', path: '/', component: () => import('@/views/welcome.vue') },
  { name: 'Home', path: '/home', component: () => import('@/views/index.vue') },
  { name: 'Room', path: '/r/:id', props: true, component: () => import('@/views/room.vue') }
]

export const router = createRouter({ history: createWebHistory(), routes })