<template>
	<div class="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light bg-opacity-10 rounded">
		<HelloWorld :msg="msg" />
		<button class="btn btn-primary" @click="change">Change message</button>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
import Loading from '@/components/Loading.vue';

const msg = ref('Welcome to your Vue js App');
function change() {
	msg.value = 'now this has changed';
}
</script>
<style lang="scss"></style>
