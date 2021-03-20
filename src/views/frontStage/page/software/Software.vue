<template>
    <div style="min-height: 600px;height: auto" v-loading="loading">
        <el-row >
            <el-col :span="16" style="margin: 0 auto;float: none" >
                <el-card shadow="hover" v-for="(item,index) in softwareList" style="margin: 0 0 20px 0;text-align: left">
                    <span style="font-size: 26px;width: 150px;display: inline-block">
                        <span style="color: red">{{item.name}}</span>
                    </span>
                    <span style="font-size: 16px;width: 340px;display: inline-block">
                        出品公司/开发者:
                        <span>{{item.company}}</span>
                    </span>
                    <span style="font-size: 16px;">
                        软件描述:
                        <span>{{item.description}}</span>
                    </span>
                    <br>
                    <br>
                    <br>
                    <span style="font-size: 15px;width: 224px;display: inline-block;text-align: right;margin: 10px 30px 0 0">
                        下载(最新):
                    </span>
                    <span style="font-size: 16px;width: 200px;display: inline-block">
                        windows:
                        <span v-if="item.windows==null" style="color: #cac6c6">暂无</span>
                        <a :href="item.windows" v-if="item.windows!=null">
                            {{item.mostNewWindowsVersions}}
                        </a>
                    </span>
                    <span style="font-size: 16px;width: 200px;display: inline-block">
                        linux:
                        <span v-if="item.linux==null" style="color: #cac6c6">暂无</span>
                        <a :href="item.linux" v-if="item.linux!=null">
                            {{item.mostNewLinuxVersions}}
                        </a>
                    </span>
                    <span style="font-size: 16px;width: 100px;display: inline-block">
                        mac:
                        <span v-if="item.mac==null" style="color: #cac6c6">暂无</span>
                        <a :href="item.mac" v-if="item.mac!=null">
                            {{item.mostNewMacVersions}}
                        </a>
                    </span>
                    <span style="font-size: 16px;width: 200px;display: inline-block;text-align: right">
                        <router-link :to="{path:'/softwareDetail', query:{softwareId:item.id}}">
                                所有版本<i class="el-icon-arrow-right"></i>
                        </router-link>
                    </span>
                </el-card>
            </el-col>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.current"
                    :page-size="query.size"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </el-row>
    </div>

</template>

<script>
export default {
    name: "Software",
    data() {
        return {
            query: {
                current: 1,
                size: 10,
                keyword: '',
                delFlag: 0
            },
            softwareList:[],
            pageTotal: 0,
            loading:false
        }
    },
    created() {
        this.getSoftware()
    },
    methods: {
        getSoftware(){
            this.loading = true
            const data = {
                keyword: this.query.keyword,
                current: this.query.current,
                size: this.query.size,
                delFlag: this.query.delFlag
            }
            this.getRequest("/chick/software/softwareAndContentList", data).then(res => {
                this.softwareList = res.data.records;
                this.loading = false
                console.log(res);
            })
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'current', val);
            this.getSoftware();
        },
    }
}
</script>

<style scoped>

</style>
