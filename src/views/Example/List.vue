<template>
    <el-card>

        <div class="text-xl">列表页面</div>

        <div class="flex justify-between w-full mt-2 mb-2">
            <div class="flex flex-wrap w-4/5">
                <!-- input 搜索 -->
                <el-input v-model="form.keyword" placeholder="请输入关键字" class="mr-2 w-auto"></el-input>
                <!-- select下拉框 -->
                <el-select v-model="form.gender" placeholder="请选择性别" class="mr-2 w-auto">
                    <el-option
                        v-for="item in genders"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
                <!-- 时间 -->
                <el-date-picker
                    class="mr-2"
                    v-model="date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="timestamp">
                </el-date-picker>
                <!-- 远程搜索 -->
                <el-select
                    v-model="form.keyword"
                    :remote-method="fetchList"
                    filterable
                    remote
                    reserve-keyword
                    placeholder="请输入内容"
                    class="mr-2"
                    @change="handleSelect">
                    <el-option
                        v-for="item in result"
                        :key="item.nickname"
                        :label="item.nickname"
                        :value="item.nickname"/>
                </el-select>

                <el-button type="primary" @click="fetchData(1)">搜索</el-button>
                <el-button @click="handleReset">重置</el-button>
            </div>

            <div>
                <el-button type="info" @click="handleDialog">弹窗</el-button>
                <el-button type="primary" @click="handleEdit">新增</el-button>
            </div>

        </div>

        <el-table
            :data="tableData"
            class="my3 col-12"
            v-loading="loading">
            <el-table-column label="ID" align="center" prop="id"></el-table-column>

            <el-table-column label="用户头像" align="center">
                <template slot-scope="{$index, row}">
                    <img :src="row.avatar" class="w-10 h-10 rounded-full mb-1" alt="">
                </template>
            </el-table-column>

            <el-table-column label="用户名" align="center" prop="nickname"></el-table-column>

            <el-table-column label="注册时间" align="center">
                <template slot-scope="{row}">
                    {{ row.registered_at | formatTime }}
                </template>
            </el-table-column>

            <!-- <el-table-column prop="createdAt" label="创建时间" align="center"></el-table-column> -->

            <el-table-column label="编辑" align="center" fixed="right" width="250">
                <template slot-scope="{$index, row}">
                    <el-button type="primary" @click="handleEdit(row)">编辑</el-button>
                    <el-button type="danger" @click="handleDelete(row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="text-center mt-2">
            <el-pagination
                v-if="tableData && tableData.length"
                class="center"
                @current-change="fetchData"
                :current-page.sync="form.page"
                :page-size="form.size"
                layout="total, prev, pager, next, jumper"
                :total="pagination.total">
            </el-pagination>
        </div>

        <!-- dialog -->
        <!-- <dialog ref="dialog" /> -->
        <add-dialog ref="addDialog" />

    </el-card>
</template>

<script>
import Dialog from '@/components/dialog/dialog';

export default {
    components: {
        AddDialog: Dialog,
    },
    data() {
        return {
            form: {
                keyword: '',
                city: '',
                page: 1,
                size: 10,
                login_time_from: '',
                login_time_to: '',
                gender: '',
            },
            date: null,
            pagination: {
                total: 0,
            },
            // table-loading标志
            loading: false,
            // 数据刷新
            update: false,
            tableData: [],
            genders: [
                {
                    name: '男',
                    id: 1,
                }, {
                    name: '女',
                    id: 2,
                },
            ],
            result: [],
        };
    },
    watch: {
        update(val) {
            if (!val) return;
            this.fetchData();
        },
    },
    methods: {
        // 数据初始化
        handleReset() {
            this.form = {
                nickname: '',
                city: '',
                page: 1,
                size: 10,
                login_time_from: '',
                login_time_to: '',
            };
            this.date = null;
            this.update = true;
        },
        // 获取数据
        fetchData(page = 1) {
            this.loading = true;
            this.form.page = page;

            if (this.date && this.date.length) {
                this.form.login_time_from = this.date[0] / 1000;
                this.form.login_time_to = this.date[1] / 1000;
            }

            API.get('/activities', {
                // params: this.form,
            }).then(res => {
                this.tableData = res.content;
                this.pagination.total = res.pagination.total;
            }).finally(() => {
                this.update = false;
                this.loading = false;
            });
        },
        // eslint-disable-next-line no-unused-vars
        handleSelect(item) {
        },
        // 远程搜索
        // eslint-disable-next-line no-unused-vars
        fetchList(keyword = '') {
            // API.get('app-users', {
            //     params: {
            //         keyword: keyword,
            //     },
            // }).then(res => {
            //     this.result = res.content;
            // }).finally(() => {
            // });
        },
        // 新增/编辑
        // eslint-disable-next-line no-unused-vars
        handleEdit(row) {
            const id = row ? row.id : '';
            this.$router.push({
                name: 'Example.Form',
                params: {
                    id: id,
                },
            });
        },
        // 弹窗
        handleDialog() {
            this.$refs.addDialog.open();
        },
        // 删除
        handleDelete() {
            $ele.$confirm('是否确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                $ele.$message({
                    type: 'success',
                    message: '删除成功!',
                });
                this.update = true;
            }).catch(() => {
                $ele.$message({
                    type: 'info',
                    message: '已取消删除',
                });
            });
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
