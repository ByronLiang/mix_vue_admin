<template>
    <el-cascader :options="options" v-model="val" v-bind="$attrs" clearable :props="props"/>
</template>

<script>
import {Cascader} from 'element-ui';
import {getDistrict} from '@/api/Cache.js';

export default {
    inheritAttrs: false,
    components: {
        ElCascader: Cascader,
    },
    props: {
        value: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    data() {
        return {
            items: [],
            options: [],
            props: {
                value: 'id',
                label: 'full_name',
            },
        };
    },
    computed: {
        val: {
            set(val) {
                this.$emit('input', val);
            },
            get() {
                if (this.value.length === 0) {
                    return [];
                }
                return this.value.map((i) => Math.floor(i));
            },
        },
    },
    methods: {
    },
    async created() {
        this.options = await getDistrict('cascader');
    },
};
</script>

<style scoped>

</style>
