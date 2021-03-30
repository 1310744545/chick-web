<template>
    <div>
        <div style="width: 70%;margin: 0 auto;text-align: left">
            <div style="font-size: 36px;color: #20a0ff;margin: 30px 0 20px 30px;display: block;">
                    <span>{{ writing.title }}</span>
            </div>
            <div style="margin: 50px 0 0 0">
                <el-divider content-position="left">
                    <router-link to="/">
                        <el-image :src="writing.userHeadPortraitUrl"
                                  style="vertical-align:middle;height: 30px;width: 30px;display: inline-block"></el-image>
                        <div style="display: inline-block">
                            <span style="line-height:30px;color: #50bfff;margin: 0 14px 0 10px">{{ writing.name }} </span>
                        </div>
                    </router-link>
                    <div style="display: inline-block">
                        <span style="line-height:30px;color: #999999;margin: 0 10px 0 0;font-size: 14px">
                            时间: {{ writing.createDate }}
                        </span>
                    </div>
                    <div style="display: inline-block">
                        <span style="line-height:30px;color: #999999;margin: 0 10px 0 0;font-size: 14px">
                            浏览: <span style="color: #50bfff">{{ writing.readAmount }}</span>
                        </span>
                    </div>
                    <div style="display: inline-block">
                        <span style="line-height:30px;color: #999999;margin: 0 10px 0 0;font-size: 14px">
                            文章类型:
                            <span style="color: #50bfff">{{ writing.typeName }}</span>
                        </span>
                    </div>
                </el-divider>
            </div>
            <div style="margin: 20px 0;padding: 20px 40px;min-height: 400px;height: auto">
                <span v-html="writing.content" style="color: #999999"></span>
            </div>
            <div style="height: 30px;text-align: center">
                <div style="display: inline-block">
                        <span style="line-height:30px;color: #999999;margin: 0 10px 0 0;font-size: 18px">
                            评论: <span style="color: #50bfff">{{ writing.commentAmount }}</span>
                        </span>
                </div>
                <div style="display: inline-block;margin: 0 40px">
                        <span style="line-height:30px;color: #999999;margin: 0 10px 0 0;font-size: 18px">
                            点赞: <span style="color: #50bfff">{{ writing.likeAmount }}</span>
                        </span>
                </div>
                <div style="display: inline-block">
                        <span style="line-height:30px;color: #999999;margin: 0 10px 0 0;font-size: 18px">
                            收藏: <span style="color: #50bfff">{{ writing.collectAmount }}</span>
                        </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "WritingDetail",
    data() {
        return {
            writingId: this.$route.query.writingId,
            writing: {
                collectAmount: '',
                commentAmount: '',
                content: '',
                createBy: '',
                createDate: '',
                delFlag: '',
                essence: '',
                id: '',
                likeAmount: '',
                name: '',
                readAmount: '',
                recommend: '',
                title: '',
                top: '',
                type: '',
                typeName: '',
                updateBy: '',
                updateDate: '',
                userHeadPortraitUrl: '',
                userId: '',
            },
            loading:false
        }
    },
    created() {
        this.loading = true;
        this.getContent()
    },
    methods: {
        getContent(){
            this.getRequest("/chick/writing/getWriteContent", {writingId: this.writingId}).then(res =>{
                console.log(res)
                this.writing = res.data;
                this.loading = false;
            })
        }
    }
}
</script>

<style scoped>

</style>
