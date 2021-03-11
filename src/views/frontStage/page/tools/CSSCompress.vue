<template>
    <div class="myContent">
        <div class="tip" style="text-align: left">
            CSS压缩
        </div>
        <div style="width: 60%;margin: 0 auto;">
            <div style="height: 400px;border: 1px solid RGB(220,224,230);">
                <el-upload
                    v-if="!flag"
                    style="margin: 100px 0 0 0"
                    class="upload-demo"
                    drag
                    accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                    action="#"
                    :before-upload="onBeforeUploadImage"
                    :http-request="UploadImage"
                    :show-file-list='false'>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <template #tip>
                        <div class="el-upload__tip">
                            只能上传 jpg/png/jpeg/JPG/JPEG 文件
                        </div>
                    </template>
                </el-upload>
                <el-image v-if="flag" :src="base64" style="max-height: 400px;max-width: 500px"></el-image>
            </div>
            <div style="margin: 20px 0;">
                <el-button @click="imgToBase64" type="primary" class="el-icon-bottom">图片转Base64</el-button>
                <el-button @click="base64ToImg" type="primary" class="el-icon-top">Base64转图片</el-button>
                <el-button @click="clearDate" type="primary" >清空数据</el-button>
                <el-button type="primary" v-clipboard:copy="base64" v-clipboard:success="onCopy" v-clipboard:error="onError">点击复制Base64</el-button>
            </div>
            <el-input
                type="textarea"
                :rows="2"
                :autosize="{ minRows: 6,maxRows:10}"
                placeholder="请输入内容"
                v-model="base64">
            </el-input>
        </div>
    </div>
</template>

<script>
import VueClipboard from 'vue-clipboard2'
import Vue from 'vue'
Vue.use(VueClipboard)
import {Message} from 'element-ui'
export default {
    name: "ImageBase64",
    data() {
        return {
            base64: '',
            flag:false
        }
    },
    methods: {
        onBeforeUploadImage(file){
            var reader = new FileReader()
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.base64 = reader.result
            }
        },
        UploadImage(param){
            // let reader = new FileReader();   //html5读文件
            //  //转BASE64
            // console.log(reader.readAsDataURL(param.file));
        },
        imgToBase64(){

        },
        base64ToImg(){

        },
        clearDate(){
            this.base64='';
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
