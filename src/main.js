import '@/scss/custom.scss';

import { computed, createApp, reactive } from 'vue';
import router from './router';
import vue from './App.vue';

import axios from 'axios';

const wss = new WebSocket('wss://wss.default.local/app');

wss.onopen = (e) => console.log(e);

wss.onmessage = (e) => {
	console.log(e, e.data);
};

import { auth } from './auth.js';

const app = createApp(vue);

axios.interceptors.request.use(
	(config) => {
		if (auth.check) {
			config.headers['Authorization'] = auth.header;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

app.provide('auth', auth);
app.provide('axios', axios);

app.use(router);

app.directive('scroll', {
	mounted: function (el, binding) {
		let f = function (e) {
			if (binding.value(e, el)) {
				window.removeEventListener('scroll', f);
			}
		};
		window.addEventListener('scroll', f);
	},
});

app.mount('#app');
