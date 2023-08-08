<template>
	<nav class="fade position-fixed w-100 py-2 d-flex align-items-center z-10" ref="bar">
		<div class="w-25 d-flex align-items-center justify-content-evenly">
			<Logo />
			<div class="btn btn-sm btn-outline-primary">Lang</div>
		</div>
		<div class="w-50 nav align-content-center">
			<router-link class="nav-link me-3 rounded" to="/">Home</router-link>
			<router-link class="nav-link me-3 rounded" to="/about">About</router-link>
		</div>
		<div class="w-25 d-flex align-content-center justify-content-around">
			<Login />
			<Logout />
		</div>
	</nav>
</template>

<script setup>
import { onMounted, onUpdated, reactive, ref, watchEffect } from 'vue';
import Logo from '@/components/Logo.vue';
import Login from '@/components/Login.vue';
import Logout from '@/components/Logout.vue';

const emit = defineEmits(['setHeight']);

const props = defineProps({
	scroll: {
		type: Object,
		required: false,
	},
});

const bar = ref(null);
const style = getComputedStyle(document.body);

onMounted(() => {
	const { nav } = reactive({
		nav: bar,
	});
	const resize = new ResizeObserver(() => emit('setHeight', nav.clientHeight));
	resize.observe(nav);
});

watchEffect(() => {
	const { nav, scroll } = reactive({
		nav: bar,
		scroll: props.scroll,
	});
	if (nav) {
		if (scroll.y) {
			nav.style.backgroundColor = style.getPropertyValue('--bs-black');
		} else {
			nav.style.backgroundColor = 'unset';
		}
	}
});
</script>

<style lang="scss">
.fade {
	transition: background 1000ms;
}

.nav-link {
	color: var(--bs-gray-200);
}

.nav-link:hover {
	color: var(--bs-gray-600);
}

.nav-link.router-link-exact-active,
.nav-link.router-link-exact-active:hover {
	color: var(--bs-gray-900);
	background-color: var(--bs-primary);
}
</style>
