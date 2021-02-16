<template>
    <div class="home">
<!--        这是首页-->
        <div style="height: 400px;">
            <div class="level1-1">
                <div class="block" style="padding: 20px;">
                    <el-carousel height="360px">
                        <el-carousel-item v-for="item in 4" :key="item">
                            <h3 class="small">{{ item }}</h3>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <div class="level1-2">
                <div class="level1-2-1" style="padding: 20px;height: 90%;width: 93%">
                    <el-card class="box-card" style="text-align: left;height: 100%">
                        <div slot="header" class="clearfix">
                            <span>公告信息</span>
                            <el-button style="float: right; padding: 3px 0" type="text">公告详情</el-button>
                        </div>
                        <div v-for="o in 6" :key="o" class="text item">
                            {{'列表内容 ' + o }}
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
        <div style="height: 300px;">
            <el-image
                style="width: auto; height: auto"
                :src="url"
               ></el-image>
            <el-divider></el-divider>
        </div>
        <div style="height: 300px"></div>
    </div>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            url:'http://chickweb.oss-cn-beijing.aliyuncs.com/files/QQ%E6%88%AA%E5%9B%BE20210215110654.png'
        }
    },
    methods: {}
}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
}
.home{
    height: 1000px;
    width: 90%;
    margin: 0 auto;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
.level1-1{
    width: 60%;
}
.level1-2{
    height: 400px;
    width: 40%;
}
.level1-1,.level1-2 {
    float: left;
}
.text {
    font-size: 14px;
}
.item {
    margin-bottom: 28px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}

.box-card {
    width: 480px;
}
</style>
