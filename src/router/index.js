import { createRouter, createWebHistory } from 'vue-router';

import HomeLayout from '@/layouts/HomeLayout'
import LoginLayout from '@/layouts/LoginLayout'
import MetricsLayout from '@/layouts/MetricsLayout'
import CreatePollLayout from '@/layouts/CreatePollLayout.vue';

const routes = [
  { path: '/', component: HomeLayout, props: true },
  { path: '/new-poll', component: CreatePollLayout, props: true },
  { path: '/metrics', component: MetricsLayout, props: true},
  { path: '/login', component: LoginLayout, props: false },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
  