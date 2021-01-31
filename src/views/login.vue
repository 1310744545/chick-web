<template>
    <div class="row">
        <div style="float: left;height: 100px;width: 400px">
<!--            <img src="">-->
        </div>
        <div style="float: left">
            <el-divider direction="vertical"></el-divider>
        </div>
        <div style="float: left">
            <el-form ref="loginForm" :model="loginForm" class="loginContent" :rules="rules">
                <H2 class="loginTitle">登录</H2>
                <el-form-item prop="username">
                    <el-input type="text" auto-complete="false" v-model="loginForm.username" placeholder="请输入账号" ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" auto-complete="false" v-model="loginForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="loginForm.code" placeholder="点击图片更换验证码" style="width: 250px; margin-right: 5px"></el-input><br>
                    <img :src="captchaUrl" @click="updateCaptcha">
                </el-form-item>
                <div>
                    <el-checkbox v-model="checked" class="rememberMe">记住我</el-checkbox>
                    <el-link type="primary" :underline="false" style="float: right;margin-left: 30px">忘记密码?</el-link>
                    <el-link type="primary" :underline="false" style="float: right">还没有账号?去注册</el-link>
                    <el-button type="primary" style="width: 100%" @click="formLogin">登录</el-button>
                </div>

            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                captchaUrl:'/user/captcha?time='+ new Date(),
                loginForm: {
                    username: '',
                    password: '',
                    code: ''
                },
                checked: true,
                rules: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 5, max: 10, message: '长度在 6 到 16 个字符', trigger: 'blur' },
                    ],
                    code : [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            formLogin(){
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            updateCaptcha(){
                this.captchaUrl = '/user/captcha?time='+ new Date();
            }
        },
        watch:{
        }
    }
</script>

<style scoped>
    .loginContent{
        border-radius: 15px;
        background-clip: padding-box;
        /*margin: 180px auto;*/
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .loginTitle{
        margin: 0 auto 40px auto;
        text-align: center;
    }
    .row{
        width: 900px;
        margin: 180px auto;
    }
    .el-divider--vertical{
        /*display:inline-block;*/
        width: 1px;
        height: 370px;
        margin:0 30px;
        /*vertical-align:middle;*/
        /*position:relative;*/
    }
    .rememberMe{
        float: left;
        margin: 0 0 15px 0;
    }
</style>
