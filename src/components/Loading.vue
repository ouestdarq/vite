<template>
	<div>
		<svg
			ref="loading"
			xmlns="http://www.w3.org/2000/svg"
			width="50"
			viewBox="0 0 32 32"
		></svg>
	</div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';

const loading = ref(null);
const pi = Math.PI;
const r = 14;
const c = 2 * pi * r;
const n = 180;

onMounted(() => {
	const ns = 'http://www.w3.org/2000/svg';
	const { svg, defs, gradient, colors, circle } = reactive({
		svg: loading,
		defs: document.createElementNS(ns, 'defs'),
		gradient: document.createElementNS(ns, 'linearGradient'),
		colors: {
			start: document.createElementNS(ns, 'stop'),
			end: document.createElementNS(ns, 'stop'),
		},
		circle: ref(document.createElementNS(ns, 'circle')),
	});
	colors.start.setAttributeNS(null, 'offset', '0%');
	colors.start.setAttributeNS(null, 'stop-color', '#efadce');

	colors.end.setAttributeNS(null, 'offset', '100%');
	colors.end.setAttributeNS(null, 'stop-color', '#a6e9d5');

	gradient.setAttribute('id', 'loading-gradient');

	gradient.appendChild(colors.start);
	gradient.appendChild(colors.end);

	defs.appendChild(gradient);

	circle.setAttributeNS(null, 'cx', '16');
	circle.setAttributeNS(null, 'cy', '16');
	circle.setAttributeNS(null, 'r', r);
	circle.setAttributeNS(null, 'fill', 'none');
	circle.setAttributeNS(null, 'stroke', 'url(#loading-gradient)');
	circle.setAttributeNS(null, 'stroke-width', '2');
	circle.setAttributeNS(null, 'stroke-linecap', 'round');
	circle.setAttributeNS(
		null,
		'stroke-dasharray',
		`${c / n} ${((n - 1) * c) / n}`
	);
	svg.appendChild(defs);
	svg.appendChild(circle);
	loader(circle);
});

function loader(target, t = 0, dt = 0.01) {
	setTimeout(() => {
		let sin = n * Math.pow(Math.sin(t.toFixed(2)), 2);
		let tri = (t * 100).toFixed(0) % (2 * n);
		t += dt;
		target.setAttributeNS(
			null,
			'stroke-dasharray',
			`${(sin * c) / n} ${((n - sin) * c) / n}`
		);
		target.setAttributeNS(null, 'transform', `rotate(${5 * tri} 16 16)`);
		loader(target, t);
	}, 10);
}
</script>

<style></style>
