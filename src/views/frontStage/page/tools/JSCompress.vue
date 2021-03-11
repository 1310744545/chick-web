<template>
    <div class="myContent">
        <div class="tip" style="text-align: left">
            JS压缩
        </div>
        <div style="width: 60%;margin: 0 auto;">
            <el-input
                type="textarea"
                :rows="2"
                :autosize="{ minRows: 6,maxRows:10}"
                placeholder="请输入内容"
                v-model="JSOne">
            </el-input>
            <div style="margin: 20px 0;">
                <el-button @click="compress()" type="primary" class="el-icon-bottom">普通压缩</el-button>
                <el-button @click="compress(true)" type="primary" class="el-icon-top">加密压缩</el-button>
                <el-button @click="decompress()" type="primary" class="el-icon-top">格式化</el-button>
                <el-button @click="clearDate" type="primary" >清空数据</el-button>
                <el-button type="primary" v-clipboard:copy="JSTwo" v-clipboard:success="onCopy" v-clipboard:error="onError">点击复制后者</el-button>
            </div>
            <el-input
                type="textarea"
                :rows="2"
                :autosize="{ minRows: 6,maxRows:10}"
                placeholder="请输入内容"
                v-model="JSTwo">
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
            JSOne: '',
            JSTwo:''
        }
    },
    methods: {

        decompress(){

        },
        clearDate(){
            this.JSOne='';
            this.JSTwo='';
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
