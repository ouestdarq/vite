import { transform } from '@vue/compiler-core';

export default (userOptions = {}) => {
    return {
        name: 'vite-plugin-smallstep',
        enforce: 'pre',
        transform(raw, id) {},
    };
};
