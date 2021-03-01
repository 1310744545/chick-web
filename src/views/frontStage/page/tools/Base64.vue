<template>
    <div class="myContent">
        <div class="tip" style="text-align: left">
            Base64 编码/解码
        </div>
        <div style="width: 60%;margin: 0 auto">
            <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                :autosize="{ minRows: 6}"
                v-model="normality">
            </el-input>
            <div style="margin: 20px 0">
                <el-button @click="encode" type="primary" class="el-icon-bottom" style="margin: 0 100px 0 0">编码</el-button>
                <el-button @click="decode" type="primary" class="el-icon-top">解码</el-button>
            </div>
            <el-input
                type="textarea"
                :rows="2"
                :autosize="{ minRows: 6}"
                placeholder="请输入内容"
                v-model="afterTheCoding">
            </el-input>
        </div>
    </div>
</template>

<script>
export default {
    name: "Base64",
    data() {
        return {
            normality:'',
            afterTheCoding:''
        }
    },
    methods: {
            encode(){
            const data = {
                flag: "0",
                code: this.normality
            }
            this.getRequest('/chick/tools/base64EncodeOrDecode', data).then(res => {
                this.afterTheCoding = res.data;
            })
        },
        decode(){
            const data = {
                flag: "1",
                code: this.afterTheCoding
            }
            this.getRequest('/chick/tools/base64EncodeOrDecode', data).then(res => {
                this.normality = res.data;
            })
        }
    }
}
</script>

<style scoped>
.myContent{
    min-height: 500px;
    height: auto;
    width: 100%;
    background-color: white;
}
.tip{
    padding: 8px 16px;
    background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 5px solid #50bfff;
    margin: 0 0 20px 0;
    font-size: 40px;
}

</style>
