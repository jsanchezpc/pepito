import { createRouter, createWebHistory } from 'vue-router';

import HomeLayout from '@/layouts/HomeLayout'
import LoginLayout from '@/layouts/LoginLayout'
import AnswersLayout from '@/layouts/AnswersLayout'

const routes = [
  { path: '/', component: HomeLayout },
  { path: '/login', component: LoginLayout },
  { path: '/answers', component: AnswersLayout}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
