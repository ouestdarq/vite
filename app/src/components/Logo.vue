<template>
	<svg xmlns="http://www.w3.org/2000/svg" :viewBox="viewBox" :width="width">
		<mask id="smile">
			<rect width="32" height="32" fill="white" />
			<path fill="none" stroke-linecap="round" stoke-width="2" stroke="black" d="M 6 19 C 8 30,24 30, 26 19" />
		</mask>
		<circle fill="#000000" cx="16" cy="16" r="15" />
		<circle fill="#ffffff" mask="url(#smile)" cx="16" cy="16" r="14" />
	</svg>
</template>

<script setup>
const props = defineProps({
	width: {
		type: String,
		required: false,
		default: '50',
	},
	viewBox: {
		type: String,
		required: false,
		default: '0 0 32 32',
	},
});
</script>

<style lang="scss"></style>
