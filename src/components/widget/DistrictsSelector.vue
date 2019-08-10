<template>
    <el-select v-model="val" placeholder="请选择">
      <el-option v-for="option in options" :key="option.id" :label="option.full_name" :value="option.id"/>
    </el-select>
</template>

<script>
import { Select, Option } from 'element-ui';
import {getDistrict} from '@/api/Cache.js';

export default {
    components: {
        [Select.name]: Select,
        [Option.name]: Option,
    },
    props: {
        value: {
            type: Number,
            default() {
                return 0;
            },
        },
    },
    data() {
        return {
            options: [],
        };
    },
    computed: {
        val: {
            set(val) {
                this.$emit('input', val);
            },
            get() {
                if (this.value === null) {
                    return null;
                }
                return this.value;
            },
        },
    },
    methods: {
    },
    async created() {
        this.options = await getDistrict();
    },
};
</script>
