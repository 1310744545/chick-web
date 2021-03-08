<template>
    <div class="UUIDContent">
        <div class="tip" style="text-align: left">
            二维码识别
        </div>
        <div style="padding: 0 0 0 25%">
            <span style="float: left;font-size: 27px;margin: 0 20px 0 0">生成个数:</span>
            <el-slider
                style="width: 50%;float: left"
                v-model="count"
                show-input>
            </el-slider>
        </div>
        <br><br><br>
        <el-button @click="generate" type="primary">识别</el-button>

        <div v-for="(item, index) in UUIDList" :key="index" style="margin: 10px 0 0 0">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "UUID",
    data() {
        return {
            count:5,
            UUIDList:[]
        }
    },
    methods: {
        generate(){
            this.getRequest('/chick/tools/generateUUID', {count: this.count}).then(res => {
                this.UUIDList = res.data;
            })
        }
    }
}
</script>

<style scoped>
.UUIDContent{
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
