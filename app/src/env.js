import { computed, reactive } from 'vue';

const env = import.meta.env;

export const { routes, clients } = reactive({
    routes: {
        backend: computed((url = env.VITE_BACKURL) =>
            url ? url : 'http://localhost'
        ),
        websock: computed(() => env.VITE_SOCKURL),
        api: computed(() => routes.backend + '/api'),
        authorize: computed(() => routes.backend + '/oauth/authorize'),
        token: computed(() => routes.backend + '/oauth/token'),
        redirect: computed(() => window.location.origin + '/auth/callback'),
    },
    clients: {
        api: {
            id: computed(() =>
                window.location.origin === env.VITE_BASEURL
                    ? env.VITE_TEST_OAUTH_CLIENT
                    : env.VITE_OAUTH_CLIENT
            ),
        },
    },
});
