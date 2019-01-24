/**
 * https://github.com/feimosi/baguetteBox.js/#usage
 * Simple and easy to use lightbox script written in pure JavaScript
 */

import load from '../helpers/load';

/**
 * Vue.directive('baguettebox', require('common/directives/baguettebox').default);
 * v-baguettebox="options"
 *
 * emmet demo:
 * div[v-baguettebox].flex>a[href=https://picsum.photos/1000?random=$].w-1/6*5>img[src=https://picsum.photos/200?random=$]
 */

export default {
    async bind(el, {value}) {
        if (!value) value = {};

        // value.filter = /.*/i; // default: /.+\.(gif|jpe?g|png|webp)/i

        await load([
            'https://cdn.jsdelivr.net/npm/baguettebox.js@1.11.0/dist/baguetteBox.min.js',
            'https://cdn.jsdelivr.net/npm/baguettebox.js@1.11.0/dist/baguetteBox.min.css',
        ], 'baguettebox');
        if (window.baguetteBox) {
            const random = Math.random()
                .toString(36)
                .substr(2);
            const key = `baguetteBox-${random}`;
            el.classList.add(key);
            window.baguetteBox.run(`.${key}`, value);
        }
    },
};
