<template>
    <div class="login-page">
        <el-card>
            <div slot="header" class="text-center text-xl">{{ $store.state.site_title }}</div>
            <el-form :model="form" :rules="rules" ref="form" label-position="top" @keyup.enter.native="login">
                <el-form-item prop="account">
                    <el-input :autofocus="true" placeholder="请输入账号" v-model="form.account"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="请输入密码" type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item v-show="captcha_url" prop="captcha">
                    <div class="flex">
                        <el-input class="mr-1" placeholder="输入验证码" v-model="form.captcha"></el-input>
                        <a href="javascript:void(0);" @click="refreshCaptchaUrl">
                            <img :src="captcha_url" />
                        </a>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-switch v-model="form.remember" active-text="下次免登录"></el-switch>
                </el-form-item>
                <el-form-item class="center">
                    <el-button type="primary" @click="login" :loading="isBtnLoading">{{btnText}}</el-button>
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
            form: {
                account: '',
                password: '',
                captcha: '',
                remember: false,
            },
            captcha_url: false,
            captcha_prefix: '',
            rules: {
                account: [
                    {required: true, message: '请输入账号', trigger: 'blur'},
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
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
        refreshCaptchaUrl() {
            this.captcha_url = `${this.captcha_prefix}?t=${Date.now()}`;
        },
        fetchLogin() {
            if (this.captcha_prefix.length > 0) {
                this.refreshCaptchaUrl();
            } else {
                API.get('auth/login').then((res) => {
                    if (res && Object.prototype.hasOwnProperty.call(res, 'captcha_url')) {
                        this.captcha_prefix = res.captcha_url;
                        this.refreshCaptchaUrl();
                    } else {
                        this.captcha_url = false;
                    }
                });
            }
        },
        login() {
            if (this.captcha_url && this.form.captcha.length === 0) {
                $ele.$message.error('验证码没输入');
                return;
            }
            this.$refs.form.validate((valid) => {
                if (!valid) return;
                this.isBtnLoading = true;
                API.post('auth/login', this.form).then((res) => {
                    this.$store.commit('setMy', res);
                    this.$router.push('/');
                }).catch(() => {
                    this.fetchLogin();
                }).finally(() => this.isBtnLoading = false);
            });
        },
    },
    mounted() {
        this.fetchLogin();
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

        .el-card {
            width: 100%;
            max-width: 400px;
        }

        .title {
            color: #20a0ff;
            font-weight: bold;
            font-size: 30px;
            text-align: center;
            line-height: 2.2;
            font-family: sans-serif;
        }

        .el-button {
            width: 100%;
        }
    }
</style>
