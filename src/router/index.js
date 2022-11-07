import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Callback from '@/views/Callback.vue';

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
	},
	{
		path: '/about',
		name: 'about',
		component: About,
	},
	{
		path: '/auth/callback',
		name: 'callback',
		component: Callback,
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
