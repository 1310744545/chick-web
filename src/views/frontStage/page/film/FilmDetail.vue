<template>
    <div id="content" style="text-align: left">
        <div style="width: 70%;margin: 0 auto">
            <div style="width: 30%;height: auto;display: inline-block;margin: 20px 0;text-align: center">
                <img :src="filmDetail.coverUrl" style="width: 100%;height: 400px">
            </div>
            <div style="display: inline-block;margin: 20px 0;height: 100%;width: 65%">
                <div style="height: 70px;padding: 0 0 0 30px">
                    <div  style="display: inline-block">
                        <span style="font-size: 50px;color: #50bfff">{{ filmDetail.name }}</span>
                    </div>
                </div>
                <div style="height: 40px;padding: 0 0 0 30px">
                    <div  style="display: inline-block;width: 50%">
                        <span >更新: {{ filmDetail.updateDate }}</span>
                    </div>
                    <div style="display: inline-block;width: 50%">
                        <span >状态: {{ filmDetail.statue }}</span>
                    </div >
                </div>
                <div style="height: 40px;padding: 0 0 0 30px">
                    <div  style="display: inline-block;width: 50%">
                        <span >导演: {{ filmDetail.director }}</span>
                    </div>
                    <div style="display: inline-block;width: 50%">
                        <span >别名:{{ filmDetail.otherName }}</span>
                    </div >
                </div>
                <div style="height: auto;min-height: 80px;padding: 0 0 0 30px">
                    <div  style="display: inline-block;">
                        <span >主演: {{ filmDetail.protagonist }}</span>
                    </div>
                </div>
                <div style="height: 40px;padding: 0 0 0 30px">
                    <div  style="display: inline-block;width: 50%">
                        <span >地区:{{ filmDetail.country }}</span>
                    </div>
                    <div style="display: inline-block">
                        <span >语言:{{ filmDetail.language }}</span>
                    </div >
                </div>
                <div style="height: 40px;padding: 0 0 0 30px">
                    <div  style="display: inline-block;width: 50%">
                        <span >首播: {{ filmDetail.debut }}</span>
                    </div>
                    <div style="display: inline-block;width: 50%">
                        <span >电视台: {{ filmDetail.television }}</span>
                    </div >
                </div>
                <div style="height: 40px;padding: 0 0 0 30px">
                    <div  style="display: inline-block;width: 50%">
                        <span >时长: {{ filmDetail.singleSetOfOften }}</span>
                    </div>
                    <div style="display: inline-block;width: 50%">
                        <span >集数: {{ filmDetail.statue }}</span>
                    </div >
                </div>
                <div style="height: 40px;padding: 0 0 0 30px">
                    <div  style="display: inline-block;width: 50%">
                        <span >类型: {{ filmDetail.count }}</span>
                    </div>
                    <div style="display: inline-block;width: 50%">
                        <span >豆瓣评分: {{ filmDetail.score }}</span>
                    </div>
                </div>
                <div style="height: 40px;padding: 0 0 0 30px">
                    <div style="display: inline-block;width: 50%">
                        <span >播放支持: {{ filmDetail.playerSupport }}</span>
                    </div >
                </div>
            </div>
        </div>
        <div style="width: 70%;margin: 0 auto">
            <div>
                <span></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "FilmDetail",
    data() {
        return {
            filmId: this.$route.query.filmId,
            filmDetail: '',
            filmContent: {},
            loadingDetail: false,
            loadingContent: false
        }
    },
    created() {
        this.getFilmContent();
        this.getFilmDetail()
    },
    methods: {
        getFilmDetail() {
            this.loadingContent = true
            this.getRequest('/chick/filmContent/detail', {filmId: this.filmId}).then(res => {
                this.filmDetail = res.data
                this.loadingDetail = false
                console.log(res);
            })
        },
        getFilmContent() {
            this.loadingContent = true
            this.getRequest('/chick/filmContent/getContentListByFilmId', {filmId: this.filmId}).then(res => {
                this.filmContent = res.data
                // if ()
                this.loadingContent = false
                console.log(res);
            })
        }
    }
}
</script>

<style scoped>
</style>
