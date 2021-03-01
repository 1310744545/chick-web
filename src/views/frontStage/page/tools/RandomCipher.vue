<template>
    <div class="myContent">
        <div class="tip" style="text-align: left">
            随机密码生成
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
        <div style="padding: 0 0 0 25%">
            <span style="float: left;font-size: 27px;margin: 0 20px 0 0">密码位数:</span>
            <el-slider
                :max='max'
                style="width: 50%;float: left"
                v-model="numberCount"
                show-input>
            </el-slider>
        </div>
        <br><br><br>
        <div>
            <el-checkbox v-model="smallLetter">小写字母(a..z)</el-checkbox>
            <el-checkbox v-model="bigLetter">大写字母(A..Z)</el-checkbox>
            <el-checkbox v-model="number">数字(0..9)</el-checkbox>
            <el-checkbox v-model="specialCharacter">特殊字符</el-checkbox>
            <el-checkbox v-model="rubbishCharacter">去除不易识别字符(1,i,I,0,o,O)</el-checkbox>
        </div>
        <br>
        <el-button @click="generate" type="primary">生成</el-button>

        <div v-for="(item, index) in randomList" :key="index" style="margin: 10px 0 0 0">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "RandomCipher",
    data() {
        return {
            count:3,
            numberCount: 12,
            smallLetter: true,
            bigLetter: true,
            number: true,
            specialCharacter: false,
            rubbishCharacter: true,
            randomList:[],
            max:50
        }
    },
    methods: {
        generate(){
            const data = {
                count: this.count,
                numberCount: this.numberCount,
                smallLetter: this.smallLetter,
                bigLetter: this.bigLetter,
                number: this.number,
                specialCharacter: this.specialCharacter,
                rubbishCharacter: this.rubbishCharacter,
            }
            this.getRequest('/chick/tools/generateRandomCipher', data).then(res => {
                this.randomList = res.data;
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
