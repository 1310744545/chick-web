<template>
<div>
    <el-col :span="8" style="width: 70%">
        <el-card shadow="hover" v-for="(item, index) in writeList" >
            鼠标悬浮时显示
        </el-card>
        <el-pagination
            background
            layout="prev, pager, next, jumper"
            :current-page="query.current"
            :page-size="query.size"
            :total="pageTotal"
            @current-change="handlePageChange"
        ></el-pagination>
    </el-col>




</div>
</template>

<script>
export default {
    name: "Writing",
    data() {
        return {
            writeList:[],
            pageTotal: 1,
            loading: false,
            query: {
                current: 1,
                size: 10,
                keyword: '',
                delFlag: 0
            },
        }
    },
    created() {
      this.getWrite()
    },
    methods: {
        getWrite(){
            this.getRequest('/chick/writing/indexList', this.query).then(res=>{
                this.writeList = res.data.records;
                this.pageTotal = res.data.total;
                console.log(res)
            })
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'current', val);
            // target.scrollIntoView();
            this.getWrite();
        }
    }
}
</script>

<style scoped>

</style>
