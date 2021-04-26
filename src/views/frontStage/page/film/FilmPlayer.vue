<template>
    <div>
        <div>
            <span style="color: #50bfff;font-size: 50px">{{filmDetail.name}} {{filmContentDetail.name}}</span>
        </div>
        <div id="dplayer" style="height: 650px;width: 70%;margin: 0 auto"></div>
        <div>
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
                            <el-row>
                                <a :href="item.url">
                                    <el-button  type="primary" plain>{{item.name}}</el-button>
                                </a>
                            </el-row>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Hls from 'hls.js';
import DPlayer from 'dplayer';
export default {
    name: "Film",
    data() {
        return {
            filmDetail: '',
            filmId: this.$route.query.filmId,
            filmContentId: this.$route.query.filmContentId,
            filmContentDetail:{},

            filmContent: {},
            filmContentDownload: {},
            filmContentForeShow: {},
        }
    },
    created() {
        this.getFilmContentDetail();
    },
    methods: {
        getFilmContent() {
            this.getRequest('/chick/filmContent/getContentListByFilmId', {filmId: this.filmContentDetail.filmId, type :''}).then(res => {
                this.filmContent = res.data
                console.log(res);
            })
        },
        getFilmContentDownload() {
            this.getRequest('/chick/filmContent/getContentListByFilmId', {filmId: this.filmContentDetail.filmId, type :'download'}).then(res => {
                this.filmContentDownload = res.data
                for (var i = 0 ; i<=this.filmContentDownload['download'].length; i++){
                    this.filmContentDownload['download'][i].url = 'thunder://'+ btoa(encodeURIComponent('AA'+this.filmContentDownload['download'][i].url+'ZZ'));
                }
            })
        },
        getFilmContentForeShow(){
            this.getRequest('/chick/filmContent/getContentListByFilmId', {filmId: this.filmContentDetail.filmId, type :'foreShow'}).then(res => {
                this.filmContentForeShow = res.data
                console.log(res);
            })
        },
        getFilmDetail() {
            this.loadingContent = true
            this.getRequest('/chick/filmContent/detail', {filmId: this.filmContentDetail.filmId}).then(res => {
                this.filmDetail = res.data
                this.loadingDetail = false
            })
        },
        getFilmContentDetail() {
            this.getRequest('/chick/filmContent/contentById', {filmContentId: this.filmContentId}).then(res => {
                this.filmContentDetail = res.data
                this.getFilmDetail();
                this.getFilmContent();
                this.getFilmContentDownload();
                this.getFilmContentForeShow();
                console.log(res);
                const dp = new DPlayer({
                    container:document.getElementById("dplayer"),
                    video: {
                        url: this.filmContentDetail.url,
                        type: 'hls',
                    },
                    pluginOptions: {
                        hls: {
                            // hls config
                        }
                    }
                })
            })
        },
    },
    mounted() {

    }
}
</script>

<style scoped>

</style>
