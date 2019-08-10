<template>
    <div class="login-page">
        <el-card>
            <div slot="header" class="text-center text-xl">{{ $store.state.site_title }}</div>
            <el-form
              :model="form"
              :rules="rules"
              ref="form"
              label-position="top"
              class="login-card-form"
              @submit.native.prevent="login">
                <el-form-item prop="account">
                    <el-input
                      :autofocus="true"
                      placeholder="请输入账号"
                      v-model="form.account"/>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                      placeholder="请输入密码"
                      type="password"
                      v-model="form.password"/>
                </el-form-item>
                <div class="flex">
                    <el-form-item class="login-card-code" prop="code">
                        <el-input
                            placeholder="请输入图形验证码"
                            type="text"
                            v-model="form.code"
                        ></el-input>
                    </el-form-item>
                    <img :src="codeImg" class="login-code-image" @click="refreshCodeImg()">
                </div>
                <el-form-item class="login-card-btn center">
                    <el-button
                      type="primary"
                      native-type="submit"
                      :loading="isBtnLoading">
                      {{btnText}}
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import {
    Input, Switch, Form, FormItem,
} from 'element-ui';

export default {
    components: {
        ElInput: Input,
        ElSwitch: Switch,
        ElForm: Form,
        ElFormItem: FormItem,
    },
    props: [],
    data() {
        return {
            codeImg: '',
            form: {
                account: '',
                password: '',
                code: '',
            },
            rules: {
                account: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                code: [
                    { required: true, message: '请输入图形验证码', trigger: 'blur' },
                ],
            },
            isBtnLoading: false,
        };
    },
    computed: {
        btnText() {
            if (this.isBtnLoading) return '登录中...';
            return '登录';
        },
    },
    watch: {},
    methods: {
        login() {
            this.$refs.form.validate((valid) => {
                if (!valid) return;
                this.isBtnLoading = true;
                API.post('auth/login', this.form).then((res) => {
                    if (res && res.id) {
                        this.$store.commit('setMy', res);
                        this.$router.push('/');
                    } else {
                        $ele.$message.error('账号密码错误！');
                    }
                }).catch(err => {
                    this.refreshCodeImg();
                    $ele.$message.error(err.message);
                }).finally(() => {
                    this.isBtnLoading = false;
                });
            });
        },
        refreshCodeImg() {
            this.codeImg = `${API.base_url}../supplier/captcha?${Math.random()}`;
        },
    },
    mounted() {
        this.refreshCodeImg();
    },
};
</script>

<style lang="scss">
    .login-page {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #e1e2e2;
        text-align: left;

        .el-card {
            width: 100%;
            max-width: 400px;
        }

        .login-card-code {
            width: 265px;
            flex: 0 0 auto;
        }


        .login-code-image {
            width: 83px;
            height: 35px;
            margin-left: 10px;
        }

        .login-card-btn {
            margin-top: 10px;
        }

        .title {
            color: #20a0ff;
            font-weight: bold;
            font-size: 30px;
            text-align: center;
            line-height: 2.2;
            font-family: sans-serif;
        }

        .el-button{
            width: 100%;
            height: 42px;
            font-size: 14px;
        }
    }
</style>
