<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<div class="box"></div>
	</div>
</template>
<script setup>
import { inject, onMounted } from 'vue';
import { routes } from '@/env.js';

const props = defineProps({
	msg: {
		type: String,
		required: true,
	},
});
const axios = inject('axios');
axios
	.get(`https://${routes.api}/test`)
	.then((res) => {
		console.log(res);
	})
	.catch((err) => {
		console.log(err);
	});
</script>
<style lang="scss"></style>
