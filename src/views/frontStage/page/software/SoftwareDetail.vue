<template>
    <div style="height: auto;width: 80%;margin: 0 auto;min-height: 600px" v-loading="loadingContent">
        <span style="font-size: 50px;color: red;padding: 30px 0 0 0;display: block">{{ softwareDetail.name }}</span>
        <span style="font-size: 20px;color: red;padding: 10px 0 0 0;display: block">出品公司/开发者:{{ softwareDetail.company }}</span>
        <span style="font-size: 20px;padding: 10px 0 20px 0;display: block">
            软件描述:
            <span
                style="color: red">{{ softwareDetail.description }}</span>
        </span>
        <span v-if="softwareDetail.versionAndContentVOS.length==0" style="color: #cac6c6;font-size: 50px">暂无</span>
        <div v-for="(item,index) in softwareDetail.versionAndContentVOS" style="padding: 30px 0 0 0">
            <span style="font-size: 16px;width: 180px;display: inline-block;color: red">
                        版本:{{item.versions}}
                    </span>

            <span style="font-size: 16px;width: 180px;display: inline-block">
                        windows:
                        <span v-if="item.windows==null" style="color: #cac6c6">暂无</span>
                        <a :href="item.windows" v-if="item.windows!=null">
                            下载
                        </a>
                    </span>
            <span style="font-size: 16px;width: 180px;display: inline-block">
                        linux:
                        <span v-if="item.linux==null" style="color: #cac6c6">暂无</span>
                        <a :href="item.linux" v-if="item.linux!=null">
                           下载
                        </a>
                    </span>
            <span style="font-size: 16px;width: 180px;display: inline-block">
                        mac:
                        <span v-if="item.mac==null" style="color: #cac6c6">暂无</span>
                        <a :href="item.mac" v-if="item.mac!=null">
                           下载
                        </a>
                    </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "SoftwareDetail",
    data() {
        return {
            softwareDetail: '',
            softwareId: this.$route.query.softwareId,
            loadingContent : false
        }
    },
    created() {
        this.getSoftwareContent();
    },
    methods: {
        getSoftwareContent() {
            this.loadingContent = true
            this.getRequest('/chick/software/softwareAllContentList', {softwareId: this.softwareId}).then(res => {
                this.softwareDetail = res.data
                this.loadingContent = false
                console.log(res);
            })
        }
    }
}
</script>

<style scoped>

</style>
