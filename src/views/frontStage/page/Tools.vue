<template>
    <div class="container">
        <div class="breadcrumb">
            <div class="breadcrumb-item breadcrumbContainer">
                <el-breadcrumb separator-class="el-icon-arrow-left">
                    <transition-group name="breadcrumb">
                        <el-breadcrumb-item v-for="(item, index) in list" :key="index">
                            <router-link :to="item.path">{{item.meta.title}}</router-link>
                        </el-breadcrumb-item>
                    </transition-group>
                </el-breadcrumb>
            </div>
        </div>
        <el-divider></el-divider>
        <div class="toolsContent">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: "Tools",
    data() {
        return {
            query: {
                current: 1,
                size: 6,
                keyword: '',
                delFlag: 0
            },
            loading: false,
            toolList: [],
            pageTotal: 1
        }
    },
    methods: {
        getData() {
            this.loading=true;
            const data = {
                keyword: this.query.keyword,
                current: this.query.current,
                size: this.query.size,
                delFlag: this.query.delFlag
            }
            this.getRequest('/chick/tools/list', data).then(res => {
                this.toolList = res.data.records;
                this.pageTotal = res.data.total;
                // console.log(this.toolList);
            })
            this.loading=false;
        },
        handlePageChange(val) {
            this.$set(this.query, 'current', val);
            // target.scrollIntoView();
            this.getData();
        },
        addRouter(path){
            this.$router.push(path);
        }
    },
    created() {
        this.getData();
    },
    computed: {

        list() {
            return this.$route.matched;
        }
    }
}
</script>

<style scoped>

.container{
    height: auto;
    width: 90%;
    margin: 0 auto;
}
.breadcrumb{
    height: 40px;
}
.breadcrumbContainer{
    padding: 25px 0 0 0;
}
.toolsContent{
    height: 100%;
    min-height: 400px;
    /*background-image: url("../../../assets/请先选择工具.png");*/
    background-position:center;
    background-repeat:no-repeat;
}
</style>
