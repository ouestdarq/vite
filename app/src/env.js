import { computed, reactive } from 'vue';

const {
    VITE_BASE_URL,
    VITE_BACKEND_URL,
    VITE_WS_URL,
    VITE_OAUTH_CLIENT,
    VITE_TEST_OAUTH_CLIENT,
} = import.meta.env;

export const { routes, clients } = reactive({
    routes: {
        backend: computed((url = VITE_BACKEND_URL) =>
            url ? url : 'http://localhost'
        ),
        ws: computed(() => VITE_WS_URL),
        api: computed(() => routes.backend + '/api'),
        authorize: computed(() => routes.backend + '/oauth/authorize'),
        token: computed(() => routes.backend + '/oauth/token'),
        redirect: computed(() => window.location.origin + '/auth/callback'),
    },
    clients: {
        api: {
            id: computed(() =>
                window.location.origin === VITE_BASE_URL
                    ? VITE_TEST_OAUTH_CLIENT
                    : VITE_OAUTH_CLIENT
            ),
        },
    },
});
