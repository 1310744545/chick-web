<template>
    <div class="row">
        <div style="float: left;height: 200px;width: 400px">
            <img src="../../assets/login.png" style="width: 400px;height: 400px">
        </div>
        <div style="float: left">
            <el-divider direction="vertical"></el-divider>
        </div>
        <div style="float: left">
            <el-form ref="loginForm" :model="loginForm" class="loginContent" :rules="rules">
                <H2 class="loginTitle">登录</H2>
                <el-form-item prop="username">
                    <el-input type="text" auto-complete="false" v-model="loginForm.username" placeholder="请输入账号"
                              prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" auto-complete="false" v-model="loginForm.password" placeholder="请输入密码"
                              show-password prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="loginForm.code" placeholder="点击图片可更换验证码" style="width: 240px;margin-right: 10px">
                    </el-input>
                    <img :src="captchaUrl" @click="updateCaptcha" align="absmiddle">
                </el-form-item>
                <el-checkbox v-model="checked" class="rememberMe">记住我</el-checkbox>
                <el-link type="primary" :underline="false" style="float: right;margin-left: 30px">忘记密码?</el-link>
                <el-link type="primary" :underline="false" style="float: right" @click="register">没有账号?去注册</el-link>
                <el-button type="primary" style="width: 100%;margin-bottom: 15px" @click="formLogin">登录</el-button>

            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            captchaUrl: '',
            captchaText:'',
            loginForm: {
                username: '',
                password: '',
                code: ''
            },
            checked: true,
            rules: {
                username: [
                    {required: true, message: '请输入账号', trigger: 'blur'},
                    {min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur'},
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {min: 5, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'},
                ],
                code: [
                    {required: true, message: '请输入验证码', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        formLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    const data = {
                        username: this.loginForm.username,
                        password: this.loginForm.password,
                        code: this.loginForm.code,
                        captchaText : this.captchaText
                    }
                    // console.log(data)
                    this.postRequest("/user/login", data).then(res => {
                        // console.log(res)
                        if (res.code === 0) {
                            //存储用户token
                            var token = res.data.head + res.data.token;
                            window.localStorage.setItem('token', token);
                            //跳转页面
                            this.$router.replace('/');
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        updateCaptcha() {
            this.getCaptcha()
            // this.captchaUrl = this.common.baseURL + '/user/captcha?time=' + new Date();
        },
        register() {
            this.$router.replace('/user/register');
        },
        getCaptcha(){
            this.getRequest('/user/captcha').then(res=>{
                this.captchaUrl = 'data:image/png;base64,'+res.data.captchaBase64;
                this.captchaText = res.data.text;
                console.log(res);
            })
        }
    },
    watch: {},
    created: function () {
        this.getCaptcha();
        window.localStorage.removeItem("token");
    }
}
</script>

<style scoped>
.loginContent {
    border-radius: 15px;
    background-clip: padding-box;
    /*margin: 180px auto;*/
    width: 350px;
    padding: 15px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}

.loginTitle {
    margin: 0 auto 40px auto;
    text-align: center;
}

.row {
    width: 1000px;
    margin: 140px auto;
}

.el-divider--vertical {
    display: inline-block;
    width: 1px;
    height: 395px;
    margin: 0 30px;
    vertical-align: middle;
    position: relative;
}

.rememberMe {
    float: left;
    margin: 0 0 25px 0;
}
</style>
