<template>
    <el-card>

        <div class="text-xl">新增/编辑活动</div>

        <el-form
            class="mt-6"
            label-width="100px"
            label-position="left"
            ref="form"
            :model="form"
            :rules="rules"
            v-loading="loading"
            :status-icon="true"
            label-suffix=":">

            <el-form-item label="标题" prop="title">
                <el-input class="w-1/3" v-model="form.title"></el-input>
            </el-form-item>

            <!-- <el-form-item label="活动类型" prop="title">
                <el-select v-model="form.type" placeholder="请选择活动" class="w-1/6">
                    <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item> -->

            <el-form-item label="是否付费" prop="charge">
                <el-switch v-model="form.charge"></el-switch>
            </el-form-item>

            <el-form-item label="活动类型" prop="type">
                <el-radio
                    v-for="(item, index) in options"
                    v-model="form.type"
                    :label="item.id"
                    :key="index">
                    {{ item.name }}
                </el-radio>
            </el-form-item>

            <el-form-item label="活动封面" prop="cover">
                <file-upload @input="addImg(arguments)" class="file-upload-img">
                    <img v-if="!form.cover" src="../../assets/images/upload-img.png" alt="">
                    <div v-else class="bg-center bg-cover" :style="`background-image: url(${form.cover})`"></div>
                </file-upload>
            </el-form-item>

            <el-form-item label="标签" prop="tags">

                <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange">
                    全选
                </el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="form.tags" @change="handleCheckedCitiesChange">
                    <el-checkbox
                        v-for="(item, index) in tagsOptions"
                        :label="item.id"
                        :key="index">
                        {{ item.name }}
                    </el-checkbox>
                </el-checkbox-group>

            </el-form-item>

            <el-form-item label="活动时间" prop="date">
                <el-date-picker
                    style="width: 33.33%;"
                    v-model="form.date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="timestamp">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="活动描述" prop="description">
                <quill-editor
                    v-model="form.description"
                    @handleContent="handleContent"
                    ref="quill">
                </quill-editor>
            </el-form-item>

            <div class="flex justify-end">
                <el-button @click="$router.back()">取消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </div>

        </el-form>


    </el-card>
</template>

<script>
import FileUpload from '@/components/base/FileUpload.vue';
import QuillEditor from '@/components/base/QuillEditor.vue';

export default {
    components: {
        FileUpload,
        QuillEditor,
    },
    data() {
        return {
            form: {
                type: 1,
                title: '',
                cover: '',
                media_type: 1,
                media_urls: [],
                tags: [],
                description: '',
                start_at: new Date(),
                end_at: new Date(),
                date: null,
                charge: false,
            },
            // 规则
            rules: {
                title: [{
                    required: true,
                    message: '标题不能为空',
                    trigger: 'blur',
                }],
                charge: [{
                    required: true,
                    message: '请选择是否付费',
                    trigger: 'change',
                }],
                type: [{
                    required: true,
                    message: '请选择活动类型',
                    trigger: 'change',
                }],
                date: [{
                    // type: 'date',
                    required: true,
                    message: '请选择日期',
                    trigger: ['change', 'blur'],
                }],
                cover: [{
                    required: true,
                    message: '请上传活动封面',
                    trigger: 'change',
                }],
                tags: [{
                    type: 'array',
                    required: true,
                    message: '至少选择一个标签',
                    trigger: ['blur', 'change'],
                }],
                description: [{
                    required: true,
                    message: '请输入活动描述',
                    trigger: ['blur', 'charge'],
                }],
            },
            options: [
                {
                    id: 1,
                    name: '明活动',
                }, {
                    id: 2,
                    name: '暗活动',
                },
            ],
            // checkbox
            tagsOptions: [
                {
                    id: 3,
                    name: '标签一',
                }, {
                    id: 4,
                    name: '标签二',
                }, {
                    id: 5,
                    name: '标签三',
                },
            ],
            isIndeterminate: false,
            checkAll: false,

            // table-loading标志
            loading: false,

        };
    },
    methods: {
        // 上传图片
        // eslint-disable-next-line no-unused-vars
        addImg(args) {
        },
        // 全选
        handleCheckAllChange(val) {
            this.form.tags = val ? this.tagsOptions.map(el => el.id) : [];
            this.isIndeterminate = false;
        },
        // 单选
        handleCheckedCitiesChange(val) {
            const checkedCount = val.length;
            this.checkAll = checkedCount === this.tagsOptions.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.tagsOptions.length;
        },
        // 编辑逼内容获取
        handleContent(val) {
            this.form.description = val;
        },
        // 提交
        save() {
            this.$refs.form.validate((valid) => {
                if (!valid) return;
                this.handlePost();
            });
        },
        handlePost() {
            this.loading = true;
            const require = this.$route.params.id ? API.put() : API.post();
            // eslint-disable-next-line no-unused-vars
            require.then(res => {});
        },
        // 获取数据
        fetchData() {
            if (!this.$route.params.id) return;
            this.loading = true;
            // eslint-disable-next-line no-unused-vars
            API.get().then(res => {}).finally(() => this.loading = false);
        },
    },
    created() {
        this.fetchData();
    },
};
</script>

<style lang="scss">
.el-select-dropdown.el-popper {
    width: 180.48px !important;
}
</style>
