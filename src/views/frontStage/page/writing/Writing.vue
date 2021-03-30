<template>
    <div>
        <div style="width: 70%;margin: 0 auto;min-height: 500px">
            <el-col class="content">
                <el-card shadow="hover" v-for="(item, index) in writeList" style="margin: 20px 0;text-align: left">
                    <div style="font-size: 22px;color: #20a0ff">
                        <router-link :to="{path:'/writingDetail', query:{writingId:item.id}}"
                                     style="font-size: 22px;color: #20a0ff;text-decoration: none;" target="_blank">
                            {{ item.title }}
                        </router-link>
                    </div>
                    <div style="margin: 20px 0">
                        <span v-html="matchReg(item.content)" style="color: #999999"></span>
                    </div>
                    <div style="height: 30px">
                        <router-link to="/" target="_blank">
                            <el-image :src="item.userHeadPortraitUrl"
                                      style="vertical-align:middle;height: 30px;width: 30px;display: inline-block"></el-image>
                            <div style="display: inline-block">
                                <span
                                    style="line-height:30px;color: #50bfff;margin: 0 14px 0 10px">{{ item.name }} </span>
                            </div>
                        </router-link>
                        <div style="display: inline-block">
                        <span style="line-height:30px;color: #999999;margin: 0 10px 0 0;font-size: 14px">
                            时间: {{ item.createDate }}
                        </span>
                        </div>
                        &nbsp;
                        <div style="display: inline-block">
                        <span style="line-height:30px;color: #999999;margin: 0 10px 0 0;font-size: 14px">
                            评论: <span style="color: #50bfff">{{ item.commentAmount }}</span>
                        </span>
                        </div>
                        &nbsp;
                        <div style="display: inline-block">
                        <span style="line-height:30px;color: #999999;margin: 0 10px 0 0;font-size: 14px">
                            浏览: <span style="color: #50bfff">{{ item.readAmount }}</span>
                        </span>
                        </div>
                        &nbsp;
                        <div style="display: inline-block">
                        <span style="line-height:30px;color: #999999;margin: 0 10px 0 0;font-size: 14px">
                            点赞: <span style="color: #50bfff">{{ item.likeAmount }}</span>
                        </span>
                        </div>
                        &nbsp;
                        <div style="display: inline-block">
                        <span style="line-height:30px;color: #999999;margin: 0 10px 0 0;font-size: 14px">
                            收藏: <span style="color: #50bfff">{{ item.collectAmount }}</span>
                        </span>
                        </div>
                        &nbsp;
                        <div style="display: inline-block">
                        <span style="line-height:30px;color: #999999;margin: 0 10px 0 0;font-size: 14px">
                            文章类型:
                            <span style="color: #50bfff">{{ item.typeName }}</span>
                        </span>
                        </div>
                    </div>
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
    </div>
</template>

<script>
export default {
    name: "Writing",
    data() {
        return {
            writeList: [],
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
        if (sessionStorage.getItem('writingIndex') != null) {
            this.query.current = parseInt(sessionStorage.getItem('writingIndex'));
        }
        this.getWrite()
    },
    methods: {
        getWrite() {
            this.getRequest('/chick/writing/indexList', this.query).then(res => {
                this.writeList = res.data.records;
                this.pageTotal = res.data.total;
                sessionStorage.setItem('writingIndex', this.query.current);
            })
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'current', val);
            // target.scrollIntoView();
            this.getWrite();
        },
        matchReg(str) {
            let reg = /<\/?.+?\/?>/g;
            return (str.replace(reg, ''));
        }
    }
}
</script>

<style scoped>
</style>
