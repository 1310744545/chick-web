<template>
    <div>
        <el-form ref="loginForm" :model="registerForm" class="loginContent" :rules="rules">
            <H2 class="loginTitle">注册</H2>
            <el-form-item prop="username">
                <el-input type="text" auto-complete="false" v-model="registerForm.username" placeholder="请输入账号"
                          prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" auto-complete="false" v-model="registerForm.password" placeholder="请输入密码"
                          show-password prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-form-item prop="rePassword">
                <el-input type="password" auto-complete="false" v-model="registerForm.rePassword" placeholder="请再次输入密码"
                          show-password prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-button type="primary" style="width: 100%;margin-bottom: 15px" @click="formRegister">注册</el-button>

        </el-form>
    </div>
</template>

<script>
export default {
    name: "register",
    data() {
        const validUsername=(rule,value,callback)=>{
            let reg= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
            if(!reg.test(value)){callback(new Error('账号必须是由8-16位字母+数字组合'))
            }else{
                callback()
            }
        };
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.registerForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            registerForm:{
                username:'',
                password:'',
                rePassword:''
            },
            rules: {
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { validator :validUsername ,trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 5, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
                ],
                rePassword: [
                    { validator :validatePass ,trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        formRegister(){
            const data={
                username:this.registerForm.username,
                password:this.registerForm.password
            }
            this.postRequest("/user/register",data).then(this.$router.replace('/user/login'));
        }
    },
    created() {
        window.localStorage.removeItem("token");
    }
}
</script>

<style scoped>
.loginContent{
    border-radius: 15px;
    background-clip: padding-box;
    margin: 188px auto;
    width: 356px;
    padding: 15px 35px 15px 35px;
    background-color: #ffffff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
.loginTitle{
    margin: 0 auto 40px auto;
    text-align: center;
}
</style>
