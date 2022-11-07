<template>
	<div class="callback d-flex flex-column align-items-center justify-content-center">
		<Loading class="mb-2" />
	</div>
</template>

<script setup>
import { computed, inject, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '@/auth.js';
import { routes, clients } from '@/env.js';
import Loading from '@/components/Loading.vue';

const router = useRouter();
const axios = inject('axios');

const query = new URLSearchParams(window.location.search);
const code = query.get('code');
const state = query.get('state');
const matches = computed(() => {
	return auth.pending && auth.state === state;
});

onMounted(() => {
	if (!matches.value || !code) {
		auth.state = null;
		auth.verifier = null;
		auth.jwt = null;
		router.push('/');
	}

	axios
		.post(routes.token, {
			grant_type: 'authorization_code',
			client_id: clients.api.id,
			redirect_uri: routes.redirect,
			code: code,
			code_verifier: auth.verifier,
		})
		.then((res) => {
			console.log(res);
			auth.state = null;
			auth.verifier = null;
			auth.jwt = res.data;
			router.replace('/');
		})
		.catch((err) => {
			console.log('err: ', err);
		});
});
</script>

<style lang="scss">
.callback {
	position: relative;
	top: 40vh;
	color: #f07178;
}
</style>
