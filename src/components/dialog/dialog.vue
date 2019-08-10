<template>
    <el-dialog
        title="弹窗"
        :visible.sync="visible"
        :modal-append-to-body="false"
        width="60%">

        <!-- style="height: 500px;" 可去除后做自适应 -->
        <el-form
            ref="form"
            :model="form"
            :rules="rules"
            :status-icon="true"
            label-width="80px"
            label-suffix=" : "
            v-loading="loading"
            style="height: 500px;"
            label-position="right">
        </el-form>

        <!-- button -->
        <span slot="footer" class="dialog-footer flex justify-end">
            <el-button @click="close">返回</el-button>
            <el-button type="primary" @click="onSubmit">保存</el-button>
        </span>

    </el-dialog>
</template>

<script>

export default {
    components: {},
    data() {
        return {
            visible: false,
            loading: false,
            form: {},
            rules: {},
        };
    },
    watch: {
        visible(val) {
            if (!val) {
                this.resetForm();
            }
        },
    },
    computed: {},
    methods: {
        open() {
            this.visible = true;
        },
        close() {
            this.visible = false;
        },
        postData() {
        },
        onSubmit() {
            this.$refs.form.validate((valid) => {
                if (!valid) return $ele.$message('请输入完整信息！');
                this.postData();
            });
        },
        resetForm() {
            this.$refs.form.resetFields();
        },
    },
    created() {
    },
};
</script>
