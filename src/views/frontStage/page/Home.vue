<template>
    <div class="home">
        <!--这是首页-->
        <!--简约-->
        <div style="height: 600px;">
            <el-image style="width: auto; height: auto" :src="url1"></el-image>
            <el-divider></el-divider>
            <div class="level1-1">
                <div class="block" style="padding: 20px 40px 20px 60px;">
                    <el-carousel height="360px">
                        <el-carousel-item v-for="(u,index) in url" :key="index" interval="3000">
                            <router-link :to="u.index">
                                <el-image :src="u.url" style="height: 100%;width: 714px"></el-image>
                            </router-link>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <div class="level1-2">
                <div class="level1-2-1" style="padding: 20px;height: 90%;width: 93%">
                    <el-card class="box-card" shadow="hover"  v-loading="announcementLoading">
                        <div slot="header" class="clearfix">
                            <span>公告信息</span>
                            <el-button style="float: right; padding: 3px 0" type="text">公告详情</el-button>
                        </div>
                        <div v-for="(a, index) in announcement" :key="index" class="text item">
                            <!--<span>[{{o.type==='0'?'bug修改':o.type==='1'?'系统公告':o.type==='2'?'内容更新':'站长公告' }}]</span>-->
                            <span v-if="a.type==='0'" style="color: red;">[bug修改]</span>
                            <span v-if="a.type==='1'" style="color: #222222;">[系统公告]</span>
                            <span v-if="a.type==='2'" style="color: blue;">[内容更新]</span>
                            <span v-if="a.type==='3'" style="color: green;">[站长公告]</span>
                            <router-link :to="{path:'announcement', query: { id: a.id }}" class="announcementContent">
                                {{ a.title }}
                            </router-link>
                            <span
                                style="float: right;display: inline-block;white-space: nowrap;width: 76px;overflow: hidden;">{{
                                    a.createDate
                                }}撑开专用</span>
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
        <!--便捷-->
        <div style="height: 500px;">
            <el-divider></el-divider>
            <el-image style="width: auto; height: auto" :src="url2"></el-image>
            <div style="width:1357px;height: 280px">
                <div class="level2-1">
                    <el-card class="box-card" shadow="hover">
                        <div slot="header" class="clearfix">
                            <span>在线工具</span>
                            <el-button style="float: right; padding: 3px 0" type="text">查看详情</el-button>
                        </div>
                        <div v-for="(o, index) in 4" :key="index" class="text item">
                            {{ '列表内容 ' + o }}
                        </div>
                    </el-card>
                </div>
                <div class="level2-2">
                    <el-card class="box-card" shadow="hover">
                        <div slot="header" class="clearfix">
                            <span>软件下载</span>
                            <el-button style="float: right; padding: 3px 0" type="text">查看详情</el-button>
                        </div>
                        <div v-for="(o,index) in 4" :key="index" class="text item">
                            {{ '列表内容 ' + o }}
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
        <!--娱乐-->
        <div style="height: 500px">
            <el-divider></el-divider>
            <el-image style="width: auto; height: auto" :src="url3"></el-image>
            <div style="width:1357px;height: 280px">
                <div class="level2-1">
                    <el-card class="box-card" shadow="hover">
                        <div slot="header" class="clearfix">
                            <span>帖子</span>
                            <el-button style="float: right; padding: 3px 0" type="text">查看详情</el-button>
                        </div>
                        <div v-for="(o,index) in 4" :key="index" class="text item">
                            {{ '列表内容 ' + o }}
                        </div>
                    </el-card>
                </div>
                <div class="level2-2">
                    <el-card class="box-card" shadow="hover">
                        <div slot="header" class="clearfix">
                            <span>影视</span>
                            <el-button style="float: right; padding: 3px 0" type="text">查看详情</el-button>
                        </div>
                        <div v-for="(o,index) in 4" :key="index" class="text item">
                            {{ '列表内容 ' + o }}
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            query: {
                current: 1,
                size: 5,
                keyword: '',
                delFlag: 0
            },
            url: [
                {
                    url :'http://chickweb.oss-cn-beijing.aliyuncs.com/files/%E5%9C%A8%E7%BA%BF%E5%B7%A5%E5%85%B7.png',
                    index: '/tools'
                },
                {
                    url :'http://chickweb.oss-cn-beijing.aliyuncs.com/files/%E8%BD%AF%E4%BB%B6%E4%B8%8B%E8%BD%BD.png',
                    index: '/software'
                },
                {
                    url :'http://chickweb.oss-cn-beijing.aliyuncs.com/files/%E5%B8%96%E5%AD%90.png',
                    index: '/writing'
                },
                {
                    url :'http://chickweb.oss-cn-beijing.aliyuncs.com/files/%E8%A7%82%E5%BD%B1.png',
                    index: '/film'
                }
            ],
            url1: 'http://chickweb.oss-cn-beijing.aliyuncs.com/files/%E7%AE%80%E7%BA%A6.png',
            url2: 'http://chickweb.oss-cn-beijing.aliyuncs.com/files/%E4%BE%BF%E6%8D%B7.png',
            url3: 'http://chickweb.oss-cn-beijing.aliyuncs.com/files/%E5%A8%B1%E4%B9%90.png',
            announcement: [],
            announcementLoading: false
        }
    },
    methods: {
        getAnnouncement(){
            this.announcementLoading = true;
            const data = {
                keyword: this.query.keyword,
                current: this.query.current,
                size: 6,
                delFlag: this.query.delFlag
            }
            this.getRequest("/announcement/manager/list", data).then(res => {
                this.announcement = res.data.records;
                this.announcementLoading = false;
                // console.log(res);
            })
        }
    },
    created() {
        this.getAnnouncement();

    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.home {
    height: auto;
    width: 90%;
    margin: 0 auto;
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

.level1-1 {
    width: 60%;
}

.level1-2 {
    height: 400px;
    width: 40%;
}

.level1-1, .level1-2 {
    float: left;
}

.level2-1 {
    float: left;
    margin: 0 0 0 150px;
    height: 260px;
}

.level2-2 {
    float: right;
    margin: 0 150px 0 0;
    height: 260px;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 28px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card {
    width: 480px;
    text-align: left;
    height: 100%;
}

a {
    text-decoration: none;
}

.router-link-active {
    text-decoration: none;
}

.announcementContent {
    display: inline-block;
    white-space: nowrap;
    width: 65%;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: top;
}

a {

}
</style>
