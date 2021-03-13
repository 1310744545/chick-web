<template>
    <div class="myContent">
        <div class="tip" style="text-align: left">
            二维码识别
        </div>
        <div style="width: 30%;margin: 0 auto;">
                <el-upload
                    v-if="!flag"
                    style="margin: 20px 0 0 0"
                    class="upload-demo"
                    drag
                    accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                    action="#"
                    :file-list="fileList"
                    :before-upload="onBeforeUploadImage"
                    :http-request="UploadImage"
                    :show-file-list='false'>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将二维码拖到此处，或<em>点击上传</em></div>
                    <template #tip>
                        <div class="el-upload__tip">
                            只能上传 jpg/png/jpeg/JPG/JPEG 文件
                        </div>
                    </template>
                </el-upload>
            <div style="margin: 20px 0;">
                <el-button @click="clearDate" type="primary" >清空数据</el-button>
                <el-button type="primary" v-clipboard:copy="content" v-clipboard:success="onCopy" v-clipboard:error="onError">复制二维码内容</el-button>
            </div>
            <el-input
                type="textarea"
                :rows="2"
                :autosize="{ minRows: 6,maxRows:10}"
                placeholder="二维码内容"
                v-model="content">
            </el-input>
        </div>
    </div>
</template>

<script>
import VueClipboard from 'vue-clipboard2'
import Vue from 'vue'
Vue.use(VueClipboard)
import {Message} from 'element-ui'
import axios from 'axios'
export default {
    name: "ImageBase64",
    data() {
        return {
            content: '',
            flag:false,
            fileList:[]
        }
    },
    methods: {
        onBeforeUploadImage(file){

            // var reader = new FileReader()
            // reader.readAsDataURL(file);
            // reader.onload = () => {
            //     this.base64 = reader.result
            // }
        },
        UploadImage(param){
            const formData = new FormData()
            formData.append('file',param.file);
            axios.post("/chick/tools/distinguishQRCode", formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(res=>{
                this.content=res.data
                // console.log(res);
                // if (res.code === 0){
                //     this.editVisible=false;
                //     this.getData();
                // }
            })
        },
        clearDate(){
            this.content='';
        },
        onCopy(){
            Message.success('复制成功');
        },
        onError(){
            Message.error('复制失败');
        }
    },
    watch:{
        base64(newVal, oldVal){
            if (newVal===''){
                this.flag=false;
            }else {
                this.flag=true;
            }
        }
    }
}
</script>

<style scoped>
.myContent {
    min-height: 500px;
    height: auto;
    width: 100%;
    background-color: white;
}

.tip {
    padding: 8px 16px;
    background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 5px solid #50bfff;
    margin: 0 0 20px 0;
    font-size: 40px;
}

</style>
