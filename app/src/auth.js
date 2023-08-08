import { computed, reactive } from 'vue';

export const auth = reactive({
	set jwt(value) {
		localStorage.setItem('jwt', JSON.stringify(value));
	},
	get jwt() {
		return JSON.parse(localStorage.getItem('jwt'));
	},
	set state(value) {
		localStorage.setItem('state', JSON.stringify(value));
	},
	get state() {
		return JSON.parse(localStorage.getItem('state'));
	},
	set verifier(value) {
		localStorage.setItem('verifier', JSON.stringify(value));
	},
	get verifier() {
		return JSON.parse(localStorage.getItem('verifier'));
	},
	header: computed(() => {
		return auth.check ? `${auth.jwt.token_type} ${auth.jwt.access_token}` : null;
	}),
	check: computed(() => {
		return !!auth.jwt;
	}),
	pending: computed(() => {
		return !!auth.state && !!auth.verifier;
	}),
	guest: computed(() => {
		return !auth.check;
	}),
});
