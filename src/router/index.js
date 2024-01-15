import { createRouter, createWebHistory } from 'vue-router';

import HomeLayout from '@/layouts/HomeLayout'
import LoginLayout from '@/layouts/LoginLayout'

const routes = [
  { path: '/', component: HomeLayout },
  { path: '/login', component: LoginLayout }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
