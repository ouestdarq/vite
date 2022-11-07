<template>
	<div>
		<NavBar :scroll="nav.scroll" @setHeight="getHeight" />
		<Container :top="container.top" @setScroll="getScroll">
			<router-view />
		</Container>
	</div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import NavBar from '@/components/NavBar.vue';
import Container from '@/components/Container.vue';

const nav = reactive({
	scroll: reactive({
		y: ref(null),
	}),
});

const container = reactive({
	top: reactive({
		px: ref(null),
	}),
});

function getHeight(value) {
	container.top.px = value + 'px';
}

function getScroll(value) {
	nav.scroll.y = value;
}
</script>
<style lang="scss">
body {
	margin: 0;
}
</style>
