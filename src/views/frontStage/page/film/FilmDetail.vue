<template>
    <div id="content" style="text-align: left;height: auto;padding: 0 0 20px 0">
        <div style="width: 70%;margin: 0 auto;height: auto">
            <div style="width: 30%;height: auto;display: inline-block;margin: 20px 0;text-align: center;">
                <img :src="filmDetail.coverUrl" style="width: 100%;height: auto">
            </div>
            <div style="display: inline-block;margin: 20px 0;height: 100%;width: 70%;float: right">
                <div style="height: auto;min-height:70px;padding: 0 0 0 30px">
                    <div  style="display: inline-block">
                        <span style="font-size: 50px;color: #50bfff">{{ filmDetail.name }}</span>
                    </div>
                </div>
                <div style="height: auto;min-height:40px;padding: 0 0 0 30px">
                    <div  style="display: inline-block;width: 50%">
                        <span >更新: {{ filmDetail.updateDate }}</span>
                    </div>
                    <div style="display: inline-block;width: 50%">
                        <span >状态: {{ filmDetail.statue }}</span>
                    </div >
                </div>
                <div style="height: auto;min-height:40px;padding: 0 0 0 30px">
                    <div  style="display: inline-block;width: 50%">
                        <span >导演: {{ filmDetail.director }}</span>
                    </div>
                    <div style="display: inline-block;width: 50%">
                        <span >别名:{{ filmDetail.otherName }}</span>
                    </div >
                </div>
                <div style="height: auto;min-height:40px;padding: 0 0 0 30px">
                    <div  style="display: inline-block;">
                        <span >主演: {{ filmDetail.protagonist }}</span>
                    </div>
                </div>
                <div style="height: auto;min-height:40px;padding: 0 0 0 30px">
                    <div  style="display: inline-block;width: 50%">
                        <span >地区:{{ filmDetail.country }}</span>
                    </div>
                    <div style="display: inline-block">
                        <span >语言:{{ filmDetail.language }}</span>
                    </div >
                </div>
                <div style="height: auto;min-height:40px;padding: 0 0 0 30px">
                    <div  style="display: inline-block;width: 50%">
                        <span >首播: {{ filmDetail.debut }}</span>
                    </div>
                    <div style="display: inline-block;width: 50%">
                        <span >电视台: {{ filmDetail.television }}</span>
                    </div >
                </div>
                <div style="height: auto;min-height:40px;padding: 0 0 0 30px">
                    <div  style="display: inline-block;width: 50%">
                        <span >时长: {{ filmDetail.singleSetOfOften }}</span>
                    </div>
                    <div style="display: inline-block;width: 50%">
                        <span >集数: {{ filmDetail.statue }}</span>
                    </div >
                </div>
                <div style="height: auto;min-height:40px;padding: 0 0 0 30px">
                    <div  style="display: inline-block;width: 50%">
                        <span >类型: {{ filmDetail.count }}</span>
                    </div>
                    <div style="display: inline-block;width: 50%">
                        <span >豆瓣评分: {{ filmDetail.score }}</span>
                    </div>
                </div>
                <div style="height: auto;min-height:40px;padding: 0 0 0 30px">
                    <div style="display: inline-block;width: 50%">
                        <span >播放支持: {{ filmDetail.playerSupport}}</span>
                    </div >
                </div>
            </div>
        </div>
        <!--内容-->
        <div style="width: 70%;margin: 0 auto">
            <div v-for="(item, index) in filmContent" style="box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);border-radius:10px;margin: 20px 0">
                <div style="padding: 20px 0 0 30px">
                    <span style="color: #50bfff;font-size: 20px;">小鸡{{index}}线</span>
                </div>
                <el-divider></el-divider>
                <div style="padding: 0 0 10px 20px;">
                    <div style="display: inline-block;width: 10%;padding: 0 0 10px 0;" v-for="(item, index) in item">
                        <el-row>
                            <router-link :to="{path:'/film/player', query:{filmContentId:item.id}}">
                                <el-button  type="primary" plain>{{item.name}}</el-button>
                            </router-link>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
        <!--下载-->
        <div style="width: 70%;margin: 0 auto">
            <div v-for="(item, index) in filmContentDownload" style="box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);border-radius:10px;margin: 20px 0">
                <div style="padding: 20px 0 0 30px">
                    <span style="color: #50bfff;font-size: 20px;">下载</span>
                </div>
                <el-divider></el-divider>
                <div style="padding: 0 0 10px 20px;">
                    <div style="display: inline-block;width: 10%;padding: 0 0 10px 0;" v-for="(item, index) in item">
                        <a :href="item.url">
                            <el-button  type="primary" plain>{{item.name}}</el-button>
                        </a>
                    </div>
                </div>
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
            filmContentDownload: {},
            filmContentForeShow: {},
            loadingDetail: false,
            loadingContent: false
        }
    },
    created() {
        this.getFilmDetail();
        this.getFilmContent();
        this.getFilmContentDownload();
        this.getFilmContentForeShow();
    },
    methods: {
        getFilmDetail() {
            this.loadingContent = true
            this.getRequest('/chick/filmContent/detail', {filmId: this.filmId}).then(res => {
                this.filmDetail = res.data
                this.loadingDetail = false
            })
        },
        getFilmContent() {
            this.getRequest('/chick/filmContent/getContentListByFilmId', {filmId: this.filmId, type :''}).then(res => {
                this.filmContent = res.data
            })
        },
        getFilmContentDownload() {
            this.getRequest('/chick/filmContent/getContentListByFilmId', {filmId: this.filmId, type :'download'}).then(res => {
                this.filmContentDownload = res.data
                for (var i = 0 ; i<=this.filmContentDownload['download'].length; i++){
                    this.filmContentDownload['download'][i].url = 'thunder://'+ btoa(encodeURIComponent('AA'+this.filmContentDownload['download'][i].url+'ZZ'));
                }
            })
        },
        getFilmContentForeShow(){
            this.getRequest('/chick/filmContent/getContentListByFilmId', {filmId: this.filmId, type :'foreShow'}).then(res => {
                this.filmContentForeShow = res.data
            })
        }
    }
}
</script>

<style scoped>
</style>
