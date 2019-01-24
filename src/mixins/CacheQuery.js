/**
 *  mixins: [require('@/mixins/CacheQuery').default],
 */
export default {
    created() {
        if (this.params instanceof Object) {
            const query = this.$route.query;
            const params = this.params;
            for (const key in params) {
                if (!Object.prototype.hasOwnProperty.call(params, key)) continue;
                if (typeof query[key] === 'undefined') continue;

                if (key.includes('page') || key.includes('_id') || Number.isFinite(params[key])) {
                    params[key] = Number(query[key]);
                    continue;
                }
                if (Array.isArray(params[key])) {
                    if (!Array.isArray(query[key])) {
                        if (Number.isNaN(Number(query[key]))) {
                            params[key] = [query[key]];
                        } else {
                            params[key] = [Number(query[key])];
                        }
                        continue;
                    }
                    params[key] = query[key].map((i) => {
                        if (!Number.isNaN(Number(i))) {
                            i = Number(i);
                        }
                        return i;
                    });
                    continue;
                }
                params[key] = query[key];
            }
            this.params = params;
        }
    },
    watch: {
        loading(val) {
            if (this.params instanceof Object) {
                if (!val) this.$router.replace({query: this.params});
            }
        },
        'params.page'() {
            window.scrollTo(0, 0);
        },
    },
};
