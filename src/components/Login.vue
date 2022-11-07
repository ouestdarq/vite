<template>
	<div class="btn btn-primary" @click="redirect" v-if="display">Login</div>
</template>

<script setup>
import { computed, inject } from 'vue';

import { auth } from '@/auth.js';
import { routes, clients } from '@/env.js';

import crypto from 'crypto-js';

const display = computed(() => {
	return auth.guest && !auth.pending;
});

function redirect(e) {
	e.preventDefault();
	if (auth.guest) {
		auth.state = strgen(40);
		auth.verifier = strgen(128);
		const challenge = encode(auth.verifier);
		const url = `${routes.authorize}?` + `client_id=${clients.api.id}&` + `redirect_uri=${routes.redirect}&` + `response_type=code&` + `scope=&` + `state=${auth.state}&` + `code_challenge=${challenge}&` + `code_challenge_method=S256`;
		// console.log(url);
		window.location = url;
	} else {
		console.log('Authenticated');
	}
}

function strgen(l = 128) {
	let str = '';
	let ascii;
	for (let i = 0; i < l; i++) {
		ascii = Math.floor(Math.random() * 25 + 97);
		str += String.fromCharCode(ascii);
	}
	return str;
}

function encode(str) {
	return crypto.SHA256(str).toString(crypto.enc.Base64).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
</script>

<style></style>
