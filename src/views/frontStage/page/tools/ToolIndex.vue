<template>
    <div class="toolsTitle">
        <el-row :gutter="40" style="width: 90%;margin: 0 auto">
            <el-col :span="6" v-for="(item,index) in toolList" style="text-align:center;margin-bottom: 30px">
                <router-link :to="item.path">
                    <el-image :src="item.imgUrl" style="width: 220px;height: 220px"></el-image>
                </router-link>
                <el-button @click="addRouter(item.path)" type="primary" style="width: 100%">{{ item.name }}</el-button>
            </el-col>
        </el-row>
        <br>
        <div class="pagination">
            <el-pagination
                layout="total, prev, pager, next"
                :current-page="query.current"
                :page-size="query.size"
                :total="pageTotal"
                @current-change="handlePageChange"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: "ToolIndex",
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
            this.loading = true;
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
            this.loading = false;
        },
        handlePageChange(val) {
            this.$set(this.query, 'current', val);
            // target.scrollIntoView();
            this.getData();
        },
        addRouter(path) {
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
.toolsTitle {
    text-align: center;
}
</style>
