<template>
    <div class="content">
        <el-card class="box-card card-content" v-loading="loading">
            <div style="width: 40%;height: 100%;float: left;margin: 50px 0 50px 0">
                <div style="height: 200px;border: 1px solid gainsboro;width: 200px;margin: 0 auto 0 40%">
                    <el-image :src="user.headPortraitUrl" style="width: 100%;height: 100%"></el-image>
                    <el-upload
                        class="upload-demo"
                        action=""
                        multiple
                        :limit="1"
                        accept=".png,.jpeg,.jpg,.gif"
                        :show-file-list="false"
                        :before-upload="onBeforeUpload"
                        :http-request="Upload"
                        :file-list="fileList"
                        style="margin: 30px 0 0 0"
                    >
                        <el-button type="primary" round >更换头像</el-button>
                    </el-upload>

                </div>
            </div>
            <div style="width: 60%;height: 100%;float: left;padding: 50px 0 0 0;font-size: 16px">
                账号: <el-input v-model="user.username" :disabled="true" style="width: 300px;margin: 0 0 10px 0"></el-input><br>
                昵称: <el-input v-model="user.name" style="width: 300px;margin: 0 0 10px 0"></el-input><br>
                性别: <el-select v-model="user.sex" style="width: 300px;margin: 0 0 10px 0">
                    <el-option value="0" label="女"></el-option>
                    <el-option value="1" label="男"></el-option>
                </el-select><br>
                生日: <el-date-picker
                v-model="user.birthday"
                type="date"
                placeholder="选择日期"
                style="width: 300px;margin: 0 0 10px 0">
                    </el-date-picker><br>
                电话: <el-input v-model="user.phone" style="width: 300px;margin: 0 0 10px 0"></el-input><br>
                邮箱: <el-input v-model="user.email" style="width: 300px;margin: 0 0 10px 0"></el-input><br>
                <el-button type="primary" round style="margin: 30px 0 0 0;display:block;">保存信息</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
import {Message} from 'element-ui'
import axios from 'axios'
export default {
    name: "information",
    data() {
        return {
            loading: false,
            user: {
                username: '',
                sex: '',
                phone: '',
                name: '',
                headPortraitUrl: '',
                email: '',
                birthday: ''
            },
            fileList:[]
        }
    },
    created() {
        this.getUser();
    },
    methods: {
        getUser() {
            this.loading = true
            if (window.localStorage.getItem('token') !== null) {
                this.postRequest('/user/getUserByJwt').then(res => {
                    this.user = res.data;
                    this.loading = false
                    if (this.user.headPortraitUrl === null) {
                        this.user.headPortraitUrl = "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
                    }
                })
            }
        },
        onBeforeUpload(file){
            if (file.size > 10485760){
                Message.error('上传图片请小于10mb')
                this.fileList=[]
            }
            // console.log('onBeforeUpload')
        },
        Upload(param){
            console.log(param)
            const formData = new FormData()
            formData.append('file',param.file);
            axios.post("/user/uploadHeadPortrait", formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(res=>{
                location.reload();
            })
        },
    }
}
</script>

<style scoped>
.content {
    min-height: 550px;
}

.card-content {
    width: 60%;
    height: 535px;
    margin: 25px auto 0 auto;
}
</style>
