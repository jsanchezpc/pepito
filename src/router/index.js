import { createRouter, createWebHistory } from 'vue-router';

import HomeLayout from '@/layouts/HomeLayout'
import LoginLayout from '@/layouts/LoginLayout'
import AnswersLayout from '@/layouts/AnswersLayout'

const routes = [
  { path: '/', component: HomeLayout, props: true },
  { path: '/answers', component: AnswersLayout, props: true},
  { path: '/login', component: LoginLayout },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
