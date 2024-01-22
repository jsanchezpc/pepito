import { createRouter, createWebHistory } from 'vue-router';

import HomeLayout from '@/layouts/HomeLayout'
import LoginLayout from '@/layouts/LoginLayout'
import AnswersLayout from '@/layouts/AnswersLayout'
import CreatePollLayout from '@/layouts/CreatePollLayout.vue';

const routes = [
  { path: '/', component: HomeLayout, props: true },
  { path: '/new-poll', component: CreatePollLayout, props: true },
  { path: '/answers', component: AnswersLayout, props: true},
  { path: '/login', component: LoginLayout },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
