import { computed, reactive } from 'vue';

const { VITE_BACKEND_URL, VITE_WSS_URL, VITE_BASE_URL, VITE_TEST_OAUTH_CLIENT, VITE_OAUTH_CLIENT } = import.meta.env;

export const { routes, clients } = reactive({
	routes: {
		backend: computed((url = VITE_BACKEND_URL) => (url ? url : 'http://localhost')),
		wss: computed(() => VITE_WSS_URL),
		api: computed(() => routes.backend + '/api'),
		authorize: computed(() => routes.backend + '/oauth/authorize'),
		token: computed(() => routes.backend + '/oauth/token'),
		redirect: computed(() => window.location.origin + '/auth/callback'),
	},
	clients: {
		api: {
			id: computed(() => (window.location.origin === VITE_BASE_URL ? VITE_TEST_OAUTH_CLIENT : VITE_OAUTH_CLIENT)),
		},
	},
});
