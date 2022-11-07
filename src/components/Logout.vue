<template>
	<div class="btn btn-primary" @click="redirect" v-if="auth.check">Logout</div>
</template>

<script setup>
import { inject } from 'vue';
import { auth } from '@/auth.js';
import { routes } from '@/env.js';

const axios = inject('axios');

function redirect() {
	axios
		.post(routes.logout)
		.then((res) => {
			console.log(res);
			auth.jwt = null;
		})
		.catch((err) => {
			console.log(err);
		});
}
</script>

<style></style>
