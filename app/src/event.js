import { onMounted, onUnmounted } from 'vue';

export function useEvent(target, event, callback) {
	onMounted(() => target.addEventListener(event, callback));
	onUnmounted(() => target.removeEventListener(event, callback));
}
