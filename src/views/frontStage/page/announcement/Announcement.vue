<template>
    <div style="height: auto;width: 80%;margin: 0 auto;min-height: 600px" v-loading="loadingContent">
        <span style="font-size: 50px;color: #20a0ff;padding: 30px 0 0 0;display: block">{{ announcement.title }}</span>
        <span
            style="font-size: 16px;color: black;padding: 10px 100px 0 0;display: inline-block">发布日期:{{ announcement.createDate }}</span>
        <span style="font-size: 16px;color: black;padding: 10px 0 0 0;display: inline-block">公告类型:
            <span style="color: #20a0ff">
                           {{ announcement.type == '0' ? '[bug修改]' : announcement.type == '1' ? '[系统公告]' : announcement.type == '2' ? '[内容更新]' : '[站长公告]' }}
            </span>
        </span>
        <el-divider></el-divider>
        <span style="font-size: 20px;padding: 10px 0 20px 0;display: block" v-html="announcement.content"></span>
    </div>
</template>

<script>
export default {
    name: "Announcement",
    data() {
        return {
            announcement: '',
            announcementId: this.$route.query.id,
            loadingContent: false
        }
    },
    created() {
        this.getAnnouncementContent();
    },
    methods: {
        getAnnouncementContent() {
            this.loadingContent = true
            this.getRequest('/get/announcementDetail', {announcementId: this.announcementId}).then(res => {
                this.announcement = res.data
                this.loadingContent = false
                console.log(res);
            })
        }
    }
}
</script>

<style scoped>

</style>
